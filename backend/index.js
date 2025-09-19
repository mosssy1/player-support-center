import express from "express";
import cors from "cors";
import Router from "./app/routes/routes.js";
import multer from "multer"

 
// init express
const app = express();

// Настройка multer для сохранения файлов в папку 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../bdProject/src/components/faq/components/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

// Разрешить доступ к папке 'uploads'
app.use('/uploads', express.static('uploads'));

// Обработчик маршрута для загрузки файла
Router.post('/upload', upload.single('file'), (req, res) => {
  // Здесь вы можете обработать информацию о загруженном файле
  res.send('success');
});
 
// use express json
app.use(express.json());
 
// use cors
app.use(cors());
 
// use router
app.use(Router);
 
app.listen(5000, () => console.log('Server running at http://localhost:5000'));