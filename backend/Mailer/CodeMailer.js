import nodemailer from "nodemailer";
import {User} from '../Models/User.js';
import fs from 'fs'
import path from 'path'
import hbs from 'handlebars'
import { GraphQLError } from 'graphql'
import smtpTransport from 'nodemailer-smtp-transport';
const __dirname = path.resolve();

export const CodeMailer = async (file, locals) =>{
    console.log(path.join(__dirname, '/Templates'));
    // Open template file
    const source = fs.readFileSync(path.join(__dirname, '/Templates', file), 'utf8');
    // Create email generator
    const template = hbs.compile(source);
    // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        // host: process.env.host,
        //port: process.env.port,
        // host: 'blessmuss@proton.me',
        // port:587,
        // secure: false, // true for 465, false for other ports
        // logger: false,
        // debug: false,
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "saylujalloh@gmail.com",
            // 'blessmuss@proton.me',
            pass:  "bembcqtjglpwwwac"
            //'WeCodeforEver@1'
        },
        // logger: true,
        // transactionLog: true, // include SMTP traffic in the logs
        // allowInternalNetworkInterfaces: false
    }
    // ,{
    //     from: `<${process.env.user}>`,
    // }
    )

    let mailOption = {
        to: `<${locals.email}>`,
        from: 'saylujalloh@gmail.com',
        subject: "Account Verification",
        text: 'Guinea Real Estte (GRE) 🇬🇳',
        html: template(locals),
        headers:{
            "Sensitivity": "Company-sensitive",
            "Importance": "high"
        }
    }

    await transporter.sendMail(mailOption, (error, info) =>{
        if(error){
            throw Error(error)
        }
        return info
        
    })

}
