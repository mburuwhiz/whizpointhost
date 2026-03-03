const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const getFiles = () => JSON.parse(fs.readFileSync('files.json', 'utf8')).availableFiles;

app.get('/:pdfname.pdf', (req, res) => {
    const fileName = `${req.params.pdfname}.pdf`;
    const filePath = path.join(__dirname, fileName);

    if (getFiles().includes(fileName) && fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    }
    res.status(404).send('That PDF is not in the list! ❌');
});

app.get('/', (req, res) => {
    const listItems = getFiles().map(file => `<li><a href="/${file}">${file}</a></li>`).join('');
    res.send(`<h1>My PDF Library</h1><ul>${listItems}</ul>`);
});

app.listen(3000, () => console.log('Running without heavy dependencies! http://localhost:3000 🌟'));
