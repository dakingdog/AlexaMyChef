// Require your files or libraries here. You can use npm to install libraries.
var Alexa = require('clay-alexa-sdk');
var USDAkey="Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI";
var http = require("https");
var fruit = [];
var fruitDBN = [];
var fruitInfo = [];
var options = {
  "method": "GET",
  "hostname": "api.nal.usda.gov",
  "port": null,
  "path": "/ndb/search/?format=json&sort=n&max=25&offset=0&fg=fruits%20and%20fruit%20juices&api_key=Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI",
  "headers": {
    "authorization": "Bearer=eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9",
    "cache-control": "no-cache",
    "postman-token": "1a6302a9-0c45-4451-b491-f97af2b00931"
  }
};

var req = http.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  // fruit.push(chunk);
  // console.log(fruit);
  });

  res.on("end", function() {
    var body = Buffer.concat(chunks);
    var jsonObj = JSON.parse(body.toString());
    console.log(jsonObj);
    var length = jsonObj.list.end;
    for (var x = 0; x < length; x++) {
      fruit.push(jsonObj.list.item[x].name);
      fruitDBN.push(jsonObj.list.item[x].ndbno);
      console.log(fruit);
    }
  // console.log(body.toString());
  });
});

req.end();

for (var x = 0; x < fruitDBN.length; x++){

  var optionsNutrition = {
    "method": "GET",
    "hostname": "api.nal.usda.gov",
    "port": null,
    "path": "/ndb/nutrients/?format=json&api_key=Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI&nutrients=205&nutrients=204&nutrients=208&nutrients=269&" + fruitDBN[x],
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "f4a4d3f3-2966-9ef7-cf2c-11f177947d71"
    }
  };

  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    // fruit.push(chunk);
    // console.log(fruit);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      var jsonObj = JSON.parse(body.toString());
      console.log(jsonObj);
      fruitInfo.push(jsonObj.report.foods.nutrients[0].unit+" "+jsonObj.report.foods.nutrients[0].value);
      // fruitInfo[x] = jsonObj;
    // console.log(body.toString());
    });
  });
}

// Array of possible Awesome things that Alexa can respond with.
const awesomeSayings = [
  "You are a force of nature.",
  "You are an inspiration to everyone that meets you.",
  "You are my Arnold",
  "You are incredible!",
  "Bill Gates wanted to know if you have any tips for him?",
  "how are you so fucking good at what you do?",
  "Boom-shacklaka You're on Fire",
  "I marvel at your accomplishments on an hourly basis",
  "Who is the most awesome person today? You. You are.",
  "I'm obsessed with you",
  "When you code, it's like you don't write code, you paint it. It's incredible.",
  "Everything is awesome. Everything is cool when you're part of a team"
]
const meal = ["Try an apple walnut spinach salad sometime. It's a delicious, healthy meal loaded with polyunsaturated fats and plenty of vitamins.",
  "How about an omelette with chicken, onion, tomatoes, and peppers fried in olive oil?",
  "For a healthy breakfast, try having some fruit of your choice, milk, and some whole grain toast.",
  "No, Everything is a Meme."];
var breakfast = ["How about eggs fried in olive oil with french toast and a glass of low fat milk?",
  "Try a bowl of hot oatmeal with almonds, butter, and a bit of honey",
  "For a quick breakfast, fruits such as apples and bananas with trail mix is an excellent choice.",
  "Nut Butter, Banana, and Chia Seed Toast",
  "Berry and Yogurt Smoothie",
  "Savory Oatmeal With an Egg",
  "Quinoa Fruit Salad",
  "Tomato Toast With Macadamia Ricotta",
  "Quinoa and Chia Porridge, Almonds, and Sliced Peaches",
  "Avocado Toast With Egg, sprinkled with salt and pepper",
  "Everything is a meme",
  "Chocolate Quinoa Breakfast Bowl",
  "Overnight Crock-Pot Egg Casserole",
  "Warm Fruit Bowl made with cherries, raspberries, blueberries, sprinkled with dark chocolate and doused in low fat milk."];
