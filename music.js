var api_key = "6cc427604c83a4a7c48455e2c30d8eab";

var requestArtistInformation = new XMLHttpRequest();
var requestArtistTopAlbums = new XMLHttpRequest();
var requestArtistEvents = new XMLHttpRequest();

function sendRequest () {
    var artist = document.getElementById("form-input").value;

    //get artist information	
    var methodGetInfo = "artist.getinfo";
    requestArtistInformation.onreadystatechange = function(){
     if (requestArtistInformation.readyState == 4) {
        var artistInfo = JSON.parse(requestArtistInformation.responseText);
            document.getElementById("artistInformation").innerHTML=
            "<p><h1>"+artistInfo.artist.name+ "</h1></p>"+
            "<img src="+artistInfo.artist.image[3]["#text"]+">" +
            "<p>"+artistInfo.artist.stats.playcount+ " plays" + "</p>" +
            "<p>"+artistInfo.artist.stats.listeners+ " listeners" + "</p>" +
            "<p>"+"Year Formed:"+artistInfo.artist.bio.yearformed+"</p>" +
            "<p>"+"Place Formed:"+artistInfo.artist.bio.placeformed+"</p>"+
            "<p>"+artistInfo.artist.bio.summary+ "</p>";
       }
    };    
    requestArtistInformation.open("GET","proxy.php?method="+methodGetInfo+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    requestArtistInformation.withCredentials = "true";
    requestArtistInformation.send(null);

    //get top albums
    var methodGetTopAlbums = "artist.getTopAlbums";
    requestArtistTopAlbums.onreadystatechange = function(){
    if (requestArtistTopAlbums.readyState == 4) {
		
	 document.getElementById("artistTopAlbums").innerHTML = "";
        var artistTopAlbums = JSON.parse(requestArtistTopAlbums.responseText);
		if(artistTopAlbums.topalbums.album.length>0){
        	var topAlbums = "<table><caption><b>Top Albums</b></caption>";
        	topAlbums+="<th>Album</th><th>Play Count</th><th>Cover</th><th>Rank</th>"
        	var i;
        	for (i=0;i<artistTopAlbums.topalbums.album.length;i++){
        	topAlbums+= "<tr><td>"+
       		artistTopAlbums.topalbums.album[i].name+
        	"</td><td>"+
        	artistTopAlbums.topalbums.album[i].playcount+
        	"</td><td>"+
        	"<img src="+artistTopAlbums.topalbums.album[i].image[1]["#text"]+">"+
        	"</td><td>"+
        	artistTopAlbums.topalbums.album[i]["@attr"].rank+
        	"</td></tr>";
       		}
        	topAlbums += "</table>"
        	document.getElementById("artistTopAlbums").innerHTML = topAlbums;
	}
      }
    };    
    requestArtistTopAlbums.open("GET","proxy.php?method="+methodGetTopAlbums+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    requestArtistTopAlbums.withCredentials = "true";
    requestArtistTopAlbums.send(null);

    //get upcoming events
    var methodGetEvents = "artist.getEvents";
    requestArtistEvents.onreadystatechange = function(){
    if (requestArtistEvents.readyState == 4) {
        document.getElementById("artistEvents").innerHTML = "";
	var artistEvents = JSON.parse(requestArtistEvents.responseText);
        if(artistEvents.events.event.length>0){
        	var events = "<table><caption><b>Upcoming Events</b></caption>";
        	events+="<th>Title</th><th>Venue</th><th>Location</th><th>Start Date</th><th>Attendance</th>"
        	var j;
        	for(j=0;j<artistEvents.events.event.length;j++){
        	events+= "<tr><td>"+
        	artistEvents.events.event[j].title+
        	"</td><td>"+
        	artistEvents.events.event[j].venue.name+
		"</td><td>"+
        	"<img src="+artistEvents.events.event[j].venue.image[1]["#text"]+">"+
        	"</td><td>"+
        	artistEvents.events.event[j].startDate+
        	"</td><td>"+
        	artistEvents.events.event[j].attendance+
        	"</td></tr>";
        	}
        	events += "</table>"
        	document.getElementById("artistEvents").innerHTML = events;
          }
	}
    };
    requestArtistEvents.open("GET","proxy.php?method="+methodGetEvents+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    requestArtistEvents.withCredentials = "true";
    requestArtistEvents.send(null);
}


