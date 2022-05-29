const express = require('express');
const compression = require('compression');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const storeRoutes = require('./routes/store');
const orderRoutes = require('./routes/order');
const feedRoutes = require('./routes/feed');
const reviewRoutes = require('./routes/review');


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
var cors = require('cors');
const path = require('path');

const app = express();
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
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') cb(null, true);
  else cb(null, false);

}


app.use(bodyParser.json());
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('image', 6))

app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

//Set Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')//Vários sites podem acessar aminha API
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Origin", "*");
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

//localhost:8090/review
app.use('/review', reviewRoutes);



//Handling errors
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.StatusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
})

//Database Connection
mongoose.connect(`mongodb+srv://default:gYUfuNa2PplUeOZo@tagme.bekir.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)
  .then(result => {
    console.log('connected to server!');
    app.listen(port);
  })
  .catch(error => {
    console.log('error: ' + error)
  })


