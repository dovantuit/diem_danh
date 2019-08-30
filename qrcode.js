var QRCode = require('qrcode')



const tao_code = (text) => {
    // QRCode.toString(text, { type: 'terminal' }, function (err, url) {
    //     return console.log(url)
    // })
    QRCode.toDataURL(text, function (err, url) {
        return console.log(url)
    })

}


module.exports = { tao_code }
// tao_code()