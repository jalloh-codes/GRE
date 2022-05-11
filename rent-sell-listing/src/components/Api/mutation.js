import { gql} from "@apollo/client";
// $email: String!, $password: String!, $UserType: String!, $phoneNumber: String!
//, email: $email, password:$password, UserType: $UserType, phoneNumber: $phoneNumber
export const SIGN_UP = gql`
mutation signup($email: String!, $password: String!, $firstname: String!, $lastname: String!, $phoneNumber: String!, $UserType: String!){
  signup(input:{email: $email, password: $password, firstname: $firstname, lastname: $lastname, phoneNumber: $phoneNumber, UserType: $UserType}){
    status
    message
  }
}
`


export const LOGIN = gql`
mutation login($email: String!, $password: String!){
  login(email: $email, password:$password){
    token
    user{
        _id
        firstname
        lastname 
        email 
    }
  }
}
`

export const Add_Sell_Property = gql`
mutation createProperty($studio: Boolean, $descriptions: String, $airCondition: Boolean, $furnished: Boolean, $wifi: Boolean, $images:[String]!, $bed: Int!, $bath: Int!, $region: String!, $lat: Float!, $lng: Float!, $price: Float!, $width: Int, $length: Int, $commune: String!, $propertyType: String!, $quantity: Int!, $parking: Boolean!){
  
  createProperty(input: {studio: $studio, descriptions: $descriptions, airCondition: $airCondition, furnished: $furnished, wifi: $wifi, images: $images, bed: $bed, bath: $bath, price: $price, region: $region, lat: $lat, lng: $lng, width: $width, length:$length, commune:$commune, propertyType: $propertyType, quantity: $quantity, parking: $parking}){
    status
    message
  }
}
`