import express from 'express';
import cors from 'cors';

const app = express()
const port = 3000


app.use(cors())

app.use(express.urlencoded({ extended: false}))

app.post('/upload', function(req, res){

    const params = new URLSearchParams({
        secret:'6LfmjFsqAAAAAAIZ20we1fTT9NKhu0CqUZ0mHM10',
        response:req.body['g-recaptcha-response'],
        remoteip:req.ip
    });

    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body:params
    })
    .then(res => res.json())
    .then(data => {
        if(data.succes){
            res.json({ captchaSucces: true })
        } else {
            res.json({ captchaSucces: false })
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

