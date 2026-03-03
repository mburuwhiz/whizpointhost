const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const getFiles = () => JSON.parse(fs.readFileSync('files.json', 'utf8')).availableFiles;

app.get('/:pdfname.pdf', (req, res) => {
    const fileName = `${req.params.pdfname}.pdf`;
    const filePath = path.join(__dirname, fileName);

    if (getFiles().includes(fileName) && fs.existsSync(filePath)) {
        res.contentType("application/pdf");
        return res.sendFile(filePath);
    }
    res.status(404).send('Sorry, that PDF is not in the list or the folder! ❌');
});

app.get('/', (req, res) => {
    const listItems = getFiles().map(file => `<li><a href="/${file}">${file}</a></li>`).join('');
    res.send(`<h1>Document Library</h1><ul>${listItems}</ul>`);
});

app.listen(3000, () => console.log('Server running! Check it out at http://localhost:3000 🌟'));
