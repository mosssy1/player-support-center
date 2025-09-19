
// import express
import express from "express";
 
// import function from controller
import { getAllUserMarks, userSetMarkForPost, showArticles, updateArticleDescAndNameById, updateArticleImagePath, createArticle, deleteArticle } from "../controllers/articleControllers.js";
import { showCategories } from "../controllers/categoryPostController.js";
import { createUser, loginUser, updateUserImage } from "../controllers/authController.js";
import { showUserReports, showAdminReports, setCommentToReport, setNewReport, updateReportStatus } from '../controllers/reportsController.js'
import { showNews, updateNews } from '../controllers/newsController.js'
// init express router
const router = express.Router();

//setMarkForPost
router.post('/setMarkForPost', userSetMarkForPost);

//getAllUserMarks
router.get('/getAllUserMarksByUserId/:id', getAllUserMarks);

//get articles for vuex
router.get('/getAllArticles', showArticles);

//get categories for vuex
router.get('/getAllCategories', showCategories);

// Update Article
router.put('/updateArticleDescAndName/:id', updateArticleDescAndNameById);

// Update Article image
router.put('/updateArticleImagePath/:id', updateArticleImagePath);

// createArticle
router.post('/createArticle', createArticle);

// Delete Article
router.delete('/deleteArticle/:id', deleteArticle);

router.post('/register', createUser);

router.post('/login', loginUser);

router.post('/updateUserImagePath/:id', updateUserImage);

router.get('/getAllUserReports/:id', showUserReports);
router.get('/getAllAdminReports', showAdminReports);
router.post('/setComment', setCommentToReport);
router.post('/setNewReport', setNewReport);
router.put('/updateStatusReport/:id', updateReportStatus);

//get all news
router.get('/getAllNews', showNews);
//update news
router.put('/updateNews/:id', updateNews);

 
 
// // Get All Product
// router.get('/products', showProducts);
 
// // Get Single Product
// router.get('/products/:id', showProductById);
 
// // Create New Product
// router.post('/products', createProduct);
 
// // Update Product
// router.put('/products/:id', updateProduct);
 
// // Delete Product
// router.delete('/products/:id', deleteProduct);
 
// export default router
export default router;