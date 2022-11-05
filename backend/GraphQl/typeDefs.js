import {buildSchema}  from 'graphql'
import { gql } from 'apollo-server-express';
// const {} = require('./scalarTypes')


export const typeDefs = buildSchema(`
    scalar role 
    scalar Upload
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
        role: String
        phoneNumber: String!
    }
    type Location{
        region: String
        commune: String
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
        images: propertyImageType
        videos: [String]
        loc: Location
        propertyType: String
        details: PropertyDetails
        descriptions: String
        active: Boolean
        quantity: Int
    }

    type propertyImageType{
        profile: String!
        imagesArray: [String]
    }

    type AirBnB{
        _id: ID
        lister: Lister
        reservation: [Reservation]
        videos: [String]
        loc: Location
        propertyType: String
        details: PropertyDetails
        descriptions: String
        active: Boolean
    }

    type Review{
        lister: User
        property: AirBnB
        range: Int
        statement: String
        created_at: String
    }

    type Reservation{
        lister: Lister
        airBnB: AirBnB
        start_date: String
        end_date: String
        price: Float
        update_at: String
    } 

    type Verify{
        user: User
        code: String
    }

    input createUser{
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        phoneNumber: String!
        UserType: String!
    }

    input createProperty{
        profile: Upload!
        imagesArray: [Upload]
        videos: [String]
        studio: Boolean
        quantity: Int!
        length: Int
        width: Int
        bed: Int!
        bath: Int!
        propertyType: String!
        built: Int
        price: Float!
        descriptions: String
        region: String!
        commune: String!
        lat: Float!
        lng: Float!
        parking: Boolean
        airCondition: Boolean
        furnished: Boolean
        wifi: Boolean
    }

    input airbnbInput{
        studio: Boolean
        length: Int
        width: Int
        bed: Int!
        bath: Int!
        images: [String]!
        name: String
        propertyType: String
        built: Int
        price: Float!
        descriptions: String
        region: String!
        commune: String!
        lat: Float!
        lng: Float!
        parking: Boolean
        airCondition: Boolean
        furnished: Boolean
        wifi: Boolean
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

    input searchAirBnb{
        start: String
        end: String
        location: String
        priceMin: Float
        priceMax: Float
        bedMin: Int
        bedMax: Int
        bathMin: Int
        bathMax: Int
        parking: Boolean
        airCondition: Boolean
        wifi: Boolean
        furnished: Boolean
        propertyType: String
    }

    input review{
        lister: ID!
        property: ID!
        range: Int
        statement: String
        created_at: String
    }

    type Status{
        status: Boolean
        message: String
    }

    type VerifyStatus{
        session: String
        status: Boolean
        message: String
    }
    type SignUpStatus{
        account: Boolean
        verification: Boolean
        message: String
    }

    type listing{
        properties: [Property]
    }
    type ListingAirBnb{
        airbnb: [AirBnB]
    }
    type ImageUrl{
        image: String!
    }

    type AuthPayload {
        token: String!
        user: Lister
    }
    
    type RootQuery {
        getProperty(input: search): listing
        getAirBnb(input: searchAirBnb): ListingAirBnb
        getImage(fileKey: String!): ImageUrl
    }

    type RootMutation {
        createRole(name: String!): Status
        SignUp(input: createUser): SignUpStatus
        Login(email: String!, password: String!): AuthPayload
        createProperty(input: createProperty):Status
        createAirBnb(input: airbnbInput):Status
        checkoutHome(place: ID, from: String): Status
        sendVerification(email: String!): Status
        resetPassword(oldPassword: String, newPassword: String!, email: String): Status
        VerifyAccount(user: String!, code: String!): VerifyStatus
        UploadImage(file: Upload): Status
        createReview(input: review): Status
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }

`);