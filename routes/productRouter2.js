const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');
const auth = require('../middleware/auth');

router
    .route('/product')
    .post(auth, productCtrl.createProduct)
    .get(auth, productCtrl.getProducts);

router
    .route('/post/:id')
    .patch(auth, productCtrl.updateProduct)
    .get(auth, productCtrl.getProduct)
    .delete(auth, productCtrl.deleteProduct);

router.get('/user_products/:id', auth, productCtrl.getUserProducts);

router.patch('/saveProduct/:id', auth, productCtrl.saveProduct);

router.patch('/unSaveProduct/:id', auth, productCtrl.unSaveProduct);

router.get('/getSaveProduct', auth, productCtrl.getSaveProducts);

module.exports = router;
