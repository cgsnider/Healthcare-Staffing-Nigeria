
const sharp = require('sharp');
const fs = require('fs');

const IMAGE_SIZE = [400, 400]

function objectArray (array) {
    let body = Object.entries(array);
    let obj = [];
    let temp = [];
    let index = 0;
    for (let i = 0; i < body.length; i++) {
        if (body[i][0].slice(-1) != index) {
            obj.push(Object.fromEntries(temp));
            temp = [];
            index ++;
        }
        temp.push([body[i][0].slice(0, -1), body[i][1]])
    }
    obj.push(Object.fromEntries(temp));   
    return obj;
}

function arrayObject(arr) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        let temp = Object.entries(arr[i])
        temp.forEach(element => element[0] += i);
        out = out.concat(temp)
    }
    out = Object.fromEntries(out);
    return out;
}



// function formatImage(req, res, next) {
//     const file = req.file
//     reshape(file.path)
//         .then(result => next())
//         .catch(err => {
//             console.log(err);
//             next();
//         })
// }

async function formatImage(path) {

    let meta = await sharp(path).metadata();

    await sharp(path).resize({height: Math.min(meta.height, IMAGE_SIZE[0]), width: Math.min(meta.width, IMAGE_SIZE[1])}).toFile(path + '_');
    
    fs.unlinkSync(path);
    fs.renameSync(path + "_", path);
}

module.exports.objectArray = objectArray; 
module.exports.arrayObject = arrayObject;
module.exports.formatImage = formatImage;
