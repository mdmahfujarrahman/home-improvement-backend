import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/database.connect.js";
import { hashing } from "../util/passowrdHash.js";

export const register =(req, res) => {
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q,[req.body.email], (err, data) => {
        console.log(req.body);
        if (err) return res.status(500).send(err);
        if (data.length)
            return res.status(409).send({ message: "User Already Exit" });

         const hash = hashing(req.body.password);

        const q = "INSERT INTO users(`name`, `email`, `password`) VALUES(?)";
        const values = [req.body.name, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.send(err);
            return res.status(200).send({ message: "User has been created" });
        });


    })
}
export const login =(req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) res.send(err);

        if(data.length === 0) return res.status(404).send({ message: "User Not Found"})

        const isPasswordRight = bcrypt.compareSync(
            req.body.password,
            data[0]?.password
        );

        if(!isPasswordRight) return res.status(400).send({ message:"Wrong password"})

        const token = jwt.sign({id: data[0].id},"jwttoken");
        const { password, ...other } = data[0];
        return res.status(200).json({
            success: true,
            token: token,
            userData: other
        });
    })


}
export const logout =(req, res) => {
    
}