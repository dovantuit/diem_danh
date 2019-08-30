// // import QRCode from 'qrcode'
// var QRCode = require('qrcode')

// QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
//     console.log(url)
//   })
// // With promises
// QRCode.toDataURL('I am a pony!')
//   .then(url => {
//     console.log(url)
//     // console.log('hello')
//   })
//   .catch(err => {
//     console.error(err)
//   })

// // With async/await
// const generateQR = async text => {
//   try {
//       console.log('>>>>>>')
//     console.log(await QRCode.toDataURL(text))
//   } catch (err) {
//     console.error(err)
//   }
// }

// generateQR('tom')