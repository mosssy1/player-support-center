// Import function from Product Model
import { allUserMarks, userPostMark, getArticles, updatePostNameAndDescById, updatePostImagePath, addNewArticle, deletePostById } from "../models/articlesModel.js";
 
// Get All Articles
export const showArticles = (req, res) => {
    getArticles((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update desc + name article
export const updateArticleDescAndNameById = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updatePostNameAndDescById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}


// Update image_path article
export const updateArticleImagePath = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updatePostImagePath(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Article
export const createArticle = (req, res) => {
    const data = req.body;
    addNewArticle(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Article
export const deleteArticle = (req, res) => {
    const id = req.params.id;
    deletePostById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// setMarkToPost
export const userSetMarkForPost = (req, res) => {
    const data = req.body;
    userPostMark(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get AllUserMarks
export const getAllUserMarks = (req, res) => {
    const id = req.params.id;
    allUserMarks(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}