const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
        console.log("Email Sent!");
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

app.post('/', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send("Email is required.");
    }

    sendMail({
        to: email,
        from: "varinjpether@gmail.com",
        subject: "Task2.1",
        text: "Yippie",
    })
    .then(() => {
        res.sendFile(__dirname + '/index.html');
    })
    .catch((error) => {
        console.error("Error:", error);
        res.status(500).send("Error sending email.");
    });
});

app.listen(8080, () => {
    console.log("Server Running on http://localhost:8080");
});
