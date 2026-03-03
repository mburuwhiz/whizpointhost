const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/:pdfname.pdf', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    res.contentType("application/pdf");
    res.send(pdfBuffer);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000/document.pdf 🚀'));
