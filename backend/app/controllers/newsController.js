// Import function from Product Model
import { getNews, updateNewsBlock } from "../models/newsModel.js";
 
// Get All News
export const showNews = (req, res) => {
    getNews((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update news
export const updateNews = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateNewsBlock(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
