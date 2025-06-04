const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.json());

app.post('/buy', (req, res) => {
    const name = req.body.name || 'Anonymous';

    exec(`python3 server/generate_pdf.py "${name}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error generating certificate.');
        }

        const filePath = 'server/Certificate_of_Nothingness.pdf';
        res.download(filePath, 'Certificate_of_Nothingness.pdf');
    });
});

app.listen(port, () => {
    console.log(`Nothing Course app listening at http://localhost:${port}`);
});
