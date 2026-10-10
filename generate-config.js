const fs = require('fs');
const config = {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000'
};
const content = "const CONFIG = " + JSON.stringify(config, null, 4) + ";\n";
fs.writeFileSync('config.js', content, 'utf8');
console.log('Generated config.js with API_BASE_URL:', config.API_BASE_URL);
