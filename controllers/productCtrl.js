const Products = require('../models/productModel');
const Users = require('../models/userModel');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productCtrl = {
    createProduct: async (req, res) => {
        try {
            const { content, images, price } = req.body;

            if (images.length === 0)
                return res.status(400).json({ msg: 'Please add your photo.' });

            const newProduct = new Products({
                content,
                images,
                user: req.user._id,
                price
            });
            await newProduct.save();

            res.json({
                msg: 'Created Product!',
                newProduct: {
                    ...newProduct._doc,
                    user: req.user
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getPosts: async (req, res) => {
        try {
            const features = new APIfeatures(
                Products.find({
                    user: [...req.user.following, req.user._id]
                }),
                req.query
            ).paginating();

            const products = await features.query
                .sort('-createdAt')
                .populate('user likes', 'avatar username fullName followers')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password'
                    }
                });

            res.json({
                msg: 'Success!',
                result: posts.length,
                products
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updatePost: async (req, res) => {
        try {
            const { content, images, price } = req.body;

            const product = await Products.findOneAndUpdate(
                { _id: req.params.id },
                {
                    content,
                    images,
                    price
                }
            )
                .populate('user likes', 'avatar username fullName')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password'
                    }
                });

            res.json({
                msg: 'Updated Post!',
                newProduct: {
                    ...product._doc,
                    content,
                    images,
                    price
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserProducts: async (req, res) => {
        try {
            const features = new APIfeatures(
                Products.find({ user: req.params.id }),
                req.query
            ).paginating();
            const products = await features.query.sort('-createdAt');

            res.json({
                products,
                result: products.length
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProducts: async (req, res) => {
        try {
            const product = await Products.findById(req.params.id)
                .populate('user likes', 'avatar username fullName followers')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password'
                    }
                });

            if (!product)
                return res
                    .status(400)
                    .json({ msg: 'This post does not exist.' });

            res.json({
                product
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProductsDicover: async (req, res) => {
        try {
            const newArr = [...req.user.following, req.user._id];

            const num = req.query.num || 9;

            const products = await Products.aggregate([
                { $match: { user: { $nin: newArr } } },
                { $sample: { size: Number(num) } }
            ]);

            return res.json({
                msg: 'Success!',
                result: products.length,
                products
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProducts: async (req, res) => {
        try {
            const product = await Products.findOneAndDelete({
                _id: req.params.id,
                user: req.user._id
            });
            await Comments.deleteMany({ _id: { $in: product.comments } });

            res.json({
                msg: 'Deleted Post!',
                newProduct: {
                    ...product,
                    user: req.user
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    saveProduct: async (req, res) => {
        try {
            const user = await Users.find({
                _id: req.user._id,
                saved: req.params.id
            });
            if (user.length > 0)
                return res.status(400).json({ msg: 'You saved this product.' });

            const save = await Users.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: { saved: req.params.id }
                },
                { new: true }
            );

            if (!save)
                return res
                    .status(400)
                    .json({ msg: 'This user does not exist.' });

            res.json({ msg: 'Saved Product!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    unSaveProduct: async (req, res) => {
        try {
            const save = await Users.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $pull: { saved: req.params.id }
                },
                { new: true }
            );

            if (!save)
                return res
                    .status(400)
                    .json({ msg: 'This user does not exist.' });

            res.json({ msg: 'unSaved Post!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getSaveProducts: async (req, res) => {
        try {
            const features = new APIfeatures(
                Products.find({
                    _id: { $in: req.user.saved }
                }),
                req.query
            ).paginating();

            const saveProducts = await features.query.sort('-createdAt');

            res.json({
                saveProducts,
                result: saveProducts.length
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = productCtrl;
