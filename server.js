const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const CSV_FILE = path.join(__dirname, "users.csv");

// Create CSV file if it doesn't exist
if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(
        CSV_FILE,
        "firstName,lastName,email,phone,password\r\n"
    );
}

// REGISTER
app.post("/register", (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    const csvData = fs.readFileSync(CSV_FILE, "utf8");

    if (csvData.includes(`,${email},`)) {
        return res.json({
            success: false,
            message: "Email already registered"
        });
    }

    const row =
`${firstName},${lastName},${email},${phone},${password}\r\n`;

    fs.appendFileSync(CSV_FILE, row);

    res.json({
        success: true,
        message: "Registration Successful"
    });
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    const rows = fs.readFileSync(CSV_FILE, "utf8")
        .split("\n")
        .slice(1);

    for (let row of rows) {

        if (!row.trim()) continue;

        const [
            firstName,
            lastName,
            userEmail,
            phone,
            userPassword
        ] = row.split(",");

        console.log("CSV Email:", userEmail);
        console.log("CSV Password:", userPassword);

        if (
            userEmail.trim().toLowerCase() === email.trim().toLowerCase() &&
            userPassword.trim() === password.trim()
        ) {
            console.log("LOGIN SUCCESS");

            return res.json({
                success: true,
                user: {
                    firstName,
                    lastName,
                    email: userEmail.trim(),
                    phone
                }
            });
        }
    }

    console.log("LOGIN FAILED");

    res.json({
        success: false,
        message: "Invalid Email or Password"
    });
});
app.get("/users", (req, res) => {
    const data = fs.readFileSync(CSV_FILE, "utf8");
    res.send(`<pre>${data}</pre>`);
});
app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});