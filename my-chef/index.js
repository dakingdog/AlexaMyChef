// Require your files or libraries here. You can use npm to install libraries.
let fruit = [];

var Alexa = require('clay-alexa-sdk');
var USDAkey="Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI";
var https=require('https');
var optionsget={
  host:'api.nal.usda.gov',
  api_key: USDAkey,
  format: 'json',
  port: 443,
  fg: 'fruit and fruit juices',
  max: 30,
  path: '/ndb/search/',
  method: 'GET'
};

// do the GET request
var reqGet = https.request(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);

    res.on('data', function(d) {
      const usdaFruit = JSON.parse(d);
      var length=usdaFruit.list.total;
      for (var x=0; x<length; x++){
        fruit[x] = usdaFruit.list.item[x].name;
      }
    });

});

// TODO: Populate arrays with possible meal suggestions. Make sure they're healthy and nutritious!
let meal = ["Try an apple walnut spinach salad sometime. It's a delicious, healthy meal loaded with polyunsaturated fats and plenty of vitamins.",
  "How about an omelette with chicken, onion, tomatoes, and peppers fried in olive oil?",
  "For a healthy breakfast, try having some fruit of your choice, milk, and some whole grain toast."];
let breakfast = ["How about eggs fried in olive oil with french toast and a glass of low fat milk?",
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
let lunch = [];
let dinner = [];
let entree = [];
let side = [];
let vegent = [];
let vegside = [];

let dessert = [];

exports.handler = function(event, context, callback) {

  // Write your Skill handler code here. This is where you
  // specify how your skill should respond. Make sure to write
  // a handler for each of your Intent types.
  console.log(event);

  var handlers = {

    // Intent: GetAwesomeSaying returns a random saying from the
    // array of possible sayings awesomeSayings
    'GetAwesomeSaying': function() {

      // Choose a random saying from the awesomeSayings array.
      const randomSayingIndex = Math.floor(Math.random() * awesomeSayings.length);
      const randomSaying = awesomeSayings[randomSayingIndex];

      // Tell Alexa to speak that saying.
      this.emit(':tell', randomSaying);
    },
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

      // Choose a random saying from the awesomeSayings array.

      // Tell Alexa to speak that saying.
      this.emit(':tell', randomSaying);
    },
    'GetFruit': function() {

      // Choose a random saying from the awesomeSayings array.
      const randomSayingIndex = Math.floor(Math.random() * fruit.length);
      const randomSaying = fruit[randomSayingIndex];

      // Tell Alexa to speak that saying.
      this.emit(':tell', randomSaying);
    },

    // Intent: GetAwesomeSaying returns a random saying from the
    // array of possible sayings awesomeSayings
    // 'GetAwesomeNumber': function(){
    //   // Choose a random number between 1-100
    //   const randomNumber = Math.floor(Math.random() * 100);

    //   // Tell Alexa to speak that number
    //   this.emit(':tell', "The best number is " + randomNumber);
    // },

    // Intent: Launch. This is how Awesome Bot responds when there
    // aren't important. Important to have a Launch Intent to make sure
    // your skill passes Publishing Certification proces.
    'LaunchRequest': function() {
      this.emit(':tell', "Hello. I'm your personal chef. Whenever you're feeling hungry, feel free to ask me to suggest something to eat!");
    },
    // Intent: Unhandled. The Unhandled intent is how Alexa responds when someone
    // asks for something that we don't handle explicitly
    'Unhandled': function() {
      this.emit(':tell', "I'm not sure what you're asking for. Try asking me to suggest a meal.");
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
