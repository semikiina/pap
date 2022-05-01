const express = require('express');
const router = express.Router();
const Review = require('../controllers/review')
const Auth = require('../middleware/token');

//GET /review/:product_id
router.get('/:product_id', Review.GetReviews)

//POST /review
router.post('/', Review.NewReview)


//DELETE /review/:id
router.delete('/:id', Review.DeleteReview)


module.exports = router;