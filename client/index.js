const client = require("./client");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    client.getAllMenu(null,(err,data)=>{
        if(!err){
            res.render("menu",{
                results: data.menu
            });
        }
    });
});

var amqp = require('amqplib/callback_api');

const mappingRountingKey = {
    "Tomyam Gung": "food.meat.soup.spicy.veg",
    "Somtam": "food.spicy.veg",
    "Pad-Thai": "food.fry.meat.noodle.veg",
    "Kai-Jiew": "food.egg.fry.meat",
    "Kraprao": "food.fry.meat.spicy",
    "Fried rice": "food.fry.rice",
    "Sukiyaki": "food.meat.soup.veg",
    "Fried egg": "food.egg.fry",
    "Fried chicken": "food.fry.meat"
};

app.post("/placeorder", (req, res) => {
    var orderItem = {
		id: req.body.id,
		name: req.body.name,
		quantity: req.body.quantity,
	};

    // Send the order msg to RabbitMQ 
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            var exchange = 'order_queuee';
            var key = mappingRountingKey[orderItem.name];
            var msg = JSON.stringify(orderItem);

            channel.assertExchange(exchange, 'topic', {
                durable: false
            });
            channel.publish(exchange, key, Buffer.from(msg));
            console.log(" [x] Sent '%s' in '%s'", orderItem, mappingRountingKey[orderItem.name]);
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server running at port %d",PORT);
});
