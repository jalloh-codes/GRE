import { gql} from "@apollo/client";

export const GTE_PROPERTIES  = gql`
query getProperty($location: String, $priceMin: Float, $priceMax: Float, $bedMin: Int, $bedMax: Int, $bathMin: Int, $bathMax: Int, $parking: Boolean){
  getProperty(input:{location: $location, priceMin: $priceMin, priceMax: $priceMax, bedMin: $bedMin, bedMax: $bedMax, bathMin: $bathMin, bathMax: $bathMax, parking: $parking}){
    properties{
      _id
      images{
        profile
      }
      loc{
        region
        commune
        lat
        lng
      }
      propertyType
      details{
        studio
        price
        parking
        bed
        bath
        furnished
        wifi
      }
      active
    }
  }
}
`

export const GET_IMAGE = gql`
query getImage($fileKey: String!){
  getImage(fileKey: $fileKey){
    image
  }
}
`