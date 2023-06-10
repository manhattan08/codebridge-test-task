const { body } = require('express-validator');

module.exports = validateDogData = [
    body('name').notEmpty().withMessage('Name is required'),
    body('color').notEmpty().withMessage('Color is required'),
    body('tail_length').notEmpty().isFloat({ min: 0 }).withMessage('Tail length is required and cannot be negative!'),
    body('weight').notEmpty().withMessage('Weight is required'),
];