'use strict';
const nodemailer = require('nodemailer');
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory

const transporter = nodemailer.createTransport({ // Use an app specific password here
    service: 'Gmail',
    auth: {
        user: 'homelesshacker2060@gmail.com',
        pass: 'mt#2ctlmn'
    }
});

const options = {
    from: 'homelesshacker2060@gmail.com',
    to: 'dovantuit@gmail.com',
    subject: 'UNIT GỬI VÉ MỜI QR CODE CHO BẠN',
    text: 'Đây là QR code dùng để check in của bạn, khi đi vui lòng mang theo để check in, xin cảm ơn',
    attachments: [
        {
            path: ABSPATH + '/logo.png'
        }
    ]
};

// transporter.verify(function (error, success) {
//     // Nếu có lỗi.
//     if (error) {
//         console.log(error);
//     } else { //Nếu thành công.
//         console.log('Kết nối thành công!');

//         transporter.sendMail(options, (error, info) => {
//             if (error) {
//                 console.log('error')
//             } else {
//                 console.log('success')
//             }
//         });
//     }
// });



module.exports = { transporter, options }

