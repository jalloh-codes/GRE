const nodemailer = require("nodemailer");
const User = require('../Models/User');
const fs =  require('fs')
const path = require('path')
const hbs = require('handlebars')
const { GraphQLError } = require('graphql');

const NewCode = async (account, code, locals) =>{
    // Open template file
    const source = fs.readFileSync(path.join(__dirname, 'password-reset.hbs'), 'utf8');
    // Create email generator
    const template = hbs.compile(source);
    // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        secure: true,
        auth: {
            user:  process.env.user,
            pass:  process.env.pass
        },
        
        tls:{
            rejectUnauthorized: true
        }
    },{
        from: `<${process.env.user}>`,
    })

    let mailOption = {
        to: `<${account.email}>`,
        from: `GRE 🇬🇳 <${process.env.user}>`,
        subject: "Account Verification",
        text: 'Guinea Real Estte (GRE) 🇬🇳',
        html: template(locals),
    }

    transporter.sendMail(mailOption, (error, info)=>{
        if(error){
            throw new GraphQLError("Email not sent")
        }
        return true
    })

}

module.exports = NewCode;