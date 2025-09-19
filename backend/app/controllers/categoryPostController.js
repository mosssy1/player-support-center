// Import function from Product Model
import { getCategories } from "../models/categotyPostModel.js";
 
// Get All Articles
export const showCategories = (req, res) => {
    getCategories((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}