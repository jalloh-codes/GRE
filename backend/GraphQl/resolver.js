const User = require('../Models/User');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Property = require('../Models/Property')
const AllowRoles = require('../Config/AllowRoles')
const {BuyOrRent, Listing, functionality} =  require('../Config/functionality')
const mongoose = require('mongoose');
const { populate } = require('../Models/Roles');
const AirBnB = require('../Models/AirBnB');
const Verify = require('../Models/Verify')
const { GraphQLError } = require('graphql');
// const Mailer = require('../Mailer/CodeMailer');
const CodeMailer =  require('../Mailer/CodeMailer')
// const {} = require
const GraphQRole = require('./scalarTypes');
const crypto =  require('crypto')

// Validate email & password
const validateEmail = (email) =>{
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(email){
        if(!emailRegex.test(email)) throw new Error("Email is not valid format. Ex: example@mail.com")
    }
}

const validatePassword = (password) =>{
    if(password){
        const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,20})')
        const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
        
        if(!strongPassword.test(password) || !mediumPassword.test(password)) throw new Error("Password is not valid. Valid format,[Aa-zZ, 0-9, !@#$%^&*]")
    }
}


// get key by a value
const getObjKey = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] === value);
}

// verify authantication and authorization
const VerifyAuthorization = async (req, allowed) =>{
    const id =  req._id
    const user = await User.findById(id, {verified: 1, role:1});

    const role = AllowRoles[req.authorization]
    
    if(role !== user.role) throw new GraphQLError("Role not valid")
    return req.authorization
}
  
