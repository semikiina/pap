const Review = require('../models/review');

exports.GetReviews = (req, res, next) => {
    
    console.log('Get /review')
    Review.find({product_id : req.params.product_id})
    .populate('user_id', ['first_name',"last_name", 'nickname', 'profile_pic'])
    .then((rev)=>{
        res.status(201).json({rev})
    })
    .catch((error)=>{
        console.log(error);
        return res
            .status(422)
            .json({
                message: "Failed to update review. Please try again later.",
                errors: error
            })
    })
}

exports.NewReview = (req, res, next) => {
    
    console.log('POST /review')
    var ReqReview = {...req.body}
    const review = new Review({
        user_id: ReqReview.user_id,
        product_id: ReqReview.product_id,
        description: ReqReview.description,
        review: ReqReview.review,
        date_created : Date.now(),
    })
    review.save()
    .then((rev)=>{
        res.status(201).json({message:"Review created sucessfully."})
    })
    .catch((error)=>{
        console.log(error);
        return res
            .status(422)
            .json({
                message: "Failed to upload review. Please try again later.",
                errors: error
            })
    })
}

exports.DeleteReview = (req, res, next) => {
    
    console.log('DELETE /review/:id')
    Review.deleteOne({_id : req.params.id})
        .then(rev => {
            res.status(200).json(rev)
        })
        .catch(error => {
            console.log(error);
            return res
                .status(422)
                .json({
                    message: "Can't find the product.",
                    errors: error
                })
        })
}

exports.NewFavorite = (req, res, next) => {
    console.log('New Fav')
    const userId = req.params.userid;
    Review.findOne({_id: req.params.id , favorites : userId})
    .then(product=>{
        if(!product.favorite.includes(userId)){
            product.updateOne({ $push : { favorites: userId}}).exec()
        }
        else{
            product.updateOne({ $pull : { favorites: userId}}).exec()
        }

        return product.save()
    })
    .then(result=>{
        res.status(200).json({
            fav: result
        })
    })
    
    .catch(error => {
        console.log(error)
        return res
            .status(422)
            .json({
                message: "Operation failed.Try again later.",
                errors: error
            })
    })
}