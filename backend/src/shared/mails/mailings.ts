import templateHeader from "./templateHeader";
import templateFooter from "./templateFooter";
import nodemailer from "nodemailer";
import { NO_REPLY } from "../config";
const pug = require('pug');

export const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.mail.eu-west-1.awsapps.com',
    port: 465,
    secure: true,
    auth: {
        user: NO_REPLY.email,
        pass: NO_REPLY.password,
    },
});


export async function sendMail(email: string, subject: string, html: string) {
    const params = {
        // from: {
        //     name: 'Democharts',
        //     address: 'no-reply@democharts.org',
        // },
        // from: `Democharts <hello@democharts.org>`,
        from: `Democharts <no-reply@democharts.org>`,
        // envelope: {
        // from: 'Democharts <no-reply@democharts.org>', // used as MAIL FROM: address for SMTP
        // to: email,
        // to: 'mailer@nodemailer.com, Mailer <mailer2@nodemailer.com>' // used as RCPT TO: address for SMTP
        // },
        // replyTo: 'no-reply@democharts.org',
        to: email,
        subject: subject,
        html: html,
    };

    console.log("Mail params: ", params);
    const response = await transporter.sendMail(params);
    console.log("Mail sent:", response)
}


/**
 *
 * @param bodyHtml the body html as a string
 * @param params that will be used within the header, bodyHtml and the footer
 * @returns template string
 */
export function combineTemplates(bodyHtml: (params: any) => {}, params: any) {
    return templateHeader(params) + bodyHtml(params) + templateFooter(params);
}


/**
 * TODO: replace html strings with pug
 */
// export async function sendApprovedByAdmin(email: string, params: any) {
// TODO so for pug did not work with aws lambda, we need to achieve that pug uses a local path instead the absolute...
// const pugString = fs.readFileSync(__dirname+"/templates/expert_confirmed_by_admin.pug", 'utf8');

// console.log("PUGSTRING")
// console.log(pugString)
// const compiledFunction = pug.compile(pugString);
//
// console.log(compiledFunction(params));
//
// return sendMail(email, 'You\'re in.', compiledFunction({name: 'Timothy'} ))
// }

///////////////   ------ send demo email with pug template ---- 
// const pugFile = fs.readFileSync(__dirname+"/templates/expert_confirmed_by_admin.pug", 'utf8');
const compiledFunction = pug.compileFile('./pug_not_in_use_yet/template.pug');

export async function sendDemoEmailUsingPug(email: string, subject: string, params: any) {
    //TODO so for pug did not work with aws lambda, we need to achieve that pug uses a local path instead the absolute...
    // const pugString = fs.readFileSync(__dirname+"/templates/expert_confirmed_by_admin.pug", 'utf8');
    const bodyHtml = compiledFunction({
        params: params // the params for the pug template. the pug design is not ready yet.
    })

    // html to send email.
    const html = combineTemplates(
        bodyHtml,
        params
    )

    return sendMail(email, subject, html)
}
// const renderFunction = pug.renderFile('./pug_not_in_use_yet/template.pug')

