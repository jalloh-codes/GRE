# GRE
private project


## BACKEND

   # User Model
        - firstname required
        - lastname required
        - email required
        - password required
        - UserType 'BuyOrRent' or 'Listing' required
        - phoneNumber required
   # House Model
        - lister required (NO INPUT NEEDED)
        - region required
        - commune: required
        - lat required
        - lng required
        - images required
        - quantity: required
        - videos
        - propertyType 'House', 'Room', 'Apartment'
        - length required
        - width required
        - bed required
        - bath required
        - parking (Default set to  == False)
        - airCondition: (Default set to  == False)
        - furnished: Boo(Default set to  == False)lean
        - wifi: (Default set to  == False)
        - built 
        - price required
        - descriptions
        - active
# Message Model
        _ message_to: ID
        - message_from: ID
        - message: String
        - created_at: Date
# Bot Model (contact us form input)
        _ firstName: String: required
        - lastName: String: required
        - email: String
        _ phoneNumberL String: required
        - created_at: Date: required
