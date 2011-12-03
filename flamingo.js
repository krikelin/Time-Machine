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
var sp = getSpotifyApi(1);	
var models = sp.require("sp://import/scripts/api/models");
var views = sp.require("sp://import/scripts/api/views");
exports.init = init;
var cur_page =1;

function init(){
	var sp = getSpotifyApi(1);	
	
	//var list = new List(new Playlist("spotify:album:4St6b2FQD128IfMBExb1uS");
	
		var tabs = sp.core.getArguments();
	
	var year = new Date().getFullYear();
	if(tabs.length > 1){
		year=parseInt(tabs[1]);
	}
	find(year, false, cur_page);
	sp.core.addEventListener("argumentsChanged", function(){
		var tabs = sp.core.getArguments();
		var year = new Date().getFullYear();
		if(tabs.length > 1){
			year=parseInt(tabs[1]);
		}
		find(year, false, cur_page);
	});
	
	
	
}

function findmore(){
	cur_page++;
	find(parseInt($("#display").html()), true, cur_page);
}
/*
function find(year){
	
	var link = new models.Link("spotify:album:4St6b2FQD128IfMBExb1uS")
	var customList  = new views.List(models.Playlist.fromURI("spotify:search:year:2002"), function(track) {
		return new views.Track(track, views.Track.FIELD.STAR | views.Track.FIELD.SHARE | views.Track.FIELD.NAME | views.Track.FIELD.ARTIST | views.Track.FIELD.ALBUM);
	});
	document.body.appendChild(customList.node);
}*/