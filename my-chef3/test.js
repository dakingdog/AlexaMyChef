var USDAkey = "Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI";
var fruitDBN = [];
var fruitInfo = [];
// var https=require('https');
// // var optionsget={
// //   host:'api.nal.usda.gov',
// //   api_key: USDAkey,
// //   // format: 'json',
// //   port: 443,
// //   // q: 'raw apple',
// //   // max: 30,
// //   path: '/ndb/search/?format=json&sort=n&max=25&offset=0&fg=fruits+and+fruit+juices&api_key=Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI',
// //   method: 'GET'
// //   // timeout: 5000
// // };
// console.log('Making call...');
// // do the GET request
// var reqGet = https.request('https://api.nal.usda.gov/ndb/search/?format=json&sort=n&max=25&offset=0&fg=fruits+and+fruit+juices&api_key=Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI', (res) => {
//     console.log("statusCode: ", res.statusCode);
//     // uncomment it for header details
// //  console.log("headers: ", res.headers);

//     res.on('data', (d)=>{
//       const usdaFruit = JSON.parse(d);
//       console.log(usdaFruit);
//       var length=usdaFruit.list.total;
//       for (var x=0; x<length; x++){
//         fruit.push(usdaFruit.list.item[x].name);
//         console.log(fruit);
//       }
//     });

// });
// reqGet.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });
var http = require("https");
var fruit = [];
var options = {
  "method": "GET",
  "hostname": "api.nal.usda.gov",
  "port": null,
  "path": "/ndb/search/?format=json&sort=n&max=25&offset=0&q=raw&fg=fruits%20and%20fruit%20juices&api_key=Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI",
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
    // console.log(jsonObj);
    var length = jsonObj.list.end;
    for (var x = 0; x < length; x++) {
      fruit.push(jsonObj.list.item[x].name);
      fruitDBN.push(jsonObj.list.item[x].ndbno);
      console.log(fruit);
    }
  // console.log(body.toString());
  });
});
  // var options = {
  //   "method": "GET",
  //   "hostname": "api.nal.usda.gov",
  //   "port": null,
  //   "path": "/ndb/nutrients/?format=json&api_key=Q2W8cDINhmomMkw2Qv91Vq3laaACY2NB8J54WsdI&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=01009",
  //   "headers": {
  //     "cache-control": "no-cache",
  //     "postman-token": "f4a4d3f3-2966-9ef7-cf2c-11f177947d71"
  //   }
  // };
  // console.log('pulling info');
  // var req = http.request(options, function(res) {
  //   var chunks = [];
  //   res.on("data", function(chunk) {
  //     chunks.push(chunk);
  //   // fruit.push(chunk);
  //   // console.log(fruit);
  //   });

  //   res.on("end", function() {
  //     var body = Buffer.concat(chunks);
  //     var jsonObj = JSON.parse(body.toString());
  //     console.log(jsonObj);
  //     fruitInfo.push(jsonObj.report.foods[0].nutrients[0].unit+" "+jsonObj.report.foods[0].nutrients[0].value);
  //     console.log(fruitInfo[0]);
  //     // fruitInfo[x] = jsonObj;
  //   // console.log(body.toString());
  //   });
  // });
req.end();
//fruitDBN.length
// for (var x = 0; x < 5; x++){
// }