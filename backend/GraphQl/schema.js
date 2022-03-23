const {buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Role{
        _id: ID!
        name: String
        created: String
    }
    type User{
        _id: ID
        firstname: String
        lastname: String
        email: String
        password: String
        phoneNumber: String!
    }
    type Location{
        region: String
        lat: Float
        lng: Float
    }
    type UnitDetails{
        length: Int
        width: Int
        bed: Int
        bath: Int
        price: Int
        parking: Boolean
    }
    type Unit{
        _id: ID
        building: Building
        details: UnitDetails
        descriptions: String
        active: Boolean
    }

    type BuildingGetails{
        parking: Boolean
        built: String
    }
    type Building{
        _id: ID
        name: String
        propertyType: String
        lister: User
        units: [Unit]
        loc: Location
        details: BuildingGetails
    }

    type HouseDetails{
        length: Int
        width: Int
        bed: Int!
        bath: Int!
        parking: Boolean
        built: String
        price: Int!
    }
    
    type House{
        _id: ID
        lister: User
        images: [String]
        videos: [String]
        loc: Location
        propertyType: String
        details: HouseDetails
        descriptions: String
        active: Boolean
    }
    input createUser{
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        UserType: String!
        phoneNumber: String!
    }
    input createHouse{
        images: [String]!
        videos: [String]
        length: Int
        width: Int
        bed: Int!
        bath: Int!
        propertyType: String!
        parking: Boolean
        built: String
        price: Int!
        descriptions: String
        region: String!
        lat: Float!
        lng: Float!
    }

    input createBuilding{
        name: String
        propertyType: String!
        region: String!
        lat: Float!
        lng: Float!
        parking: Boolean
        built: String
    }

    input createUnit{
        building: ID!
        length: Int!
        width: Int!
        bed: Int!
        bath: Int!
        price: Int!
        descriptions: String
        parking: Boolean

    }

    type Status{
        status: String
        msg: String
    }
    type Property{
        houses:  [House]
        units: [Unit]
    }


    type AuthPayload {
        token: String!
        user: User
      }
    
    type RootQuery {
        getProperty: Property
    }

    type RootMutation {
        createRole(name: String!): Status
        SignUp(input: createUser):Status
        Login(email: String!, password: String!): AuthPayload
        createHouse(input: createHouse):Status
        createBuilding(input: createBuilding): Status
        createUnit(input: createUnit): Status
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }

`)