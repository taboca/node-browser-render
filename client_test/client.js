
var request = require('request');


request.post({url:'http://165.227.28.240:8888/request', form: {"uuid":"taboca"}}, function(err,response,body){ 

  console.log('error:', err); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

})

