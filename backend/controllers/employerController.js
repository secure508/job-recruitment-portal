const db = require("../database/db");

// Register Employer
const registerEmployer = (req, res) => {

    const {
        companyName,
        email,
        phone,
        address,
        description,
        password
    } = req.body;

    if (!companyName || !email || !phone || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    db.get(
        "SELECT * FROM employers WHERE email = ?",
        [email],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (row) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            db.run(
                `INSERT INTO employers
                (companyName,email,phone,address,description,password)
                VALUES(?,?,?,?,?,?)`,
                [
                    companyName,
                    email,
                    phone,
                    address,
                    description,
                    password
                ],
                function(err){

                    if(err){

                        return res.status(500).json({
                            success:false,
                            message:err.message
                        });

                    }

                    res.json({
                        success:true,
                        message:"Employer registered successfully.",
                        employerId:this.lastID
                    });

                }

            );

        }

    );

};

// Employer Login
const loginEmployer = (req, res) => {

    const { email, password } = req.body;

    db.get(

        "SELECT * FROM employers WHERE email = ? AND password = ?",

        [email, password],

        (err, employer) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            if (!employer) {

                return res.status(401).json({

                    success: false,

                    message: "Invalid email or password."

                });

            }

            res.json({

                success: true,

                message: "Login Successful!",

                employer

            });

        }

    );

};
module.exports = {
    registerEmployer,
    loginEmployer
};