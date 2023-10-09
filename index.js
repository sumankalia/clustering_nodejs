import express from 'express';

const port = 5001;
const app = express();

app.get('/intense', (req, res) => {
    let total = 0;
    for(let i=0; i< 5000000; i++) {
        total++;
    }

    res.send(`The result of the CPU intensive task is ${total}\n`);
})

app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
})