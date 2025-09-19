// import connection
import db from "../config/database.js";
 
// Get All News
export const getNews = (result) => {
    const sqlQuery = `SELECT * FROM News;`;
    db.query(sqlQuery, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

//save news After Editing
export const updateNewsBlock = (data, id, result) => {
    const updateNewsQuery = "UPDATE News SET header = ?, text = ?, image_path = ? WHERE id_news = ?";
    const newsParams = [data.header, data.text, data.image_path, id];

    db.query(updateNewsQuery, newsParams, (err, newsResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, newsResults);
        }
    });
};