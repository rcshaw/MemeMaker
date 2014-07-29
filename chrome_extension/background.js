// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.
    var url = 'info.html#' + info.srcUrl;

    // Create a new window to the info page.
    //chrome.windows.create({ url: url, width: 520, height: 660 });
    Parse.initialize("k9fWbqwB7anOSJhUZJcIF5aDOXC5wRVQc87hGKyu", "cgwRZNr1X58BKbTv49oOhLIABJedodfAwFWHO1QY");   

	var tag = prompt("Enter a Tag for this Meme");
	if (tag === null || tag ==false)
	{
		return;
	}
	
	var Meme = Parse.Object.extend("ImageItem");
	var meme = new Meme();
 
	 //replace url with img-url
 
	meme.set("imgTag", tag);
	meme.set("imgUrl", info.srcUrl);
	meme.set("imgFolder","Home Folder");
	//the rest of the fields will be empty, 


	meme.save(null, {
  		success: function(meme) {
    	// Execute any logic that should take place after the object is saved.
   	 		//alert('New meme created with objectId: ' + meme.id);
  		},
  		error: function(meme, error) {
    	// Execute any logic that should take place if the save fails.
    	// error is a Parse.Error with an error code and description.
    		//alert('Failed to create new object, with error code: ' + error.message);
  		}
	});
	
  };
};


/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Add to MemeMaster",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});
