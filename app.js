const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()
var cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
// const userRouter = require('./routes/user')
const fs = require('fs');
autoIncrement = require('mongoose-auto-increment');
// bodyParser Mideddleware
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));


app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// make the file publically accessable 
app.use('/uploads', express.static('uploads'));
// routes


app.use(morgan('dev'))


app.use('/users', require('./routes/user/base'))
app.use('/clients', require('./routes/user/client'))
// app.use('/company', companyRouter)
// app.use('/admin', adminSalesRouter)
// app.use('/admin', adminStoreRouter)
// app.use('/admin', adminPurshaseRouter)
// app.use('/admin', adminProfitRouter)
// app.use('/shop', shopRouter)
// app.use('/dept', deptRouter)




mongoose.connect(process.env.DB_key, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app run on port${port}`)
})