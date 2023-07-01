const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const { getShortUrls, createShortUrl, redirectToFullUrl, generateQRCode } = require('../controllers/urlshortenerController');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

/**
 * @swagger
 * /url:
 *   get:
 *     summary: Getting all URLs.
 *     description: Retrieve a list of URLs.
 *     responses:
 *       200:
 *         description: URLs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The URL ID.
 *                         example: 294567ghtdfes5yz81
 *                       full:
 *                         type: string
 *                         description: The long URL.
 *                         example: https://url-shortened-38sv.onrender.com
 *                       short:
 *                         type: string
 *                         description: The short URL.
 *                         example: 5jkk3216
 *                       click:
 *                         type: number
 *                         description: The number of clicks.
 *                         example: 3
 */
router.get('/url', getShortUrls);

/**
 * @swagger
 * /shortUrls:
 *   post:
 *     summary: Creating a URL.
 *     description: Create a short URL.
 *     responses:
 *       200:
 *         description: URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The URL ID.
 *                         example: 294567ghtdfes5yz81
 *                       full:
 *                         type: string
 *                         description: The long URL.
 *                         example: https://url-shortened-38sv.onrender.com
 *                       short:
 *                         type: string
 *                         description: The short URL.
 *                         example: 5jkk3216
 *                       click:
 *                         type: number
 *                         description: The number of clicks.
 *                         example: 1
 */
 router.post('/shortUrls', validateRequest, createShortUrl);

/**
 * @swagger
 * /:shortUrl:
 *   get:
 *     summary: Redirecting to full URL.
 *     description: Redirect to the full URL.
 *     responses:
 *       200:
 *         description: URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The URL ID.
 *                         example: 294567ghtdfes5yz81
 *                       full:
 *                         type: string
 *                         description: The long URL.
 *                         example: https://url-shortened-38sv.onrender.com
 *                       short:
 *                         type: string
 *                         description: The short URL.
 *                         example: 5jkk3216
 *                       click:
 *                         type: number
 *                         description: The number of clicks.
 *                         example: 2
 */
 router.get('/:shortUrl', redirectToFullUrl);

/**
 * @swagger
 * /generateqrcode:
 *   get:
 *     summary: Generate QR Code.
 *     description: Retrieve a QR code.
 *     responses:
 *       200:
 *         description: QR Code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The QR code ID.
 *                         example: 294567ghtdfes5yz81
 *                       full:
 *                         type: string
 *                         description: The long URL.
 *                         example: 253i9oteodmaqwrkm rmkamdqakeeqa
 */
router.get('/generateqrcode', generateQRCode);

module.exports = router;