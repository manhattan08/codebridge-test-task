const Dog = require('../models/dog-model');
const { validationResult } = require('express-validator');

class DogController{
    async ping(req,res){
        try{
            res.send('Dogshouseservice.Version1.0.1');
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Server Error' });
        }
    }
    async getAllDogs(req,res){
        try{
            const {attribute,order,pageNumber,limit} = req.query;
            const dogs = await Dog.findAll({
                order: [[attribute || 'id', order || 'ASC']],
                offset: pageNumber && limit ? (pageNumber - 1) * limit : 0,
                limit: limit || 10
            });
            res.json(dogs);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Server Error' });
        }
    }
    async createDog(req,res){
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, color, tail_length, weight } = req.body;

            const existingDog = await Dog.findOne({ where: { name } });
            if (existingDog) {
                return res.status(400).json({ error: 'Dog with the same name already exists' });
            }

            const newDog = await Dog.create({ name, color, tail_length, weight });

            return res.status(200).json(newDog);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Server Error' });
        }
    }
}

module.exports = new DogController()