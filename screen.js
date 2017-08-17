//https://github.com/FWeinb/electron-screenshot-service
var fs = require('fs');
var screenshot = require('electron-screenshot-service');

//url : 'http://www.slidequest.com/slides/Taboca/no8v4#agxzfnRlbGFzbGlkZXNyEQsSBFBvc3QYgICAoJT0iQkM',
screenshot({
  url : process.argv[2],
  width : 1024,
  delay : 5000, 
  height : 768
})
.then(function(img){

    //fs.writeFile('./out.png', img.data, function(err){
    fs.writeFile(process.argv[3], img.data, function(err){
      screenshot.close();
    });
});

