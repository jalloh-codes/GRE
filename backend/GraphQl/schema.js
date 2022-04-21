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
    type Lister{
        _id: ID
        firstname: String
        lastname: String
        email: String
    }

    type PropertyDetails{
        studio: Boolean
        length: Int
        width: Int
        bed: Int!
        bath: Int!
        parking: Boolean
        built: String
        price: Int!
        airCondition: Boolean
        wifi: Boolean
        furnished: Boolean
    }
    
    type Property{
        _id: ID
        lister: Lister
        images: [String]
        videos: [String]
        loc: Location
        propertyType: String
        details: PropertyDetails
        descriptions: String
        active: Boolean
        quantity: Int
    }

    type AirBnB{
        _id: ID
        lister: Lister
        start_date: String
        end_date: String
        reservation: [Reservation]
        videos: [String]
        loc: Location
        propertyType: String
        details: PropertyDetails
        descriptions: String
        active: Boolean
    }

    type Reservation{
        lister: Lister
        airBnB: AirBnB
        start_date: String
        end_date: String
        price: Float
        update_at: String
    }

    input createUser{
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        UserType: String!
        phoneNumber: String!
    }

    input createProperty{
        images: [String]!
        videos: [String]
        studio: Boolean
        quantity: Int!
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

    input search{
        location: String
        priceMin: Float
        priceMax: Float
        bedMin: Int
        bedMax: Int
        bathMin: Int
        bathMax: Int
        parking: Boolean
    }

    type Status{
        status: String
        msg: String
    }

    type listing{
        properties:  [Property]
    }

    type AuthPayload {
        token: String!
        user: User
    }
    
    type RootQuery {
        getProperty(input: search): listing
    }

    type RootMutation {
        createRole(name: String!): Status
        SignUp(input: createUser):Status
        Login(email: String!, password: String!): AuthPayload
        createProperty(input: createProperty):Status
        checkoutHome(place: ID, from: String): Status
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }

`)