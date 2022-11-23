const https = require('https');

const getJoke = (req, res)=>{
    const request = https.request("https://v2.jokeapi.dev/joke/Pun,Spooky,Christmas", (response)=>{
        let data = ''
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
        response.on('end', () => {
            const body = JSON.parse(data);
            (body.type=='twopart') ? res.send({ setup: body.setup, delivery: body.delivery }) : res.send({ joke: body.joke })
        });
    })
    request.on('error', (error) => {
        console.log('An error', error);
        res.send(error)
    });
    request.end() 
    // res.send('Tst')
}

module.exports = {
    getJoke
}