import { getReportsForUser, getReportsForAdmin, insertCommentToReport, createReport, updateStatusReportById } from "../models/reportModel.js";
 
// Get All Reports To User
export const showUserReports = (req, res) => {
    const id = req.params.id;
    getReportsForUser(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Reports To admin
export const showAdminReports = (req, res) => {
    getReportsForAdmin((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

//insert CommentToReport
export const setCommentToReport = (req, res) => {
    const data = req.body;
    insertCommentToReport(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
//new report 
export const setNewReport = (req, res) => {
    const data = req.body;
    createReport(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Status
export const updateReportStatus = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateStatusReportById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
