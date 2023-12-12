const userController = require('../controllers/userController');

const router = require('express').Router();
const{auth}  = require('../middleware');

router.post('/createUser',userController.createUser);
router.get('/getAllUsers',auth,userController.getAllUsers);
router.delete('/deleteUser',userController.deleteUser);
router.put('/updateUser',userController.updateUser);


module.exports = router;