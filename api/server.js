var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({

    host: 'localhost',
    port: '3306',
    user: 'cs470_amay',
    password: 'ma7077',
    database: 'test'
    
});

var PORT = 8142;

var server = app.listen(PORT, function() {
    var host = server.address().address;
    var host = server.address().port;
});

con.connect(function(error) {
    if(error) console.log(error);
    else console.log("Connected, listening on Port:", PORT);
});

app.get('/accounts', function(req, res){
    con.query('select * from Account', function(error, rows, fields){
	if(error) console.log(error);
	else {
	    res.send(rows);
	}
    });
});

app.post('/login', function(req, res){
    var id = req.body.username;
    var query = 'select * from Account where username = ' + '\'' + id + '\'';
    console.log(query);
    con.query(query, function(error, rows, fields){
	if(error) console.log(error);
	else {
	    res.send(rows);
	}
    });
});

app.post('/accprofiles', function(req, res){
    var id = req.body.a_id;
    var query = 'select * from Profile where acc_id = ' + id;
    console.log(query);
    con.query(query, function(error, rows, fields){
        if(error) console.log(error);
        else {
            res.send(rows);
	}
    });
});

app.post('/createaccount', function(req, res){
    // insert into Account (username, email, password, address, city, zip, state) values ('amay', 'mayad@sonoma.edu', 'password', '1801 East Cotati Ave', 'rp', 94928, 'California');
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var zip = req.body.zip;
    var state = req.body.state;
    var values = '\'' + username + '\', ' + '\'' + email + '\', ' + '\'' + password + '\', ' + '\'' + address + '\', ' + '\'' + city + '\', ' + zip + ', \'' + state + '\'';
    var query = 'insert into Account (username, email, password, address, city, zip, state) values (' + values + ')';
    console.log(query);
    con.query(query, function(error, rows, fields){
	if(error) console.log(error);
        else {
            res.send(rows);
        }
    });
});

app.post('/createprofile', function(req, res){
    // insert into Account (username, email, password, address, city, zip, state) values ('amay', 'mayad@sonoma.edu', 'password', '1801 East Cotati Ave', 'rp', 94928, 'California')\
    var a_id = req.body.a_id;
    var name = req.body.name;
    var bio = req.body.bio;
    var phone = req.body.phone;

    var values =  a_id + ', \'' + name + '\', \'' + bio + '\', \'' + phone + '\'';
    var query = 'insert into Profile (acc_id, name, bio, phoneNum) values (' + values +  ')';
    
    // insert into Profile (acc_id, name, bio, phoneNum) values (1, "Spencer", "i am spencer", "7073728319");

    console.log(query);
    con.query(query, function(error, rows, fields){
        if(error) console.log(error);
        else {
            res.send(rows);
        }
    });
});

app.post('/createrequest', function(req, res){

    // insert into request  (requestID, p_ID, Reoccurring, TimeValid, Destination, CurrentLocation, Days, RequestAccepted)
    /*
p_id: this.p_id,
                startdate: this.state.startdate,
                enddate: this.state.enddate,
                recurring: this.state.recurring,
                days: days,
                accepted: false,
                pickup: this.state.pickup,
                destination: this.state.destination

req_id INT AUTO_INCREMENT PRIMARY KEY,
p_id INT NOT NULL,
Recur BIT DEFAULT 0,
starttime DATETIME NOT NULL,
endtime DATETIME,
dest varchar(30) NOT NULL,
pickup varchar(30) NOT NULL,
days varchar(7) NOT NULL,
Accepted BIT DEFAULT 0,
*/
    
    var p_id = req.body.p_id;
    var recurring = req.body.recurring ? 1 : 0;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    var pickup = req.body.pickup;
    var destination = req.body.destination;
    var days = req.body.days;

    var values = p_id + ', ' + recurring + ', \'' + startdate + '\', \'' + enddate + '\', \'' + pickup + '\', \'' + destination + '\', \'' + days + '\'';
    var query = 'insert into Requests (p_id, Recur, starttime, endtime, pickup, dest, days) values (' + values + ')';

    console.log(query);
    con.query(query, function(error, rows, fields){
        if(error) console.log(error);
	else {
            res.send(rows);
        }
    });
    
});

app.get('/getallrequests', function(req, res){

    var query = 'select * from Requests';

    console.log(query);
    con.query(query, function(error, rows, fields){
        if(error) console.log(error);
        else {
            res.send(rows);
        }
    });

});
