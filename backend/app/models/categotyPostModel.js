// import connection
import db from "../config/database.js";
 
// Get All Articles
export const getCategories = (result) => {
    const sqlQuery = `
        SELECT * FROM Category;
    `;
    db.query(sqlQuery, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}