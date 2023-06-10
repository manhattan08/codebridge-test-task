const UserRouter = require('express').Router;
const router = new UserRouter();
const dogController = require("../controllers/dog-controller");
const validateDogData = require("../validations/dog-validation")

router.get("/ping",dogController.ping)
router.get("/dogs",dogController.getAllDogs)
router.post("/dog",validateDogData,dogController.createDog)

module.exports = router;