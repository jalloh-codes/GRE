const User = require('../Models/User');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const House = require('../Models/House')
const Building =  require('../Models/Building')
const Unit = require('../Models/Unit')
const userID = '6227b44075e1f19f288487b4'

const user = async (id) =>{
    const user = await User.findOne({_id: id},{password: 0});
    return user
}

const building =  async (bdID) =>{
    const buildings  = await Building.findOne({_id: bdID})

    return{
        ...buildings._doc,
        lister: user.bind(this, buildings.lister)
        
    }

}
const allBuildings = async () =>{
    const buildings  = await Building.find()
    return buildings.map(build =>{
        return{
            ...build._doc,
            lister: user.bind(this, build.lister)
        }
    })
}
const unit =  async () =>{
    const units  = await Unit.find()

    return units.map(uni =>{
        return{
            ...uni._doc,
            building: building.bind(this, uni.building)
        }
    })
}


const resolver = {
    createUser: async (args, req) =>{
        const password = await bcrypt.hash(args.input.password, 12);
        const newUser =new  User({
            email: args.input.email,
            firstname: args.input.firstname,
            lastname: args.input.lastname,
            UserType: args.input.UserType,
            password: password,
            phoneNumber: args.input.phoneNumber
        })
        let status = true
        await newUser.save()
        .then((res) =>{
            console.log(res);
            return {status}
        }).catch(error =>{
            status = false
            throw Error(error, {status: status})
        })
    },
    createHouse: async (args, req) =>{
       
        console.log('HERE');
        const NewHouse =  new House({
            lister: userID,
            images: args.input.images,
            videos: args.input.videos,
            propertyType:  args.input.propertyType,
            details:{
                length: args.input.length,
                width: args.input.width,
                bed: args.input.bed,
                bath: args.input.bath,
                parking: args.input.parking,
                built: args.input.built,
                price:args.input.price,
            },
            loc:{
                region: args.input.region,
                lat: args.input.lat,
                lng: args.input.lng
            },
            descriptions: args.input.descriptions,
        })
        await NewHouse.save()
        .then(_ =>{
            return{
                status: true
            }
        }).catch(error =>{
            throw Error(error)
        })
    },
    createBuilding: async (args, req) =>{

        const newBuilding = new Building({
            name: args.input.name,
            lister: userID,
            details:{
               parking: args.input.parking,
               built: args.input.built
            },
            loc:{
                region: args.input.region,
                lat: args.input.lat,
                lng: args.input.lng
            },
            propertyType: args.input.propertyType,
        })

        await newBuilding.save()
        .then(_ =>{
            return{
                status: true
            }
        }).catch(error =>{
            throw Error(error)
        })
    },
    createUnit: async (args, req) =>{

        const newUnit = new Unit({
            building: args.input.building,
            details:{
                length: args.input.length,
                width: args.input.width,
                bed: args.input.bed,
                bath: args.input.bath,
                price: args.input.price,
                parking: args.input.parking
            },
            descriptions: args.input.descriptions
        })
        await newUnit.save()
        .then(async(_) =>{
            await Building.findOneAndUpdate({_id: args.input.building},
                {$push:{units: newUnit._id}})
            return{
                status: true
            }
        }).catch(error =>{
            throw Error(error)
        })
    },

    getProperty: async (args, req) =>{
        const houses = await House.find()
        const buildings  = await allBuildings()
        const units  = await unit()
        return {
            houses: houses,
            units: units,
            building: buildings
        }
    }

}

module.exports = resolver