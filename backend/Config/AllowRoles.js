export const AllowRoles = {
    "Admin": 84359023,
    "BuyOrRent": 22049030191,
    "Listing": 2240890432
}

export function getObjectKey(value) {
    return Object.keys(AllowRoles).find((key) => AllowRoles[key] === value);
}

// export const CustomerPageInternal = ['createReview', 'getImage', 'UploadImage', 'Login', 'SignUp', 'getProperty', 'getAirBnb', 'sendVerification', 'resetPassword', 'VerifyAccount']
// export const CustomerRental = ['createProperty', 'createAirBnb']