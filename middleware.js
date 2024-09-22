const path = require('path');
const VALID_KEYS_PATH = path.join(__dirname, '/valid-keys.txt');
const fs = require('fs');
module.exports = function (req, res, next) {
    const key = req.headers['x-api-key'];

    if(!key){
        return res.status(401).json({ message: 'API key is required' });
    }
    else{
        fs.readFile(VALID_KEYS_PATH,'utf8', (err, data) => {
            if(err){
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const validKeys = data.split('\n').map(c => c.trim());
            if(!validKeys.includes(key)){
                return res.status(401).json({ message: 'Invalid API key' });
            }
            next();
        })
    }
};
