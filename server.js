const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Verify Access Route
app.post('/verify-access', (req, res) => {
    const { birthday, anniversary } = req.body;

    // The dates from your Gemini instruction
    const correctBday = "24/02/2003";
    const correctAnniv = "07/11/2024";

    if (birthday === correctBday && anniversary === correctAnniv) {
        res.json({ 
            success: true, 
            message: "Access Granted. Hello my one and only! ❤️",
            // This is where he will be redirected after success
            redirectUrl: "/surprise" 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Identity unconfirmed. Are you sure you're my boyfriend? 🤨" 
        });
    }
});

// Surprise Route (Serves surprise.html)
app.get('/surprise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'surprise.html'));
});

app.listen(PORT, () => {
    console.log(`Love Terminal is running at http://localhost:${PORT}`);
});
