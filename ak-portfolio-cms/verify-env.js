require('dotenv').config();
console.log('Cloud Name:', process.env.CLOUDINARY_NAME ? 'Length: ' + process.env.CLOUDINARY_NAME.length : 'MISSING');
console.log('Key:', process.env.CLOUDINARY_KEY ? 'Length: ' + process.env.CLOUDINARY_KEY.length : 'MISSING');
console.log('Secret:', process.env.CLOUDINARY_SECRET ? 'Length: ' + process.env.CLOUDINARY_SECRET.length : 'MISSING');
