const express = require('express');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const storeRoutes = require('./routes/store');
const orderRoutes = require('./routes/order');
const feedRoutes = require('./routes/feed');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
var cors = require('cors');
const path = require('path');

const app = express();
const router = express.Router();
var port = process.env.PORT || 8090;


//File Storage for images
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+'_'+Date.now()+file.originalname)
  }
});

//Accept only images
const fileFilter = (req, file, cb) => {
  console.log('entrou')
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') cb(null, true);
  else cb(null, false);

}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('image', 6))

app.use('/uploads', express.static(path.join(__dirname,'/uploads')));


const corOpt ={
  origin:'http://localhost:3000',
  credentials: true,
}

app.use(cors(corOpt))
//Set Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')//Vários sites podem acessar aminha API
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader('Acess-Control-Allow-Methods', 'GET, HEAD , OPTIONS , POST, PUT, PATCH, DELETE')//Os sites podem usar todos os métodos
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, UAuthorization, SAuthorization");
  next();
})


//localhost:8090/users
app.use('/user', userRoutes);

//localhost:8090/product
app.use('/product', productRoutes);

//localhost:8090/store
app.use('/store', storeRoutes);

//localhost:8090/order
app.use('/order', orderRoutes);

//localhost:8090/feed
app.use('/feed', feedRoutes);



//Handling errors
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.StatusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
})

//Database Connection
mongoose.connect('mongodb+srv://crislinda:tagme123@tagme.bekir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(result => {
    console.log('connected to server!');
    app.listen(port);
  })
  .catch(error => {
    console.log('error: ' + error)
  })


