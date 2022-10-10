

// Validate email & password
export const validateEmail = (email) =>{
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(email){
        if(!emailRegex.test(email)){
            return({
                messgae: "Email is not valid format. Ex: example@mail.com",
                success: false
            })
        }else{
            return({
                messgae: "Email is valid",
                success: true
            })
        }
    }
}

export const validatePassword = (password) =>{
    if(password){
        const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,20})')
        const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
        
        if(!strongPassword.test(password) || !mediumPassword.test(password)){
            return({
                messgae:"Password is not valid. Valid format,[Aa-zZ, 0-9, !@#$%^&*]",
                success: false
            })
        }else{
            return({
                messgae: "Strong password",
                success: true
            })
        } 
    }
}

export const validMatch= (password, matchPass) =>{
    if(password !== matchPass){
        return({
            messgae: "Password don't match.",
            success: false
        })
    }else{
        return({
            messgae: "Password match.",
            success: true
        })
    }
}


export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}