const express = require('express');
const { handleGenrateNewShortUrl, handleGetAnalytics, handleGetUrl } = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenrateNewShortUrl)
router.get('/:shortId', handleGetUrl)
router.get("/analytics/:shortId", handleGetAnalytics)
module.exports = router