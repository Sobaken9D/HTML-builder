const path = require('path');
const fs = require('fs');

const bundle_path = path.join(__dirname, 'project-dist', 'bundle.css');
const styles_path = path.join(__dirname, 'styles');

fs.writeFile(
    bundle_path,
    '',
    (err) => {
        if (err) throw err;
    }
);

fs.readdir(styles_path, {withFileTypes: true}, (err, files) => {
    if (err) {
        return console.log('Не удалось прочитать директорию styles');
    }
    files.forEach(file => {
        const filePath = path.join(styles_path, file.name);
        const fileExtension = path.extname(filePath).slice(1);
        if (!file.isDirectory() && fileExtension === 'css') {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    return console.log(`Не удалось прочитать файл ${file.name}`);
                }
                fs.appendFile(bundle_path, `${data.toString()}\n`, (err) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        }
    })
})