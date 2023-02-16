import fs from 'fs';
import nodemailer from 'nodemailer';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { NO_REPLY } from '../shared/config';
import { bucketFolders, fileTypes } from '../shared/enums';
import { uplaodToBucket } from '../shared/helpers';
import {transporter} from "../shared/mails/mailings";

const bucket = process.env.DATA_BUCKET || '';


export interface InvocieData {
	id: string;
	email: string;
	credits: number;
	name: string;
	amount: number;
	currency: string;
}

export async function sendInvoice(data: InvocieData): Promise<any> {
	const invoicePdf = await getInvoicePdf(data);

	await uplaodToBucket(
		invoicePdf,
		`invoice-${data.id}`,
		fileTypes.pdf,
		fileTypes.pdf,
		bucket,
		bucketFolders.invoices
	);
	console.log('Invoice saved');

	const params = {
		from: {
			name: 'no reply (Democharts)',
			address: 'no-reply@democharts.org',
		},
		replyTo: 'no-reply@democharts.org',
		to: data.email,
		subject: 'Your Democharts Invoice',
		html: getHtml(),
		attachments: [
			{
				filename: 'invoice.pdf',
				content: invoicePdf,
			},
		],
	};

	return transporter.sendMail(params);
}

async function getInvoicePdf(data: InvocieData): Promise<Buffer> {
	const invoicePdf = await fs.promises.readFile(
		__dirname + '/assets/invoice.pdf'
	);

	const invoice = await PDFDocument.load(invoicePdf);

	const helveticaBoldFont = await invoice.embedFont(
		StandardFonts.HelveticaBold
	);

	const pages = invoice.getPages();
	const firstPage = pages[0];

	const date = new Date();
	const dateString = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;
	const valueString = `${data.credits} Democharts Credits`;
	const sum = data.amount.toFixed(2) + data.currency;
	const sumExclusive = (data.amount / 1.2).toFixed(2) + data.currency;
	const vat = (data.amount - data.amount / 1.2).toFixed(2) + data.currency;

	firstPage.setFont(helveticaBoldFont);
	firstPage.setFontSize(8);

	// Draw datestring
	firstPage.drawText(dateString, {
		x: 320,
		y: 550,
	});

	// Draw invoiceNr
	firstPage.drawText(data.id, {
		x: 320,
		y: 530,
	});

	// Draw fullname
	firstPage.drawText(data.name, {
		x: 58,
		y: 580,
	});

	// Draw valueString
	firstPage.drawText(valueString, {
		x: 58,
		y: 398,
	});

	// Draw totla price
	firstPage.drawText(sum, {
		x: 448,
		y: 398,
	});

	// Draw sum exclusive
	firstPage.drawText(sumExclusive, {
		x: 448,
		y: 367,
	});

	// Draw vat
	firstPage.drawText(vat, {
		x: 448,
		y: 336,
	});

	// Draw sum
	firstPage.drawText(sum, {
		x: 448,
		y: 305,
	});

	return invoice.save().then((e) => Buffer.from(e.buffer));
}

function getHtml(): string {
	return `
    <h1>Thanks for your purchase</h1>
    <p>You will find your invoice attached</p>
  `;
}
