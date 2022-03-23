const User = require('../Models/User');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const House = require('../Models/House')
const Building =  require('../Models/Building')
const Unit = require('../Models/Unit')

const Roles = require('../Models/Roles');
const {BuyOrRent, Listing, functionality} =  require('../Config/functionality')
const mongoose = require('mongoose');
const { populate } = require('../Models/Roles');

const VerifyAuthorization =(req, authorization) =>{
    if(!req.isAuth) throw new Error('Unauthanticated')
    if(!req.auth.authorization.includes(authorization)) throw new Error('Unauthorization to perfome this task')
}

const user = async (id) =>{
    const user = await User.findOne({_id: id},{password: 0});
    return user
}
const AuthPayloadUser = async (email) =>{
    const user = User.findOne({email: email}, {phoneNumber: 0, __v: 0}).populate('roles', 'name -_id')

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
    createRole: async (args, req) =>{
        const newRoles = new Roles({
            name:  args.name
        })

        await newRoles.save()
        .then(res =>{
            return{
                status: true
            }
        })
        .catch(error =>{
            throw Error(error)
        })
    },
    SignUp: async (args, req) =>{

        const userType = args.input.UserType
        let roles = []
        if (userType === 'Listing'){
            roles = await Roles.find({name: {$in: Listing}},{_id: 1})
        }else if (userType === 'BuyOrRent'){
            roles = await Roles.find({name: {$in: BuyOrRent}}, {_id: 1})
        }
        if(roles.length === 0) throw new Error('No Roles provided')
        const password = await bcrypt.hash(args.input.password, 12);
        const newUser =new  User({
            email: args.input.email,
            firstname: args.input.firstname,
            lastname: args.input.lastname,
            UserType: args.input.UserType,
            password: password,
            roles: roles,
            phoneNumber: args.input.phoneNumber
        })
        let status = true
        await newUser.save()
        .then((res) =>{
            return {status: true}
        }).catch(error =>{
            status = false
            throw Error(error, {status: status})
        })
    },
    
    Login: async (args, req) =>{
        const email = args.email
        const password = args.password
        
        let authuser =  await AuthPayloadUser(email)

        if (!authuser) throw new Error("Email is incorect");

        const authanticate = await bcrypt.compareSync(password, authuser.password)
        if(!authanticate) throw new Error("Password is incorect")
        if(!authuser.verified) throw new Error("Account not verified")
        let authorization =await  authuser.roles.map(e =>  e['name']);

        // delete authuser.password
        
        const payload = {
            _id: authuser._id,
            email: authuser.email,
            firstname: authuser.firstname,
            lastname: authuser.lastname,
            created: authuser.created,
            admin: authuser.admin,
            authorization: authorization
        }

        //token expire in one year
        const token = jwt.sign(
            payload,
            process.env.SECRECT,
            {expiresIn: '365d'},
        )

        return{
            token: `Bearer ${token}`,
            user: {
                _id: authuser._id,
                firstname: authuser.firstname,
                lastname: authuser.lastname,
                email: authuser.email,
            }
        }
    },
    createHouse: async (args, req) =>{
        try{
            //console.log(req.auth.authorization);
            VerifyAuthorization(req, 'createHouse')
            // if(!req.isAuth) throw new Error('Unauthanticated')
            // if(!req.auth.authorization.includes('createHouse')) throw new Error('Unauthorization to perfome this task')
            let auth = req.auth

            const NewHouse =  new House({
                lister: auth._id,
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
            return{
                status: true
            }
            // .then(_ =>{
            //     return{
            //         status: true
            //     }
            // }).catch(error =>{
            //     throw Error(error)
            // })

        }catch(error){
            throw Error(error)
        }
    },
    createBuilding: async (args, req) =>{

        try {
            VerifyAuthorization(req, 'createBuilding')
            console.log( args.input.propertyType);
            let auth = req.auth
            const newBuilding = new Building({
                name: args.input.name,
                lister: auth._id,
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
            return{
                status: true
            }
        } catch (error) {
            throw Error(error)
        }

    },
    createUnit: async (args, req) =>{
        try {
            VerifyAuthorization(req, 'createUnit')
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
            await Building.findOneAndUpdate({_id: args.input.building},
                {$push:{units: newUnit._id}})
            return{
                status: true
            }
        } catch (error) {
            throw Error(error)
        }
    },
    getProperty: async (_, req) =>{
        let auth = req.auth

            var  houses
            var units
            if (req.isAuth){
                 houses = House.find()
                .populate({path:'lister',  select:['email', '_id', 'firstname', 'lastname']})
        
                 units = Unit
                .find()
                .populate({path: 'building', populate:{
                    path: 'lister', select:['email', '_id', 'firstname', 'lastname']
                }})
            }else{
                 houses = House.find()
                 
                 units = Unit.find().populate({path: 'building'})
                
            }
    
        // const units = 
        // .populate({path:'lister',  select:['email', '_id', 'firstname', 'lastname']})
        // .populate({path:'units'})
    
       
        // const houses =  House.find()
        // .populate({path:'lister',  select:['email', '_id', 'firstname', 'lastname']})
        


        // const buildings  = await allBuildings()

        return {
            houses: houses,
            units: units,
        }
    }
    


}

module.exports = resolver