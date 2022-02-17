const express = require('express');
const ejs = require('ejs');
const path = require('path');
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

app.get('/', (req, res) => {

    const filePath = path.join(__dirname, "index.ejs");
    ejs.renderFile(filePath, { SoftwareDevelopers }, (err, data) => {
        if (err) {
            return res.send('Error reading file')
        }

        return res.send(data)
    })

})

app.listen(3000)