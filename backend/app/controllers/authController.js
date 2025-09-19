
import { registerUserModel, loginUserModel, updateUserImagePath } from "../models/authModel.js";

export const createUser = (req, res) => {
    const data = req.body;
    registerUserModel(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const loginUser = (req, res) => {
    const data = req.body;
    loginUserModel(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const updateUserImage = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateUserImagePath(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}