const user = async (id) =>{
    const user = await User.findOne({_id: id},{password: 0});
    return user
}
const AuthPayloadUser = async (email) =>{
    const user = await User.findOne({email: email})
    if (!user) throw new GraphQLError(JSON.stringify({name:'account', message:'Account does not exists!'}))
    if(!user.verified) throw new GraphQLError(JSON.stringify({name:'verify', message:'Verify your account!'}))
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

const resolver = {

    SignUp: async (args, req) =>{
        try{

            const userType = args.input.UserType
            const email =  args.input.email
            const pass = args.input.password
            // Verify role ang get the ROLE value
            const capitalizeRole= userType.charAt(0).toUpperCase() + userType.slice(1);
            if(!Object.keys(AllowRoles).includes(capitalizeRole)) throw new GraphQLError('Role is not valid')
            const roleType =  AllowRoles[capitalizeRole]
        
            validateEmail(email)
            validatePassword(pass)
            const password = await bcrypt.hash(pass, 12);
            const newUser = new User({
                email: email,
                firstname: args.input.firstname,
                lastname: args.input.lastname,
                role: roleType,
                password: password,
                phoneNumber: args.input.phoneNumber
            })

            
            const account = await newUser.save();
            const random = crypto.randomUUID();
            const code = random.substring(0, 8);
            let file = '../Templates/codeMailer.hbs'
            let locals={
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                code: code
            }
            const hashCode = await bcrypt.hash(code, 12);
            const newVerify =  new Verify({
                user: newUser._id,
                code: hashCode
            });

          

            const verify = await newVerify.save();
            await CodeMailer(file,  locals);
            // console.log(verify);
            return{
                account: account ? true : false,
                verification: verify ? true : false,
                message: `User account ${newUser.firstname} created. Check your email to verify your account.`
            }
        }catch(error){
            throw Error(error, {status: false})
        }
    },
    Login: async (args, req) =>{ 
        try{
        const email = args.email
        const password = args.password
        validateEmail(email)
        const authuser = await AuthPayloadUser(email)
        
       
        const authanticate = await bcrypt.compareSync(password, authuser.password)
        authuser.password = null
        // Mailer(authuser)
        if(!authanticate) throw new  GraphQLError(JSON.stringify({name:'authan', message:'Email or Password is inccorect!'}))
        

        const role = getObjKey(AllowRoles, authuser.role)
        const payload = {
            _id: authuser._id,
            email: authuser.email,
            firstname: authuser.firstname,
            lastname: authuser.lastname,
            created: authuser.created,
            authorization: role
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
    }catch(error){
        return new GraphQLError(error)
    }
    },

    createProperty: async (args, req) =>{ 
        try{
            const auth = req.auth
            const verify = await VerifyAuthorization(auth)
            if(verify !== "Admin"  || verify !== "Listing")  throw new GraphQLError("Not Authorize to perform this task")
        
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
                status: true
            }

        }catch(error){
            throw Error(error)
        }    },

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
            
        // if (req.isAuth && auth.authorization.includes('getProperty')){
            // const compute = search ? [search,{"$match": match},
            // {
            //     "$lookup" : { 
            //         "from" : "users", 
            //         "localField" : "lister", 
            //         "foreignField" : "_id",
            //         pipeline: [
            //             {$project: {_id: 1, email: 1, firstname:1, lastname:1}}
            //         ], 
            //         "as" : "lister"
            //     }
            // },
            // {"$unwind": "$lister"}] :[{"$match": match},
            // {
            //     "$lookup" : { 
            //         "from" : "users", 
            //         "localField" : "lister", 
            //         "foreignField" : "_id",
            //         pipeline: [
            //             {$project: {_id: 1, email: 1, firstname:1, lastname:1}}
            //         ], 
            //         "as" : "lister"
            //     }
            // },
            // {"$unwind": "$lister"}]
            // properties =await  Property.aggregate(compute,{ 
            //     "allowDiskUse" : false
            // })
        // }else{
            
            const compute = search ? [search,{"$match": match}] :[{"$match": match}] 
            
            properties =await Property.aggregate(compute,{ 
                "allowDiskUse" : false
            })
            
        // }
        return {
            properties: properties,
        }
    },
    
    // Create Airbnb Property
    createAirBnb: async (args, req) =>{
        try{
            const auth = req.auth 
            const verify = await VerifyAuthorization(auth)
            if(verify !== "Admin"  || verify !== "Listing")  throw new GraphQLError("Not Authorize to perform this task");

            const inputs = args.input

            const NewAirbnb=  new AirBnB({
                lister: auth._id,
                name: inputs.name,
                images: args.input.images,
                propertyType:  args.input.propertyType,
                details:{
                    studio: inputs.studio,
                    length: inputs.length,
                    width: inputs.width,
                    bed: inputs.bed,
                    bath: inputs.bath,
                    parking: inputs.parking,
                    built: inputs.built,
                    price: inputs.price,
                },
                loc:{
                    region: inputs.region,
                    commune: inputs.commune,
                    lat: inputs.lat,
                    lng: inputs.lng
                },
                descriptions: inputs.descriptions, 
            })
            await NewAirbnb.save()
   
            return{
                status: true,
                "message": "New AirBnb property added!"
            }
        }catch(error){
            throw Error(error)
        }    
    },
    // Air BnB
    getAirBnb: async (args, req) =>{
      
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
            const airCondition = searchInput.airCondition
            const wifi  = searchInput.wifi
            const furnished = searchInput.furnished
            const propertyType = searchInput.propertyType
            var start = new Date(searchInput.start)
            var end = new Date(searchInput.end)


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
                const data = {'details.parking': parking}
                Object.assign(match, data);
            }
            if(airCondition != undefined){
                const data = {'details.airCondition': airCondition}
                Object.assign(match, data);
            }
            if(wifi != undefined){
                const data = {'details.wifi': wifi}
                Object.assign(match, data);
            }
            if(furnished != undefined){
                const data = {'details.furnished': furnished}
                Object.assign(match, data);
            }
            if(propertyType != undefined){
                const data = {propertyType: propertyType}
                Object.assign(match, data)
            }
            if(location != undefined){
                search = { $search: {index: 'airbnb',
                    text: { query: location,
                        path: {'wildcard': '*'}}
                }}
                
            }
        }
        // if (req.isAuth && auth.authorization.includes('getProperty')){
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
            {$unwind: "$lister"},
            {
                "$lookup":{
                    "from": "reservations",
                    "localField": "reservation",
                    "foreignField": "_id",
                    pipeline:[{$match:{
                        $or:[
                            {$and:[
                                  {$and:[{start_date:{$lte: start}}, {end_date:{$gte: start}}]},
                                  {$and:[{end_date:{$gte: end}}, {end_date:{$gte: end}}]}
                            ]},
                            {$and:[{start_date:{$lte: end}},{end_date:{$gte: end}}]} ,
                            {$and:[{start_date:{$lte: start}},{end_date:{$gte: start}}]},
                            {$and:[
                              {$and:[{start_date:{$gte: start}},{start_date:{$lte:end}}]},
                              {$and:[{end_date:{$lte:end}},{end_date:{$lte: end}}]}
                            ]}
                          ]
                    }}],
                    "as": "reservation"
                }

            }]:[{"$match": match},
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
            let result =await  AirBnB.aggregate(compute,{ 
                "allowDiskUse" : false
            })
            let airbnb = []
            await result.forEach((item)=>{
                if(item.reservation.length === 0){
                    airbnb.push(item)
                }
            })
        return {
            airbnb: airbnb,
        }
    },
    sendVerification: async (args, req) =>{
        try{
            
            const email =  args.email
   
            const user = await User.findOne({email: email},{_id: 1, email:1, firstname:1, lastname:1})
            let verify = await Verify.findOne({user: user._id},{code:1})
            
            const random = crypto.randomUUID();
            const code = random.substring(0, 8);
            const hashCode = await bcrypt.hash(code, 12);
            let locals={
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                code: code
            }

            if(verify){
                verify.code = hashCode;
            }else{

                const role = getObjKey(AllowRoles, user.role)
                const payload = {
                    _id: user._id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    created: user.created,
                    authorization: role
                }
               
                //token expire in one year
                const token = jwt.sign(
                    payload,
                    process.env.SECRECT,
                    {expiresIn: '365d'},
                )
                verify =  new Verify({
                    user: user._id,
                    code: hashCode
                });
            }
            let file = '../Templates/codeMailer.hbs'
            await CodeMailer(file, locals)
            const saved = await verify.save();
            return{
                status: saved ? true : false,
                message: "Code sent to your email"
            }
        }catch(error){
            throw Error(error, {status: false})
        }
    },
    resetPassword: async (args, req) =>{
        try{
            const auth = req?.auth
            const email = args?.email
            const oldPassword =  args.oldPassword;
            const newPassword = args.newPassword;
            validatePassword(newPassword);

            const getUser =  await User.findOne({email: email},{password: 1});
            const authanticate = await bcrypt.compareSync(oldPassword, getUser.password)
            if(!authanticate) throw new  GraphQLError("Password is inccorect!")
          
           
            const password = await bcrypt.hash(newPassword, 12);
            getUser.password = password
            await getUser.save()

            return{
                status:true,
                message:'Password successfuly reset'
            }
        }catch(error){
            throw Error(error, {status: false})
        }
    },
    VerifyAccount: async (args, req) =>{ 
        try{
            const email = args.user;
            const code = args.code
            const user =  await User.findOne({email: email},{_id: 1, verified: 1, role: 1, email: 1})
            const verify = await Verify.findOne({user: user._id},{code:1})
            const authanticate = await bcrypt.compareSync(code, verify.code)

            if(!authanticate) throw new  GraphQLError(JSON.stringify({name:'verify', message:'Code is incorect!'}))
  
            user.verified = true;
            await user.save();
            await Verify.deleteOne({_id: verify._id})

            // const role = getObjKey(AllowRoles, user.role)
            // const payload = {
            //     _id: user._id,
            //     email: user.email,
            //     authorization: role
            // }

            //token expire in 10 munite
            // const session = jwt.sign(
            //     payload,
            //     process.env.SECRECT,
            //     {expiresIn: '10m'},
            // )

            return{
                status: true,
                message: "Account verified",
                // session:  session
            }
        }catch(error){
            throw Error(error, {status: false})
        }
    }
}
//,{$unwind: "$reservation"}
module.exports = resolver