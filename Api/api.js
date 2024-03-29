const express = require('express');
const compression = require('compression');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const storeRoutes = require('./routes/store');
const orderRoutes = require('./routes/order');
const feedRoutes = require('./routes/feed');
const reviewRoutes = require('./routes/review');
const notificationRoutes = require('./routes/notification');

const notificationController = require('./controllers/notification');
const orderController = require('./controllers/order');

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
var cors = require('cors');
const path = require('path');
const app = express();
var port = process.env.PORT || 8090;

const io = require('socket.io')(3001, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

var onlineUsers=[]

const addNewUser = (token, socketID, storeToken) => {
    if(token){
        var decodedToken = jwt.verify(token, 'supersecrettagmetoken');
        var userID = decodedToken.id;

        var store =""
        if(storeToken){
            var decodedStoreToken = jwt.verify(storeToken, 'supersecretstoretagmetoken');
            var store = decodedStoreToken.id;
        }
    
        !onlineUsers.some((user) => user.userID === userID) &&
        onlineUsers.push({
            userID,
            socketID,
            store
        })

    }
}

const removeUser = (socketID) => {
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socketID)
}

const getUser = (socketID) => {
    return onlineUsers.find((user) => user.socketID == socketID)
}

const getStoreOwners = (storeID) => {
    return onlineUsers.filter((user) => {
        return user.store == storeID})
}


io.on("connection", (socket) => {

    socket.on('newUser' , (token ,store) => {
        addNewUser(token, socket.id , store)
    })

    socket.on('disconnect' , () => {
        removeUser(socket.id)
    })


    socket.on("sendFavoriteNotification", async (productID) =>{

        const userID = getUser (socket.id)
        if(userID){
            const newNot = await notificationController.newFavoriteNotification(userID.userID,productID);

            if(newNot){
                const storeOwners = await getStoreOwners(newNot.storeID._id.toString());
    
                console.log(storeOwners)
        
                storeOwners.forEach((user) => {
                    io.to(user.socketID).emit('notification', newNot.newNot);
                })
            }
            
        }
    });

  

});


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
  console.log(file)
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') cb(null, true);
  else cb(null, false);

}

app.use(cors())
app.use(bodyParser.json());
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('image', 6))

app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

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

//localhost:8090/notification
app.use('/notification', notificationRoutes);

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


