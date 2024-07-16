const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenrateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: 'url is required' });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  })
  return res.render("home", {
    id: shortId,
  })
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId })
  return res.json({ totalClickCount: result.visitHistory.length, analystic: result.visitHistory })
}

async function handleGetUrl(req, res) {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: new Date().getDate()
          }
        }
      }
    );
    if (entry) {
      res.redirect(entry.redirectURL)
    } else {
      res.status(400).send("URL is not found")
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Server Error")
  }
}


module.exports = {
  handleGenrateNewShortUrl,
  handleGetAnalytics,
  handleGetUrl
}