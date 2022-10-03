const {unlinkSync} = require('fs');
const {join} = require('path');

const deleteFiles = (filename, path) => {
    unlinkSync(join(__dirname, `../../../public/img/${path}/${filename}`))
}

module.exports = {
    deleteFiles
}