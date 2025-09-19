// import connection
import db from "../config/database.js";
 
// Get All Articles
export const getArticles = (result) => {
    const sqlQuery = `
        SELECT 
            p.id_post,
            p.name,
            p.description,
            p.date_of_create,
            p.date_of_update,
            p.rating,
            pi.image_path AS post_image_path,
            c.name AS category_name
        FROM 
            Post p
        LEFT JOIN 
            Post_image pi ON p.id_post = pi.id_post
        LEFT JOIN 
            Post_category pc ON p.id_post = pc.id_post
        LEFT JOIN 
            Category c ON pc.id_category = c.id_category;
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
// Функция для обновления данных в таблице Post
export const updatePostNameAndDescById = (data, id, result) => {
    const updatePostQuery = "UPDATE Post SET name = ?, description = ?, date_of_update = ? WHERE id_post = ?";
    const postParams = [data.name, data.description, data.time, id];

    db.query(updatePostQuery, postParams, (err, postResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, postResults);
        }
    });
};

export const updatePostImagePath = (data, id, result) => {
    const updatePostQuery = "UPDATE Post_image SET image_path = ? WHERE id_post = ?";
    const postParams = [data.image_path, id];

    db.query(updatePostQuery, postParams, (err, postResults) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, postResults);
        }
    });
};

// Insert Article to Database
export const addNewArticle = (data, result) => {
    const insertArticleQuery = "INSERT INTO Post (name, description, date_of_create, date_of_update, rating) VALUES (?, ?, ?, ?, ?)";
    const articleParams = [
        data.name,
        data.description,
        data.date_of_create,
        data.date_of_update,
        data.rating
    ];

    db.query(insertArticleQuery, articleParams, (err, insertResult) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const id_post = insertResult.insertId;
            const imageParams = [
                id_post,
                data.post_image_path
            ];
            const insertImageQuery = "INSERT INTO Post_image (id_post, image_path) VALUES (?, ?)";
            const postCategotyParams = [
                id_post,
                data.category_id
            ];
            const insertPostCategoryQuery = "INSERT INTO Post_category (id_post, id_category) VALUES (?, ?)";
            //запрос на картинку 
            db.query(insertImageQuery, imageParams, (err, imageInsertResult) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    // запрос на вставку категории
                    db.query(insertPostCategoryQuery, postCategotyParams, (err, postCategoryInsertResult) => {
                        if (err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, { 
                                articleResult: insertResult, 
                                imageResult: imageInsertResult,
                                postCategoryResult: postCategoryInsertResult
                            });
                        }
                    })
                }
            });
        }
    });
};

// Delete Article to Database
export const deletePostById = (id, result) => {
    db.query("DELETE FROM Post_category WHERE id_post = ?", [id], (err, PostCategoryResult) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            db.query("DELETE FROM Post_image WHERE id_post = ?", [id], (err, PostImageResult) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    db.query("DELETE FROM Post WHERE id_post = ?", [id], (err, PostResult) => {             
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, { 
                                articleResult: PostResult, 
                                imageResult: PostImageResult,
                                postCategoryResult: PostCategoryResult
                            });
                        }
                    })
                }
            })
        }
    });   
}

// set Mark For Article
export const userPostMark = (data, result) => {
    const insertUserPostMarkQuery = "INSERT INTO User_post_mark (id_user, id_post, mark) VALUES (?, ?, ?)";
    const UserPostMarkParams = [
        data.id_user,
        data.id_post,
        data.mark
    ];

    db.query(insertUserPostMarkQuery, UserPostMarkParams, (err, insertMarkResult) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const getAllPostMarksQuery = "SELECT * FROM User_post_mark WHERE id_post = ?";
            const getAllPostMarksParams = [
                data.id_post
            ];
            db.query(getAllPostMarksQuery, getAllPostMarksParams, (err, getAllMarksResult) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    let sumOfMarks = getAllMarksResult.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.mark;
                    }, 0);
                    let newRatingRaw = sumOfMarks / getAllMarksResult.length
                    let newRatingFixed = newRatingRaw.toFixed(2);
                    let newRatingNumber = parseFloat(newRatingFixed)
                    const updateRatingQuery = "UPDATE Post SET rating = ? WHERE id_post = ?";
                    const updateRatingParams = [
                        newRatingNumber,
                        data.id_post
                    ];
                    db.query(updateRatingQuery, updateRatingParams, (err, updateRatingResult) => {
                        if (err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, { 
                                insertMarkResult: insertMarkResult, 
                                getAllMarksResult: getAllMarksResult,
                                updateRatingResult: updateRatingResult,
                                newRating: newRatingNumber
                            });
                        }
                    })
                }
            });
        }
    });
};

// get ALLUSERMARKS
export const allUserMarks = (id, result) => {
    const Query = `SELECT * FROM User_post_mark WHERE id_user = ?;`;

    db.query(Query, id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(results, id)
            result(null, results);
        }
    });
};




