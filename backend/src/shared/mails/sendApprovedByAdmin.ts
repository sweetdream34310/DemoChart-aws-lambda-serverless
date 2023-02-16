import {combineTemplates, sendMail} from "./mailings";

import {FRONTEND_URL, LANDING_PAGE_URL} from '../config';
import {UserTypes} from "../../../../lib/types/UserTypes";

interface IApproved {
    firstName: string;
    role: UserTypes;
}

export function template(params: IApproved){
    return `
<div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->

	<img align="center" border="0" class="center fixedwidth main-image" src="${LANDING_PAGE_URL}/images/emails/invite_emoj.png" width="100"/>
	<!--[if mso]></td></tr></table><![endif]-->
</div>

<!--[if mso]>
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif">
<![endif]-->

<div style="color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
	<div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">
		<p class="text"> </p>
		<p class="text"><span style="font-size: 18px;">You're in ${params.firstName}! </span></p>
		<p class="text"><span style="font-size: 18px;">We checked your application and are happy to confirm: You made the cut.</span></p>
		`

        +

        (params.role === UserTypes.Artist ?
        '<p class="text"><span>Now you can upload your first demo and connect with labels and scouts wordwide. As a little gift we’ve given you three upload credits for free. Show us you’ve got the next chart topper!</span></p>'
        : '')

        +

        `
	</div>
</div>

<!--[if mso]>
</td></tr></table>
<![endif]-->

<div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">

	<!--[if mso]>
	<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:31.5pt;width:174pt;v-text-anchor:middle;" arcsize="62%" stroke="false" fillcolor="#f15d5c"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
	<![endif]-->

	<div style="text-decoration:none;display:block;color:#ffffff;background-color:#f15d5c;border-radius:26px;-webkit-border-radius:26px;-moz-border-radius:26px;width:40%; padding: 12px 24px; width:calc(40% - 2px);;border-top:1px solid #f15d5c;border-right:1px solid #f15d5c;border-bottom:1px solid #f15d5c;border-left:1px solid #f15d5c;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;font-size:16px;display:inline-block;letter-spacing:undefined;">
    <a href="${LANDING_PAGE_URL}expert-confirmed?firstName=${params.firstName}" style="
        color: white;
        text-decoration: none;">Dive in</a></></div>

	<!--[if mso]>
	</center></v:textbox></v:roundrect></td></tr></table>
	<![endif]-->
</div>
`
}


export default async function sendApprovedByAdminArtist(email: string, params: IApproved) {
    return sendMail(email, 'You\'re in.', combineTemplates(template, params))
}