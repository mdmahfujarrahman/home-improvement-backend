import jwt from "jsonwebtoken";
import { db } from "../config/database.connect.js";

export const getPosts = (req, res) => {
    const query = req.query.category ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts"
    db.query(query, [req.query.category], (err, results) => {
        if (err) return res.send(err)
        return res.status(200).send(results);
    });
};

export const getSinglePost = (req, res) => {
    
    const query =
        "SELECT  posts.id,`name`, `title`,`des`, users.img, posts.img,`category`,`date` FROM users JOIN posts ON users.id=posts.uid WHERE posts.id=?";

    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.send(err);
        return res.status(200).send(result[0]);
    });
};
export const addPost = (req, res) => {};
export const deletePost = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(401).send({message: 'Not Authenticated'})

    jwt.verify(token, "jwttoken", (err, userInfo) => {
        if (err) return res.status(403).send({ message: "Token is not valid" });
        const postId = req.params.id;
        const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ? ";
        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err)return res.status(403).send({ message: "you can't delete this post" });
            return res.send({ message: "Post deleted successfully" });
        });
    });


    
};
export const updatePost = (req, res) => {};
