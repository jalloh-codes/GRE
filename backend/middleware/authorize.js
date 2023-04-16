export const AllowPage = {
    "CustomerPageInternal": 'MDKD22049224089043203019184359023JDLDM',
    "CustomerRental": 'CMKDL220184359023JKD49224089043203019',
}

export function getObjectKey(value) {
    return Object.keys(AllowPage).find((key) => AllowPage[key] === value);
}

const validateKey = (key) => {
    const valid = Object.values(AllowPage).includes(key)
    if(valid){
        return{
            valid: true,
            key: getObjectKey(key)
        }
    }else{
        return{
            valid: false
        }
    }
}

export const authorize = (req, res, next) =>{
    try {
        let msg = 'Action Not Authorize'
        const keyHeader = req.get('API_KEY');
        if(!keyHeader || !keyHeader.length >0){
            return next(new Error(msg), false);
        }
        let validate = validateKey(keyHeader)
        if(validate.valid){
            req.API_KEY = validate
            return next()
        }else{
            return next(new Error(msg), false);
        }
    } catch (error) {
        return next(error);
    }
}