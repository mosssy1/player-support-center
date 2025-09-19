
import db from "../config/database.js";

export const registerUserModel = (data, result) => {
    const userParamsObject = {
        email: data.email,
        password: data.password,
        username: data.username,
        role: data.role
    };
    const userParamsMassive = [
        data.email,
        data.password,
        data.username,
        data.role
    ];
    db.query('SELECT * FROM User WHERE email = ?', [userParamsObject.email], (error, userExists) => {
        if(error) {
            console.log(error);
            result(error, null);
        } else {
            if (userExists.length > 0) {
                return result({ message: 'errorEmail' }, null);
            } else {
                const insertUserQuery = "INSERT INTO User (email, password, username, role) VALUES (?, ?, ?, ?)";
                db.query(insertUserQuery, userParamsMassive, (error, insertUserResult) => {
                    if(error) {
                        console.log(error);
                        result(error, null);
                    } else {
                        return result(
                            { 
                                message: 'success',
                                id_user: result.insertId,
                                email: userParamsObject.email,
                                username: userParamsObject.username,
                                role: userParamsObject.role
                            },
                            null
                        );
                    }
                })
            }
        }
    })
};

// Вход в систему
export const loginUserModel = (data, result) => {
    const userParamsObject = {
        email: data.email,
        password: data.password,
    };
    const userParamsMassive = [
        data.email,
        data.password
    ];
    db.query('SELECT * FROM User WHERE email = ?', [userParamsObject.email], (error, userExists) => {
        if(error) {
            console.log(error);
            result(error, null);
        } else {
            if (userExists.length == 0) {
                return result({ message: 'errorEmail'}, null);
            } else {
                if (userExists[0].password != userParamsObject.password) {
                    return result({ message: 'errorPassword'}, null);
                } else {
                    db.query('SELECT * FROM User_image WHERE id_user = ?', [userExists[0].id_user], (error, userImageResult) => {
                        if(error) {
                            console.log(error);
                            result(error, null);
                        } else {
                            if (userImageResult.length == 0) {
                                return result({
                                    message: 'success',
                                    id_user: userExists[0].id_user,
                                    email: userExists[0].email,
                                    username: userExists[0].username,
                                    role: userExists[0].role,
                                    image_path: ''
                                },
                                null);
                            } else {
                                return result({
                                    message: 'success',
                                    id_user: userExists[0].id_user,
                                    email: userExists[0].email,
                                    username: userExists[0].username,
                                    role: userExists[0].role,
                                    image_path: userImageResult[0].image_path
                                },
                                null);
                            }
                        }
                    })
                }
            }
        }
    })
};


export const updateUserImagePath = (data, id, result) => {
    const updateImageQuery = "UPDATE User_image SET image_path = ? WHERE id_user = ?";
    const updateImageParams = [data.image_path, id];
    const insertImageQuery = "INSERT INTO User_image (id_user, image_path) VALUES (?, ?)";
    const insertImageParams = [id, data.image_path];

    db.query('SELECT * FROM User_image WHERE id_user = ?', [id], (error, userImageExist) => {
        if(error) {
            console.log(error);
            result(error, null);
        } else {
            if (userImageExist.length > 0) {
                //обновление картинки если уже была
                db.query(updateImageQuery, updateImageParams, (err, updateImageResults) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, updateImageResults);
                    }
                });
            } else {
                db.query(insertImageQuery, insertImageParams, (err, insertImageResults) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, insertImageResults);
                    }
                });
            }
        }
    })
};

