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
    
    sub.addEventListener('click', function() {    
        checkSubmit(event);
        show_image(text, 110,110,'Meme');
    });
    
});

function checkSubmit(e) {
    
    if(e && e.keyCode == 13) {
        document.forms[0].submit();
    }
}

var totalResults = 0;
var tagCounter = 0;
var titCounter = 0;

function show_image(src, width, height, alt) {
    Parse.initialize("k9fWbqwB7anOSJhUZJcIF5aDOXC5wRVQc87hGKyu", "cgwRZNr1X58BKbTv49oOhLIABJedodfAwFWHO1QY");   
    //var tagCounter = 0;
    var Image = Parse.Object.extend("ImageItem");
    var query = new Parse.Query(Image);
    var search = document.getElementById('search').value
    query.contains("imgTag", search);

    query.find({
    success: function(results) {
    
    // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) { 
            tagCounter = tagCounter+1;
            var object = results[i];
            var img = document.createElement("img");
            img.src = object.get('imgUrl');
            img.width = width;
            img.height = height;
            img.alt = alt;
            img.style.cssText = 'padding:8px'
            // This next line will just add it to the <body> tag
            document.body.appendChild(img);
        }
    },
        
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
        }
    });
    
    var query = new Parse.Query(Image);
    var search = document.getElementById('search').value
    query.contains("imgTitle", search);
    query.find({
        success: function(titleResults) {

    // Do something with the returned Parse.Object values
            for (var i = 0; i < titleResults.length; i++) { 
                var object = titleResults[i];
                var img = document.createElement("img");
                img.src = object.get('imgUrl');
                img.width = width;
                img.height = height;
                img.alt = alt;
                titCounter = titCounter + 1;
                img.style.cssText = 'padding:8px'
                // This next line will just add it to the <body> tag
                document.body.appendChild(img);
            }
    
            var drag = document.getElementById('drag');
            totalResults = tagCounter + titCounter;
            console.log(totalResults);
            console.log(tagCounter);
            console.log(titCounter);
            
            if (totalResults === 0) {
                document.getElementById("text-holder").style.display="inline";
                drag.style.display="none";
                totalResults = 0;
            }
            
            else {
                document.getElementById("text-holder").style.display="none";
                drag.style.display="inline";
                totalResults = 0;
                titCounter = 0;
                tagCounter = 0;
            }
    
        },
        
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
    

    
}