import buffer, { Buffer } from 'buffer';

class AuthService {
  login(creds, cb) {
    let b = new Buffer(creds.username + ':' + creds.password);
    let encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw {
        badCredentials: response.status == '401',
        unknownError: response.status != '401'
      }
    })
    .then(response => response.json())
    .then(results => cb({success: true}))
    .catch(err => cb(err));
  }
}

module.exports = new AuthService();