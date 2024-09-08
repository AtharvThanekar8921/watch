const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Add this to parse JSON bodies



// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://localhost:27017/nirmiti', {
    
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define the schema without specifying the collection name
const userSchema = new mongoose.Schema({
    username: String,
    phone: String,
    password: String

});
// Define the schema for vehicles
const vehicleSchema = new mongoose.Schema({
    vehicleName: String
});

// Create the Vehicle model
const Vehicle = mongoose.model("Vehicle", vehicleSchema, 'vehicles');


// Create the model and explicitly specify the collection name
const Admin = mongoose.model("Admin", userSchema, 'admins'); // Explicitly set 'admins' as the collection name
const Supervisor = mongoose.model("Supervisor",userSchema,'supervisors');

// Define the schema for daily reports
const dailyReportSchema = new mongoose.Schema({
    vehicleName: String,
    date: String,
    startread: Number,
    stopread: Number,
    km: Number,
    Drequired: Number,
    Dread: Number,
    avg: Number,
    operator: String,
    rail: Number,
    slipper: Number,
    load: String,
    unload: String,
    purpose: String
});

// Create the DailyReport model
const DailyReport = mongoose.model("DailyReport", dailyReportSchema, 'dailyreport');



// Route to handle form submission
app.post('/api/registerAdmin', (req, res) => {
    const { username, phone, password } = req.body;
    const newUser = new Admin({
        username,
        phone,
        password
    });
    newUser.save()
        .then(() => {
            res.redirect('/adminregistration.html');
            // res.send('User registered successfully!');     
        })
        .catch((err) => {
            res.status(500).send('Error registering user: ' + err.message);
        });
});

app.post('/api/validateAdmin',(req,res)=>{
    const{name,password}=req.body;

    Admin.findOne({username:name,password:password})
    .then((user)=>{
        if(user){
            //res.send("Record Found Welcome Admin "+user.username);
            res.redirect('/adminMenu.html');
        }
        else{
            res.send("Record Not Found , You are not Admin");
        }
    })
    .catch((err)=>{
        res.status(500).send("error validating user: "+err.message);
    });
});

app.post('/api/registerSupervisor',(req,res)=>{
    const{username,phone,password}=req.body;
    const newSupervisor=new Supervisor({
        username,
        phone,password
    });
    newSupervisor.save()
        .then(()=>{
            res.redirect('/supervisorRegistration.html');
        })
        .catch((err) => {
            res.status(500).send('Error registering user: ' + err.message);
        });

});

app.post('/api/validateSupervisor',(req,res)=>{
    const{name,password}=req.body;
    Supervisor.findOne({username:name,password:password})
    .then((user)=>{
        if(user){
            res.redirect('/company.html');

           // res.send("Record Found Welcome Supervisor "+user.username);
        }
        else{
            res.send("Record Not Found , You are not Admin");
        }
    })
    .catch((err)=>{
        res.status(500).send("error validating user: "+err.message+"hatt");
    });
});

app.post('/api/AddVehicles', (req, res) => {
    const { vehicleName } = req.body; // Ensure the field name matches what you're sending from the client-side

    const newVehicle = new Vehicle({
        vehicleName
    });

    newVehicle.save()
        .then(() => {
            res.send('Vehicle registered successfully!');
        })
        .catch((err) => {
            res.status(500).send('Error registering vehicle: ' + err.message);
        });
});

// Route to get vehicle names from the database
app.get('/api/vehicles', (req, res) => {
    Vehicle.find({}, 'vehicleName') // Fetch only the vehicleName field
        .then((vehicles) => {
            res.json(vehicles); // Send the array of vehicle objects as JSON
        })
        .catch((err) => {
            res.status(500).send('Error fetching vehicles: ' + err.message);
        });
});

//adding dailyReport in database
app.post('/api/addDailyReport', (req, res) => {
    const { vehicleName, date, startread, stopread, km, Drequired, Dread, avg, operator, rail, slipper, load, unload, purpose } = req.body;

    const newDailyReport = new DailyReport({
        vehicleName,
        date,
        startread,
        stopread,
        km,
        Drequired,
        Dread,
        avg,
        operator,
        rail,
        slipper,
        load,
        unload,
        purpose
    });

    newDailyReport.save()
        .then(() => {
            res.send('Daily report added successfully!');
        })
        .catch((err) => {
            res.status(500).send('Error adding daily report: ' + err.message);
        });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
