import express from 'express'
import cors from 'cors'
import swagger from "./swagger.js"
import { makePublication } from "./publication.js"

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { promises as fsPromises } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const { readFile } = fsPromises

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Intelmotor web scraping API')
})


/**
 * @swagger
 * paths:
 *   /publication:
 *     post:
 *       summary: Create a publication
 *       tags: 
 *         - Publications
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publication'
 *       responses:
 *         200:
 *           description: The created publication.
 *         500:
 *           description: Some server error
 * components:
 *   schemas:
 *     Publication:
 *       type: object
 *       required:
 *         - price
 *         - description
 *       properties:
 *         price:
 *           type: number
 *           description: The price for the car in the publication
 *         description:
 *           type: string
 *           description: The description of the car in the publication
 *         imageBase64:
 *           type: string
 *           description: The screenshot image in base64 of the publication
 *       example:
 *         price: 90000
 *         description: This is a description for a demo car acura sedan
 */
app.post('/publication', async (req, res) => {
    const { price, description } = req.body
    try {
        await makePublication(price, description)
        const imageBase64 = await readFile(join(__dirname, 'images', 'publication.png'), { encoding: 'base64' })
        res.json({ price, description, imageBase64 })
    } catch (error) {
        res.status(500).send(error)
    }
});

swagger(app)

app.listen(4500, () => {
  console.log('Server started on port 4500')
})