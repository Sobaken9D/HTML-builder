const path = require('path');
const fs = require('fs');
const { error } = require('console');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
    if (err) {
        return console.log('Не удалось прочитать директорию');
    }
    files.forEach(file => {
        if (!file.isDirectory()) {
            const fileName = file.name.split('.')[0];
            const filePath = path.join(__dirname, 'secret-folder', file.name);
            const fileExtension = path.extname(filePath).slice(1);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.log('Не удалось прочитать характеристики файла');
                }
                console.log(`${fileName} - ${fileExtension} - ${stats.size} байт`);
            })
        }
    })
})