export const Listing = ['createProperty', 'getProperty']
export const BuyOrRent = ['getProperty']

const avalianleRoles =  new Set(Listing.concat(BuyOrRent))

export const functionality =  Array.from(avalianleRoles)


//  module.exports  =  {Listing, BuyOrRent, functionality}