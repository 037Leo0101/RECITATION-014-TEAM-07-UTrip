// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.
const path = require('path');
const window = require('window')

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// database configuration
const dbConfig = {
    host: 'db', // the database server
    port: 5432, // the database port
    database: process.env.POSTGRES_DB, // the database name
    user: process.env.POSTGRES_USER, // the user account to connect with
    password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
    .then(obj => {
        console.log('Database connection successful'); // you can view this message in the docker compose logs
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.
//app.use(cookieParser());
app.set('views', path.join(__dirname, "/src/views"))
    // initialize session variables
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
    })
);

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, 'public')));

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here

app.get('/welcome', (req, res) => {
    res.json({ status: 'success', message: 'Welcome!' });
});

app.get('/', (req, res) => {
    res.redirect('/login'); //this will call the /login route in the API
});

// Route: /register
// Method: GET
app.get('/register', (req, res) => {
    res.render('pages/register');
});

// Route: /register
// Method: POST
app.post('/register', async(req, res) => {
    try {
        // Hash the password using bcrypt library
        const hash = await bcrypt.hash(req.body.password, 10);

        // Insert username and hashed password into 'users' table
        await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, hash]);

        // Redirect to the login page after data has been inserted successfully
        res.render('pages/login', {
            message: 'Registered Successfully. Please log in. '
        });
    } catch (error) {
        console.error(error);

        // Redirect to the registration page if the insert fails
        res.status(400).render('pages/register', {
            error: true,
            message: 'Something went wrong. Please try again'
        });
    }
});

// Route: /login
// Method: GET
app.get('/login', function(req, res) {
    res.render('pages/login');
});

// Route: /login
// Method: POST
app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    db.one(`SELECT * FROM users WHERE username= '${username}' LIMIT 1;`)
        .then(async user => {
            // Use bcrypt.compare to encrypt the password entered from the user and compare if the entered password is the same as the registered one.
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                // If the password is incorrect, throw an error stating "Incorrect username or password."
                // console.log('Incorrect username or password.')
                // return res.redirect('/login');
                return res.status(400).render('pages/login', {
                    error: true,
                    message: 'Incorrect username or password.'
                });
            }
            // Save the user in the session variable.
            req.session.user = user;
            req.session.save();
            // If the user is found, redirect to /discover route after setting the session.
            return res.redirect('/home');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).render('pages/register', {
                error: true,
                message: 'Account not found. Please register first!'
            });
        });
});

// Authentication Middleware.
const auth = (req, res, next) => {
    if (!req.session.user) {
        // Default to login page.
        return res.redirect('/login');
    }
    next();
};

// Authentication Required
app.use(auth);

// Route: /home
// Method: GET
app.get('/home', async(req, res) => {
    res.render('pages/home');
});

// Route: /trips
// Method: GET
app.get('/trips', (req, res) => {
    const hotelRequest = "SELECT * FROM hotels WHERE username = '" + req.session.user.username + "'";
    
    db.any(hotelRequest).then(async hotelList => {
        
        const hotels = hotelList.map(hotel => ({
            hotelName: hotel.hotelname,
            hotelURL: 'Link: ' + hotel.hotelurl,
            hotelUser: hotel.username,
            hotelCity: hotel.hotelcity
        }));
        console.log('/trips hotellist', hotelList);

        res.render('pages/trips', {
            hotels
        });
    }).catch(error => {
        console.log(error);
        res.render('pages/trips', {
            hotels: []
        });
    });
});

// Route: /trips
// Method: POST
app.post('/trips', async(req, res) => {
    console.log('hotelCity:', req.body.hotelCity); // add this line
    await db.query('INSERT INTO hotels (hotelName, hotelURL, username, hotelCity) SELECT $1, $2, $3, $4 FROM (SELECT 1) AS tempHotels WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE hotelName = $1);', [req.body.hotelName, req.body.hotelURL, req.session.user.username, req.body.hotelCity]);
    const hotelRequest = "SELECT * FROM hotels WHERE username = '" + req.session.user.username + "'";
    console.log('hotelRequest: ' + hotelRequest);
    db.any(hotelRequest).then(async hotelList => {
        const hotels = hotelList.map(hotel => ({
            hotelName: hotel.hotelname,
            hotelURL: 'Link: ' + hotel.hotelurl,
            username: hotel.username,
            hotelCity: hotel.hotelcity
        }));
        console.log(hotels)
        res.render('pages/trips', {
            hotels
        });
    }).catch(error => {
        console.log(error);
        res.render('pages/trips', {
            hotels: []
        });
    });
});

// Route: /logout
// Method: GET
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("pages/logout");
});


// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
module.exports = app.listen(3000)
console.log('Server is listening on port 3000');