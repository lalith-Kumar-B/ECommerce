import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });
import Product from "../models/productModel.js"
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";

async function createProduct(req, res) {
    try {
        req.body.user = req.user._id;
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        const data = req.body;
        data.images = imagesLink;

        const product = await new Product(data);
        await product.save();
        res.json({ success: true, product });

    } catch (error) {
        console.log(error.message);
    }
}

async function getAllProducts(req, res, next) {
    try {
        const itemsPerpage = 8;
        const productCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product, req.query).search().filter().pagination(itemsPerpage);
        const products = await apiFeature.query;
        res.json({ success: true, products, productsCount: productCount, resultPerPage: itemsPerpage });
    } catch (error) {
        console.log(error.message);
    }
}

async function getAdminProducts(req, res, next) {
    const products = await Product.find();
    res.json({ success: true, products: products });
}

async function updateProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
      
        if (images !== undefined) {
          for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }
      
          const imagesLinks = [];
      
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
            });
      
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
      
          req.body.images = imagesLinks;
        }
        await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const newProduct = await Product.findOne({ _id: req.params.id }).exec();
        res.json({ success: true, newProduct });
    } catch (err) {
        res.json({ success: false, message: "no product exits" });
    }
}

async function deleteProduct(req, res) {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        res.json({ success: false, message: "no product exits" });
    } else {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        await Product.deleteOne({ _id: req.params.id }).exec();
        res.json({ success: true, message: "deleted product" });
    }
}

async function getProductDetails(req, res) {
    try {
        const product = await Product.findById(req.params.id).exec();
        res.json({ success: true, product });
    } catch (e) {
        res.json({ success: false, message: "no product exits" });
    }
}

async function createProductReview(req, res) {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment
    }
    const product = await Product.findById(productId);
    if (product.reviews.find(rev => rev.user.toString() === req.user._id.toString())) {

        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let sum = 0;
    product.reviews.forEach(rev => sum += rev.rating);
    product.rating = (sum == 0) ? 0 : (sum / product.reviews.length);
    await product.save({ validateBeforeSave: false });
    res.json({ success: true, message: "review posted successfully" });
}

async function getProductReviews(req, res) {

    const product = await Product.findById(req.query.id);
    if (!product) {
        res.json({ success: false, message: "no reviews exists" });
    }
    res.json({ success: true, reviews: product.reviews });
}

async function deleteReview(req, res, next) {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(res.json({ success: false, message: "no reviews exists" }));
    } else {
        const reviews = product.reviews.filter(rev => (rev._id.toString() !== req.query.id.toString()));

        let sum = 0;
        reviews.forEach(rev => sum += rev.rating);
        const rating = (sum === 0) ? 0 : (sum / reviews.length);
        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(req.query.productId, { reviews: reviews, rating: rating, numOfReviews: numOfReviews },
            { new: true, runValidators: false, useFindAndModify: false });
        res.json({ success: true, reviews: "review deleted succesfully" });
    }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts };