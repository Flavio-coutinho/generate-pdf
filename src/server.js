const express = require('express');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const { response } = require('express');
const app = express();


const SoftwareDevelopers = [
    {
        name: 'John',
        company: 'Google',
        technology: 'Node.js',
    },

    {
        name: 'Coutinho',
        company: 'Amazon',
        technology: 'Python',
    },

    {
        name: 'Bill',
        company: 'Microsoft',
        technology: 'TypeScript',
    },
]

app.get('/pdf', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()

    await page.goto('http://localhost:3001/', {
        waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: '20px',
            bottom: '40px',
            left: '20px',
            right: '20px'
        }
    });

    await browser.close()

    res.contentType("application/pdf")

    return res.send(pdf)
})

app.get('/', (req, res) => {

    const filePath = path.join(__dirname, "index.ejs");
    ejs.renderFile(filePath, { SoftwareDevelopers }, (err, html) => {
        if (err) {
            return res.send('Error reading file')
        }


        return res.send(html)

    })

})

app.listen(3001)