import { gql} from "@apollo/client";
// $email: String!, $password: String!, $UserType: String!, $phoneNumber: String!
//, email: $email, password:$password, UserType: $UserType, phoneNumber: $phoneNumber
export const SIGN_UP = gql`
mutation SignUp($email: String!, $password: String!, $firstname: String!, $lastname: String!, $phoneNumber: String!, $UserType: String!){
  SignUp(input:{email: $email, password: $password, firstname: $firstname, lastname: $lastname, phoneNumber: $phoneNumber, UserType: $UserType}){
    status
    message
  }
}
`

export const VERIFY_ACCOUNT = gql`
mutation VerifyAccount($user: String!, $code:String!){
  VerifyAccount(user: $user, code: $code){
    status
    message
  }
}
`

export const SEND_VERIFICATION = gql`
mutation  sendVerification($email: String!){
  sendVerification(email: $email){
      status
      message
    }
}
`


export const LOGIN = gql`
mutation Login($email: String!, $password: String!){
  Login(email: $email, password:$password){
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