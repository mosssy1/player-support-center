// import connection
import db from "../config/database.js";
 
// Get All reportsToAdmin
export const getReportsForAdmin = (result) => {
    const sqlQuery = `
    SELECT 
        r.id_report,
        r.id_user,
        r.status,
        r.date_of_create,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id_comment', c.id_comment,
                'id_user', c.id_user,
                'username', u.username,
                'role', u.role,
                'text', c.text,
                'datetime', c.datetime
            )
        ) AS comments
    FROM 
        Report r
    LEFT JOIN 
        Comment c ON r.id_report = c.id_report
    LEFT JOIN 
        User u ON c.id_user = u.id_user
    GROUP BY
        r.id_report;
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
//getReportsOfUser
export const getReportsForUser = (id, result) => {
    const sqlQuery = `
    SELECT 
        r.id_report,
        r.id_user,
        r.status,
        r.date_of_create,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id_comment', c.id_comment,
                'id_user', c.id_user,
                'username', u.username,
                'role', u.role,
                'text', c.text,
                'datetime', c.datetime
            )
        ) AS comments
    FROM 
        Report r
    LEFT JOIN 
        Comment c ON r.id_report = c.id_report
    LEFT JOIN 
        User u ON c.id_user = u.id_user
    GROUP BY
        r.id_report;
    `;
    db.query(sqlQuery, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const filteredReports = results.filter(report => report.id_user == id);
            result(null, filteredReports);
        }
    });   
}

// Insert Comment to Report
export const insertCommentToReport = (data, result) => {
    const commentParams = [
        data.id_report,
        data.id_user,
        data.text,
        data.datetime
    ];
    db.query("INSERT INTO Comment (id_report, id_user, text, datetime) VALUES (?, ?, ?, ?)", commentParams, (err, commentResults) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            return result({
                message: 'success',
                id_comment: commentResults.insertId,
                datetime: data.datetime,
                id_user: data.id_user,
                role: data.role,
                username: data.username,
                text: data.text
            },
            null);
        }
    });  
}

// Create new report + Comment
export const createReport = (data, result) => {
    const reportParams = [
        data.id_user,
        data.status,
        data.date_of_create
    ];
    db.query("INSERT INTO Report (id_user, status, date_of_create) VALUES (?, ?, ?)", reportParams, (err, reportResults) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            const commentParams = [
                reportResults.insertId,
                data.id_user,
                data.text,
                data.datetime
            ];
            db.query("INSERT INTO Comment (id_report, id_user, text, datetime) VALUES (?, ?, ?, ?)", commentParams, (err, commentResults) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    return result({
                        message: 'success',
                        report: {
                            comments: [
                                {
                                    datetime: data.datetime,
                                    id_comment: commentResults.insertId,
                                    id_user: data.id_user,
                                    role: data.role,
                                    text: data.text,
                                    username: data.username
                                }
                            ],
                            date_of_create: data.date_of_create,
                            id_report: reportResults.insertId,
                            id_user: data.id_user,
                            status: data.status
                        }
                    },
                    null);
                }
            })
        }
    });  
}

export const updateStatusReportById = (data, id, result) => {
    db.query("UPDATE Report SET status = ? WHERE id_report = ?", [data.status, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}



