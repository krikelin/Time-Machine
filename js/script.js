/*
 * Copyright (C) 2011 Alexander Forselius
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function scroll(e){
	console.log((document.getElementsByClassName("sp-list")[0].scrollTop) + " " + ( document.getElementsByClassName("sp-list")[0].style.height - 16));
	if(document.getElementsByClassName("sp-list")[0].scrollTop >= document.getElementsByClassName("sp-list")[0].style.height - 16){
		
		findmore();
	}
}

function back(){
	var year = parseInt($("#time").html());
	year-=1;
	return "spotify:app:timemachine:year:"+year;
	
}
function forward(){
	console.log("back");
	var year = parseInt($("#time").html());
	year+=1;
	return "spotify:app:timemachine:year:"+year;
	
}
function find(year,append,page){
	var c = document.getElementById("time");
	c.innerHTML = year;
//	console.log("A");
	//var samyear = year2 != "underfined" ? "-"+year2 : "";
	// Get data from ws.spotify.com
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
	
		if(request.readyState == 4   && request.status == 200){
			var height = 0;
			var sp = getSpotifyApi(1);	
			var models = sp.require("sp://import/scripts/api/models");
			var views = sp.require("sp://import/scripts/api/views");
			var plst = new models.Playlist(); // Create a temporary playlist
			var tracks = request.responseXML.getElementsByTagName("track");
			for(var i=0; i < tracks.length ;i++){
				var track = tracks[i];
				var href = track.getAttribute("href");
				plst.add(href);
				console.log("Added song");
				height += 16;
			}
			//console.log("test");
		
		
			// Create the trackList
			var output = document.getElementById("cd");
			console.log(output);
			var customList  = new views.List(plst, function(track) {
				return new views.Track(track, views.Track.FIELD.STAR | views.Track.FIELD.SHARE | views.Track.FIELD.NAME | views.Track.FIELD.ARTIST | views.Track.FIELD.ALBUM);
			});
			try{
				if(!append){
					output.innerHTML="";
				}
			}catch(e){
			}
			console.log(customList);
			
			document.body.appendChild(customList.node);
			customList.node.parentNode.style.height = height;
			console.log(height);
			customList.node.onscroll = scroll;
			document.getElementsByClassName("sp-list")[0].style.height = height;
		}
	};
	request.open("GET","http://ws.spotify.com/search/1/track?q=year:"+year+"&page="+page, true);
	request.send(null);
	//+(samyear),
	//
	
}