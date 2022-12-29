//jshint esverstion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000,() => {
    console.log("Server is running on port 3000");
})

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"/signup.html"));
})

app.post("/",(req,res) => {
  const FirstName = req.body.fName;
  const LastName = req.body.lName;
  const email = req.body.email;

//   console.log(FirstName,LastName,email);
const data = {
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields: {
                FNAME : FirstName,
                LNAME : LastName
            }
        }
    ]
}

const jsondata = JSON.stringify(data);

const url = `https://us21.api.mailchimp.com/3.0/lists/346d5c6d5f`;
const options = {
    method: "POST",
    auth : "rohit1:4776568661dffc5d00f3250abc5f9742-us21"
}

const request =  https.request(url,options,(response) => {

    if(response.statusCode === 200){
        res.sendFile(path.join(__dirname,"success.html"));
    }else{
        res.sendFile(path.join(__dirname,"failure.html"));
    }

response.on("data",(data) => {
    console.log(JSON.parse(data));
})
})

request.write(jsondata);
request.end();

})

// Api key
// 4776568661dffc5d00f3250abc5f9742-us21

// list id 
// 346d5c6d5f

app.post("/failure",(req,res) => {
    res.redirect("/");
})

app.post("/success",(req,res) => {
    res.redirect("/");
})