const { error } = require('console');
const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const txt_path = path.join(__dirname, 'text.txt');
const line = readline.createInterface(process.stdin, process.stdout);
fs.access(txt_path, (error) => {
    if (error) {
        fs.writeFile(
            path.join(__dirname, 'text.txt'),
            '',
            (err) => {
                if (err) throw err;
            }
        );
    }
})

console.log('Введите текст: ');
line.on('line', (data1) => {
    fs.readFile(txt_path, (error, data2) => {
        if (error) {
            return console.error(error.message);
        }
        if (data1 == 'exit') {
            line.close();
            console.log('До свидания');
        }
        let text = data2 + '\n' + data1;
        fs.writeFile(txt_path, text.trim(), (error) => {
            if (error) {
                return console.error(error.message);
            }
        })
    })
});

line.on('SIGINT', () => {
    console.log('До свидания');
    line.close();
})

process.on('exit', () => {
    process.exit();
})