var dessert = ["Get off your lazy ass and make yourself your own food",
  "MEMED",
  "Dairy-free Peanut Butter Chocolate Brittle Cake with almond frosting and glaze."];
exports.handler = function(event, context, callback) {

  // Write your Skill handler code here. This is where you
  // specify how your skill should respond. Make sure to write
  // a handler for each of your Intent types.
  console.log(event);

  var handlers = {
    'GetMeal': function() {
      var selectedMeal = String(this.event.request.intent.slots.meal.value);
      var randomSaying;
      if (selectedMeal === "Meal"|| selectedMeal === "meal") {
        const randomSayingIndexMeal = Math.floor(Math.random() * meal.length);
        randomSaying = meal[randomSayingIndexMeal];
      }
      if (selectedMeal === "Breakfast" || selectedMeal === "breakfast") {
        const randomSayingIndexBF = Math.floor(Math.random() * breakfast.length);
        randomSaying = breakfast[randomSayingIndexBF];
      }
      if (selectedMeal === "Lunch" || selectedMeal === "lunch") {
        const randomSayingIndexL = Math.floor(Math.random() * meal.length);
        randomSaying = meal[randomSayingIndexL];
      }
      if (selectedMeal === "Dinner" || selectedMeal === "dinner") {
        const randomSayingIndexD = Math.floor(Math.random() * meal.length);
        randomSaying = meal[randomSayingIndexD];
      }
      if (selectedMeal === "Dessert" || selectedMeal === "dessert") {
        const randomSayingIndexDT = Math.floor(Math.random() * dessert.length);
        randomSaying = dessert[randomSayingIndexDT];
      }
      // Choose a random saying from the awesomeSayings array.

      // Tell Alexa to speak that saying.
      this.emit(':tell', randomSaying);
    },
    // Intent: GetAwesomeSaying returns a random saying from the
    // array of possible sayings awesomeSayings
    'GetFruit': function() {

      // Choose a random saying from the awesomeSayings array.
      const randomSayingIndex = Math.floor(Math.random() * fruit.length);
      const randomSaying = fruit[randomSayingIndex]+" "+fruitInfo[randomSayingIndex];

      // Choose a random saying from the awesomeSayings array.
      // const randomSayingIndex2 = Math.floor(Math.random() * fruitInfo.length);
      // const randomSaying = fruit[randomSayingIndex].nutrients.value;

      // Tell Alexa to speak that saying.
      this.emit(':tell', randomSaying);
    },

    // Intent: GetAwesomeSaying returns a random saying from the
    // array of possible sayings awesomeSayings
    'GetAwesomeNumber': function() {
      // Choose a random number between 1-100
      const randomNumber = Math.floor(Math.random() * 100);

      // Tell Alexa to speak that number
      this.emit(':tell', "The best number is " + randomNumber);
    },

    // Intent: Launch. This is how Awesome Bot responds when there
    // aren't important. Important to have a Launch Intent to make sure
    // your skill passes Publishing Certification proces.
    'LaunchRequest': function() {
      this.emit(':tell', "Hello. I'm Awesome Bot. You are awesome! Anytime you need a little boost just say Alexa ask awesome bot for an awesome saying!");
    },
    // Intent: Unhandled. The Unhandled intent is how Alexa responds when someone
    // asks for something that we don't handle explicitly
    'Unhandled': function() {
      this.emit(':tell', "I'm not sure what you're asking for");
    }
  };

  // The event.body is the request object that has come in via HTTPS.
  // We need to JSON parse the body which holds the object since it's
  // been sent over HTTP. That object has information about what intent was passed.
  // You can see a sample of what the event body looks like in test-data.json
  var alexa = Alexa.handler(JSON.parse(event.body), context);


  // The register handler function sets up the handlers you specified above,
  // and then alexa.execute() calls the appropriate handler based on the Intent
  // passed in the Alexa request object (which here is in the event.body)
  alexa.registerHandlers(handlers);
  alexa.execute();

}
