import express from 'express'

const app = express();
app.use(express.json());
app.get('/api', (req, res) => {
    res.status(200).send("API is Alive and Kicking")
})

app.listen('3001', () => {
    console.log("Server is Running on port 3001")
})