import Order from "../models/orderSchema.js";
import easyinvoice from 'easyinvoice';
import getDate from "../utils/getDate.js";
import nodemailer from 'nodemailer'
import twilio from 'twilio'

export const getOrders = async (req, res) => {
    try {
        const orders  = await Order.find({})

        res
            .status(200)
            .json({ orders })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}

export const postOrder = async (req, res) => {
    try {
        const { fullname, phoneNumber, items, subtotal, email } = req.body;

        const newOrder = await Order.create({
            fullname,
            phoneNumber,
            items,
            subtotal,
            email
        })

        var data = {
            "client": {
                "company": fullname,
            },
            "sender": {
                "company": "Tejas Nanoti",
            },
            "images": {
                "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png"
            },
            "information": {
                "number": `#${newOrder._id}`,
                "date": getDate(),
            },
            "products": items.map(item => { return { "quantity": item.quantity, "price": item.price, "description": item.name } }),
            "bottomNotice": "Thank You for shopping with invoiced!",
            "settings": {
                "currency": "INR",
            }
        };

        easyinvoice.createInvoice(data, function (result) {
            const senderMail = process.env.SENDER_MAIL
            const password = process.env.APP_SPECIFIC_PASSWORD

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: senderMail,
                    pass: password
                }
            });

            const mailOptions = {
                from: senderMail,
                to: email,
                subject: 'Invoice for your order at Invoiced',
                text: `Please find the attached invoice below. Invoice #${newOrder._id}`,
                attachments: [{
                    filename: 'invoice.pdf',
                    content: result.pdf,
                    encoding: 'base64'
                }]
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: "Error sending email" });
                } else {
                    res.status(200).json({ message: "Email sent successfully" });
                }
            });
        });

        const accountSid = process.env.TWILIO_ACCOUNT_SID
        const auth = process.env.TWILIO_AUTH
        const twilioPhone = process.env.TWILIO_PHONE

        console.log(auth, accountSid);

        const client = twilio(accountSid, auth)

        client.messages
            .create({
                body: `\n\nHello ${fullname}! Thank you for shopping with invoiced! Your order number is #${newOrder._id} with a subtotal of \u20B9${subtotal} containing the following items.\n\n${items.map(item => `${item.name} (${item.quantity})`).join('\n')}\n\nThank you and visit again!`,
                from: twilioPhone,
                to: `+91${phoneNumber}`
            })
            .then(message => console.log(message.sid))

        res
            .status(200)
            .json({ message: "Order saved successfully" })

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}