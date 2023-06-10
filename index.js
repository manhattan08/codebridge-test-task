require('dotenv').config();
const  express = require("express");
const  sequelize = require("./db");
const router_dog = require("./routes/dogRouter");
const PORT = process.env.PORT || 5000;
const Dog = require('./models/dog-model');
const timeout = require('connect-timeout');

const app = express();

app.use(express.json());
app.use("/",router_dog)
app.use(timeout('5s'));

async function initializeDatabase() {
    try {
        await Dog.sync({ force: true });

        const dogsData = [
            { name: 'Neo', color: 'red&amber', tail_length: 22, weight: 32 },
            { name: 'Jessy', color: 'black&white', tail_length: 7, weight: 14 },
        ];

        await Dog.bulkCreate(dogsData);
    } catch (error) {
        console.error('Error initialization:', error);
    }
}

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync()
        await  initializeDatabase()
        app.listen(PORT,()=>{
            console.log(`server starting on ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
}
start();