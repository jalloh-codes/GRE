import {SIGN_UP} from './mutation';
import { useMutation } from '@apollo/client';


export const SignUp = async ({Firstname, Lastname, Email, Password, UserType, PhoneNumber}) =>{
    const [SignUp, { loading}] = useMutation(SIGN_UP);
    console.log(Firstname);
    const send = await SignUp({
        variables:{
            firstname: Firstname,
            lastname: Lastname,
            email: Email,
            password: Password,
            UserType: UserType,
            phoneNumber: PhoneNumber
        }
    })

    console.log(send);

    return send

}   