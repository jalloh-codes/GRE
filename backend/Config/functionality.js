const Listing = ['createProperty', 'getProperty']
const BuyOrRent = ['getProperty']

const avalianleRoles =  new Set(Listing.concat(BuyOrRent))

const functionality =  Array.from(avalianleRoles)


 module.exports  =  {Listing, BuyOrRent, functionality}