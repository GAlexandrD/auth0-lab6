const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { auth, requiresAuth } = require('express-openid-connect');
const port = 3000;


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'or8BbT0-OCwzr2Ex5bzBIQdD6xLRgIGS6e_ZJ2Yod1n6hK36lmhAAEOs3mbS73Zs',
    baseURL: 'http://localhost:3000',
    clientID: '8CoknfjzvinP7oDjInQCKSayrtfyBrss',
    issuerBaseURL: 'https://dev-q5lvxar6msc8ug4f.us.auth0.com'
  };

const app = express();
app.use(auth(config))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', requiresAuth(), (req, res) => {
    return res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/get-user', requiresAuth(), (req, res) => {
    return res.json({
        username: req.oidc.user.nickname,
        logout: 'http://localhost:3000/logout'
    })
})

app.get('/logout', requiresAuth(), async (req, res) => {
    req.logout(); 
    res.redirect('/'); 
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
