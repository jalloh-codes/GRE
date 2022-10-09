import { gql} from "@apollo/client";
// $email: String!, $password: String!, $UserType: String!, $phoneNumber: String!
//, email: $email, password:$password, UserType: $UserType, phoneNumber: $phoneNumber

export const UPLOAD_IMAGE = gql`
mutation UploadImage($file: Upload){
  UploadImage(file: $file){
    status
    message
  }
}
`



export const SIGN_UP = gql`
mutation SignUp($email: String!, $password: String!, $firstname: String!, $lastname: String!, $phoneNumber: String!, $UserType: String!){
  SignUp(input:{email: $email, password: $password, firstname: $firstname, lastname: $lastname, phoneNumber: $phoneNumber, UserType: $UserType}){
    account
    verification
    message
  }
}
`

export const RESET_PASSWORD = gql`
mutation resetPassword($oldPassword: String!, $newPassword: String!, $email: String){
  resetPassword(oldPassword: $oldPassword, newPassword: $newPassword, email: $email){
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
    session
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
mutation createProperty($studio: Boolean, $descriptions: String, $airCondition: Boolean, 
  $furnished: Boolean, $wifi: Boolean, $profile: Upload!, $imagesArray: [Upload],
   $bed: Int!, $bath: Int!,$built: Int
  $region: String!, $lat: Float!, $lng: Float!, $price: Float!, $width: Int,
   $length: Int, $commune: String!, $propertyType: String!, $quantity: Int!, $parking: Boolean!){
  
  createProperty(input: {studio: $studio, built: $built, profile: $profile, imagesArray: $imagesArray, descriptions: $descriptions, airCondition: $airCondition, furnished: $furnished, wifi: $wifi, bed: $bed, bath: $bath, price: $price, region: $region, lat: $lat, lng: $lng, width: $width, length:$length, commune:$commune, propertyType: $propertyType, quantity: $quantity, parking: $parking}){
    status
    message
  }
}
`

