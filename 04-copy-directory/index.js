const fs = require('fs');
const path = require('path');


fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
    if (err) {
        return console.log('Не уадлось создать папку');
    }
});

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

let dir_arr = [];
fs.readdir(src, (err, files) => {
    if (err) {
        return console.log('Не удалось прочитать директорию files');
    }
    files.forEach(file => {
        dir_arr.push(file);
        const filePath = path.join(src, file);
        fs.copyFile(filePath, path.join(dest, file), (err) => {
            if (err) {
                return console.log(`Не удалось скопировать файл - ${file}`);
            }
        });
    })
})

fs.readdir(dest, (err, files) => {
    if (err) {
        return console.log('Не удалось прочитать директорию files-copy');
    }
    files.forEach(file => {
        if (!dir_arr.includes(file)) {
            fs.unlink(path.join(dest, file), (err) => {
                if (err) {
                    return console.log(`Не удалось удалить существующий файл - ${file}`);
                }
            });
        }
    })
})