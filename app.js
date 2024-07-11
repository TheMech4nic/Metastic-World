const express = require('express');
const bodyParser = require('body-parser');
const auth = require('basic-auth');

const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Middleware for basic authentication
const authenticate = (req, res, next) => {
    const user = auth(req);
    if (user && user.name === 'testuser' && user.pass === 'testpassword') {
        next();
    } else {
        res.status(401).send('Authentication required.');
    }
};

const chkReservationStatus = (status) => {
    switch (status) {
        case 'Reserved':
            return 'Reservation is confirmed.'
        case 'Waitlisted':
            return 'Reservation is waitlisted.';
        case 'Cancelled':
            return 'Reservation is cancelled.';
        case 'No-show':
            return 'Guest did not show up.';
        case 'In-house':
            return 'Guest is currently in-house.';
        case 'Checked-Out':
            return 'Guest has checked out.';
        case 'Redacted':
            return 'Reservation information is redacted.';
        default:
            return 'Unknown reservation status.';
    }
}

// Endpoint to receive reservation notifications
app.post('/api/reservation', authenticate, (req, res) => {
    const reservationData = req.body;
   // Handle different reservation statuses
    const status = chkReservationStatus(reservationData.ResStatus);
    // Process reservation data...

    // Respond with success
    res.status(200).send({ status: 'Success', reservationStatus : status });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
