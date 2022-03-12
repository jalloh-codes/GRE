# GRE
private project


## BACKEND

    # User Model
        - firstname required
        - lastname required
        - email required
        - password required
        - UserType 'BuyOrRent' or 'Listing'
        - phoneNumber required
   # House Model (Villa or  room)
        - lister required (NO INPUT NEEDED)
        - region required
        - lat required
        - lng required
        - images
        - videos
        - propertyType 'House' or 'Room'
        - length required
        - width required
        - bed required
        - bath required
        - parking (Default set to  == False)
        - built 
        - price required
        - descriptions
        - active
   # Building (Apartment or Hotel)
        - name
        - propertyType 'Apartments' or  'Hotel'
        - lister required (NO INPUT NEEDED)
        - region required
        - lat required
        - lng required
        - units ONLY ENTER WHEN ADDING NEW "UNIT"
        - parking (Default set to  == False)
        - built 
   # Unit use for (Apartment or Hotel)
        - building
        - length required
        - width required
        - bed required
        - bath required
        - parking (Default set to  == False)
        - price required
        - descriptions

