const fs = require('fs');

export const jwt_secret = fs.readFileSync('/run/secrets/app_cert_key', 'utf-8').trim();