const mongoose = require('mongoose');

const dotenv = require('dotenv');
const app = require('./app');
const { doc } = require('prettier');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
// .connect(process.env.DATABASE_LOCAL, {  
    .connect(DB, {
 
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
    
})
.then( () => console.log('DB connection successfull!'));

const tourSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'A tour must have a price'],
        unique: true
    },
    rating: {
        type: Number,
        default:4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }

});

const Tour = mongoose.model('Tour',tourSchema);

const testTour= new Tour({
    name: 'The linkin park',
    price:497
});


testTour.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log('ERROR 🌟 ',err);
});

// console.log(app.get('env')); //set by express
// console.log(process.env); // env variables set by node 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app running on the port ${port}...`);
});