const User = require('../Models/User');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Property = require('../Models/Property')
const Roles = require('../Models/Roles');
const {BuyOrRent, Listing, functionality} =  require('../Config/functionality')
const mongoose = require('mongoose');
const { populate } = require('../Models/Roles');


// verify authantication and authorization
const VerifyAuthorization =(req, authorization) =>{
   
    if(!req.isAuth) throw new Error('Authentication Failed')
    if(!req.auth.authorization.includes(authorization)) throw new Error('Not Authorised')
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
                status: true,
                message: ''
            }
        })
        .catch(error =>{
            throw Error(error)
        })
    },

    signup: async (args, req) =>{
        const userType = args.input.UserType
        const checkUser =  await User.findOne({email: args.input.email},{_id:0,email: 1}).exec();
        if (checkUser) throw new Error("User already exists, please sign in")

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
            return {
                status: true,
                message: "Account created"
            }
        }).catch(error =>{
            status = false
            throw Error("Error creating user", {status: status})
        })
    },
    
    login: async (args, req) =>{
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

    createProperty: async (args, req) =>{
        try{
            
            VerifyAuthorization(req, 'createProperty')
            
            const auth = req.auth
            console.log(args.input);
            const Newstudio =  new Property({
                lister: auth._id,
                images: args.input.images,
                videos: args.input.videos,
                propertyType:  args.input.propertyType,
                details:{
                    studio: args.input.studio,
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
                    commune: args.input.commune,
                    lat: args.input.lat,
                    lng: args.input.lng
                },
                descriptions: args.input.descriptions,
                quantity: args.input.quantity
            })
            await Newstudio.save()
   
            return{
                status: true,
                message: 'Property added'
            }

        }catch(error){
            throw Error(error)
        }    
    },

    // Non Air BnB type 
    getProperty: async (args, req) =>{
        
        const searchInput = args.input
        var search
        var properties
        let match = {
            active: true
        }
        
        if(searchInput != undefined){
            const location = searchInput.location
            const priceMin = searchInput.priceMin
            const priceMax = searchInput.priceMax
            const bedMin =  searchInput.bedMin
            const bedMax = searchInput.bedMax
            const bathMin = searchInput.bathMin
            const bathMax = searchInput.bathMax 
            const parking =  searchInput.parking 
    

            if(priceMin != undefined || priceMax != undefined){
                let price =  {'details.price': {}}
                if(priceMin != undefined){
                    Object.assign(price['details.price'], {"$gte" : priceMin})
                }
                if(priceMax != undefined){
                    Object.assign(price['details.price'], {"$lte" : priceMax})
                }
                Object.assign(match, price)
            }
            if(bedMin != undefined || bedMax != undefined){
                let bed =  { 'details.bed': {}}
                if(bedMin != undefined){
                    Object.assign(bed['details.bed'], {"$gte" : bedMin})
                }
                if(bedMax != undefined){
                    Object.assign(bed['details.bed'], {"$lte" : bedMax})
                }
                Object.assign(match, bed)
            }

            if(bathMin != undefined || bathMax != undefined){
                let bath =  {'details.bath': {}}
                if(bathMin != undefined){
                    Object.assign(bath['details.bath'], {"$gte" : bathMin})
                }
                if(bathMax != undefined){
                    Object.assign(bath['details.bath'], {"$lte" : bathMax})
                }
                Object.assign(match, bath)
            }

            if(parking != undefined){
                let data = {'details.parking': parking}
                Object.assign(match, data);
            }
        
        
            if(location != undefined){
                search = { $search: {index: 'property',
                    text: { query: location,
                        path: {'wildcard': '*'}}
                }}
                
            }
        }
        const auth = req.auth
            
        if (req.isAuth && auth.authorization.includes('getProperty')){
            const compute = search ? [search,{"$match": match},
            {
                "$lookup" : { 
                    "from" : "users", 
                    "localField" : "lister", 
                    "foreignField" : "_id",
                    pipeline: [
                        {$project: {_id: 1, email: 1, firstname:1, lastname:1}}
                    ], 
                    "as" : "lister"
                }
            },
            {"$unwind": "$lister"}] :[{"$match": match},
            {
                "$lookup" : { 
                    "from" : "users", 
                    "localField" : "lister", 
                    "foreignField" : "_id",
                    pipeline: [
                        {$project: {_id: 1, email: 1, firstname:1, lastname:1}}
                    ], 
                    "as" : "lister"
                }
            },
            {"$unwind": "$lister"}]
            properties =await  Property.aggregate(compute,{ 
                "allowDiskUse" : false
            })
        }else{
            
            const compute = search ? [search,{"$match": match}] :[{"$match": match}] 
            
            properties =await Property.aggregate(compute,{ 
                "allowDiskUse" : false
            })
            
        }
        return {
            properties: properties,
        }
    },
    
    // Air BnB
    getAirBnB: async (args, req) =>{

    },

    checkoutHome: async (args, req) =>{
        //place: ID, from: String
        const from = ''
    }


}

module.exports = resolver