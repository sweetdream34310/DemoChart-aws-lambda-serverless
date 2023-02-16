import {combineTemplates, sendMail} from "./mailings";

import {FRONTEND_URL, LANDING_PAGE_URL} from '../config';
import {UserTypes} from "../../../../lib/types/UserTypes";


interface IDeclined {
    firstName: string;
    role: UserTypes;
}

export function template(params: IDeclined){
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
		<p class="text"><span style="font-size: 18px;">Dear ${params.firstName}! </span></p>
		<p class="text"><span style="font-size: 18px;">Thank you for applying to Democharts. Our team reviewed your application, and due to the high number of requests, you were put on the waiting list. Once we let more ${params.role === UserTypes.Artist ? 'artists' : 'experts'} in, we’ll notify you.<br />Thank you for your patience, and see you soon!</span></p>
		<p class="text">Democharts</p>
	</div>
</div>

<!--[if mso]>
</td></tr></table>
<![endif]-->

`
}


export default async function sendDeclinedByAdmin(email: string, params: IDeclined) {
    return sendMail(email, 'You\'re on the waiting list.', combineTemplates(template, params))
}