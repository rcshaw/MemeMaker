// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.





function funcSearch() {

	  document.getElementById("text-holder").innerHTML= document.getElementById('search').value;
 
}

document.addEventListener('DOMContentLoaded', function() {
$("#search").keyup(function(event){
    if(event.keyCode == 13){
        $("#sub").click();
    }
});
    var sub = document.getElementById('sub');
    var text = document.getElementById('search').value;
    // onClick's logic below:
   /* sub.addEventListener('click', function() {
        funcSearch();
    }); */
    
    sub.addEventListener('click', function() {
    	checkSubmit(event);
        show_image(text, 110,110,'Meme');
    });
    
});




function checkSubmit(e)
{
   if(e && e.keyCode == 13)
   {
      document.forms[0].submit();
   }
}

function show_image(src, width, height, alt) {
/*
    var img = document.createElement("img");
    img.src = document.getElementById('search').value;
    img.width = width;
    img.height = height;
    img.alt = alt;
    
    img.style.cssText = 'padding:10px'
    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
    */
    
        Parse.initialize("k9fWbqwB7anOSJhUZJcIF5aDOXC5wRVQc87hGKyu", "cgwRZNr1X58BKbTv49oOhLIABJedodfAwFWHO1QY");   
    
    var Image = Parse.Object.extend("ImageItem");
	var query = new Parse.Query(Image);
	var search = document.getElementById('search').value
	query.contains("imgTag", search);

	query.find({
  	success: function(results) {
    //alert("Successfully retrieved " + results.length + " scores.");
    
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      //alert(object.id + ' - ' + object.get('tag'));
      var img = document.createElement("img");
    img.src = object.get('imgUrl');
    img.width = width;
    img.height = height;
    img.alt = alt;
    
    img.style.cssText = 'padding:8px'
    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
    }
    

    var drag = document.getElementById('drag');
    
    if (results.length ==0)
    {
    	document.getElementById("text-holder").style.display="inline";
    	document.getElementById("text-holder").innerHTML= "no results found for " +search;
    	drag.style.display="none";
    	
    }
    else{
    	document.getElementById("text-holder").style.display="none";
    	drag.style.display="inline";
    }
    
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});


    
}
