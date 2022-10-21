import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config({ path: "./config.env" });

const app = express();
console.log(process.env)
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());
console.log(process.env.MONGO_URI)
const CONNECTION_URL = "mongodb+srv://Prasanna9:Prasanna9@cpsn.mycd3.mongodb.net/apf?retryWrites=true&w=majority";

const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Connection successfull at port number: ${PORT}`)))
    .catch((error) => console.log(error.message));

//Schema

const userSchema = new mongoose.Schema({
    building: {
        type: String,
        trim: true,
    },
    floorNumber: {
        type: Number,
        default: "NA",
    },
    block: {
        type: String,
        default: 'NA',
    },
    officeNumber: {
        type: Number,
        default: "NA",
    },
    status: {
        type: String,
        default: "Unoccupied",
    },
    comName: {
        type: String,
    },
    email: {
        type: String,
        default: "NA",
        trim: true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error(`${value} is inValid`)
        //     }
        // }
    },
    phone: {
        type: String,
        default: "NA",
        trim: true,
        // validate: {             
        // validator: function(v) {       
        // return /^[0-9]{10}$/.test(v);
        // },
        // message: '{VALUE} is not a valid phone number!'
        // }         
    },
    city: {
        type: String,
        required:true,
    },
    state: {
        type: String,
        required:true,

    },
    // districts:{
    //     type:String,
    // },
    pincode: {
        type: Number,
    },
    service: {
        // type:Array,
        type: [Object],
        "default": ["NA"],
        required:true,
    }
})

const stateSchema = new mongoose.Schema({
    States: {
        type: String,
        trim: true
    },
    District: {
        type: String,
        trim: true
    }
})

const loginSchema = new mongoose.Schema({
    userName :{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
    }
})

//Model
const tableData = new mongoose.model("Table", userSchema);
const stateData = new mongoose.model("State", stateSchema);
// const loginData = new mongoose.model("Login",loginSchema);


// REACT --- MONGODB
app.post('/register', jsonParser,
    function (req, res) {

        const createDocument = async () => {
            let services = []
            eval(req.body).category.forEach(element => {
                services.push(element.service)
            });

            try {
                console.log(eval(req.body))
                const data = new tableData({
                    building: eval(req.body).building,
                    floorNumber: eval(req.body).floorNumber,
                    block: eval(req.body).block,
                    officeNumber: eval(req.body).officeNumber,
                    status: eval(req.body).status,
                    comName: eval(req.body).comName,
                    email: eval(req.body).email,
                    phone: eval(req.body).phone,
                    city: eval(req.body).city,
                    state: eval(req.body).state,
                    pincode: eval(req.body).pincode,
                    service: services
                })

                const result = await tableData.insertMany(data);
                console.log('CREATE DOCUMENT');
            }
            catch (e) {
                console.log(e);
            }

        }
        createDocument();
    })

//MONGODB ---> REACT
app.get('/getUsers', jsonParser, function (req, res) {
    const getDocument = async () => {
        try {
            const result1 = await tableData.find().sort({ "officeNumber": 1 });
            console.log('PRINT DOCUMENT');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result1));
        }
        catch (err) {
            console.log(err);
        }
    }
    const updateDocument = async () => {
        try {
            await tableData.updateMany({ block: "" }, { block: "NA" });
            await tableData.updateMany({ email: "" }, { email: "NA" });
            await tableData.updateMany({ phone: "" }, { phone: "NA" });
        }
        catch (err) {
            console.log(err);
        }
    }
    getDocument();
    updateDocument();
})

app.get('/getBuildings', jsonParser, function (req, res) {
    const getBuildings = async () => {
        try {
            const buildingName = await tableData.distinct("building");
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(buildingName));
        }
        catch (err) {
            console.log(err);
        }
    }
    getBuildings();
})

app.get('/getServices', jsonParser, function (req, res) {
    const getBuildings = async () => {
        try {
            const serviceName = await tableData.distinct("service");
            res.setHeader('Content-Type', 'application/json');
            console.log(serviceName)
            res.end(JSON.stringify(serviceName));
        }
        catch (err) {
            console.log(err);
        }
    }
    getBuildings();
})


app.get('/getBuildingsName/:building', jsonParser, function (req, res) {
    const getBuildingName = async () => {
        try {
            const name = req.params.building;
            tableData.find({}).where('building').equals(name).exec(function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('error returned');
                    res.send(500, { error: 'Failed insert' });
                }
                if (!data) {
                    res.send(403, { error: 'Authentication Failed' });
                }
                res.send(200, data);
                // console.log(data)
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    getBuildingName();
})


// Get OfficeData via buildingName and Office Number
app.get('/getOfficeData/:building/:officeNumber', jsonParser, function (req, res) {
    const getOfficeData = async () => {
        try {
            const buildingName = req.params.building;
            const officeNo = req.params.officeNumber;

            tableData.find({'building':buildingName,'officeNumber':officeNo}).exec(function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('error returned');
                    res.send(500, { error: 'Failed insert' });
                }

                if (!data) {
                    res.send(403, { error: 'Authentication Failed' });
                }
                res.send(200, data);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    getOfficeData();
})




app.get('/getServicesName/:service', jsonParser, function (req, res) {
    const getServiceName = async () => {

        try {
            const serviceName = req.params.service;
            const result1 = await tableData.find().sort({ "officeNumber": 1 });
            res.setHeader('Content-Type', 'application/json');
            const result = result1.filter(buildings => {
                let isValid = false;
                if (buildings.service.includes(serviceName)) {

                    isValid = true
                }
                return isValid;
            })
            res.end(JSON.stringify(result));
        }
        catch (err) {
            console.log(err);
        }
    }
    getServiceName();
})
if (process.env.NODE_ENV == "production") {
    app.use(express.static("./client/build"))
}


// States List ( States Scheama )
app.get('/state', jsonParser, function (req, res) {
    const getStatesData = async () => {
        try {
            const statesName = await stateData.distinct('States');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(statesName));
        }
        catch (err) {
            console.log(err);
        }
    }
    getStatesData();
})

//Districts Name
app.get('/districs', jsonParser, function (req, res) {
    const getStatesData = async () => {
        try {
            const districstName = await stateData.distinct('District');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(districstName));
        }
        catch (err) {
            console.log(err);
        }
    }
    getStatesData();
})


// Districts Name via only State Name ( States Scheama )
app.get('/getDistrictNames/:state', jsonParser, function (req, res) {
    const getDistrictName = async () => {
        const name = req.params.state;
        try{
        stateData.find({}).where('States').equals(name).exec(function (err, data) {
            if (err) {
                console.log(err);
                console.log('error returned');
                res.send(500, { error: 'Failed insert' });
            }

            if (!data) {
                res.send(403, { error: 'Authentication Failed' });
            }
            res.send(200, data);
            // console.log(data)
        });
    }
    catch (err) {
        console.log(err);
    }
}
    getDistrictName();
})


// All Data via only District Name -- > States Name
app.get('/getDistrictData/:city', jsonParser, function (req, res) {
    const getDistrictData = async () => {
        try {
            const districtName = req.params.city;
            tableData.find({}).where('city').equals(districtName).exec(function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('error returned');
                    res.send(500, { error: 'Failed insert' });
                }

                if (!data) {
                    res.send(403, { error: 'Authentication Failed' });
                }
                res.send(200, data);
                // console.log(data)
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    getDistrictData();
})



// All Data via District Name && It's Service Name  -- > /service/city

app.get('/getDistrictData1/:service/:city', jsonParser, function (req, res) {
    const getDistrictData = async () => {
        try {
            const districtName = req.params.city;
            const serviceData = req.params.service;

            tableData.find({'service':serviceData,'city':districtName}).exec(function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('error returned');
                    res.send(500, { error: 'Failed insert' });
                }

                if (!data) {
                    res.send(403, { error: 'Authentication Failed' });
                }
                res.send(200, data);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    getDistrictData();
})


