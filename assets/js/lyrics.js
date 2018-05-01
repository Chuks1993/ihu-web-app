function getLyrics(){

var artistSearch = document.getElementById("artistSearch").value;
document.getElementById("lyrics").textContent = "";
  $.ajax({
    type: "GET",
    data: {
        apikey:"445d6196c08dc2b7490929f18149d684",
        q_artist: artistSearch,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data); 
        console.log(data.message.body.track_list[0].track.album_coverart_350x350)
        console.log(data.message.body.track_list[0].track.lyrics_id)
        var rand = data.message.body.track_list[Math.floor(Math.random() * data.message.body.track_list.length)];
        console.log(rand.track.track_id)
        var thisTrack = (rand.track.track_id)
        var thisPic = rand.track.album_coverart_350x350;
        console.log(thisPic)

        var p = document.createElement("p");
        p.textContent = thisTrack;
        p.id = thisTrack;

        var img = document.createElement("img")
        img.setAttribute("src",thisPic)

        document.getElementById("lyrics").appendChild(p).style.opacity = 0;
        // document.getElementById("lyrics").appendChild(img);
        document.getElementById("ghost").click();

    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };


 function getLyricsNow(){
    var trackId = document.getElementById("lyrics").textContent;
    console.log(trackId)
  $.ajax({
    type: "GET",
    data: {
        apikey:"445d6196c08dc2b7490929f18149d684",
        track_id: trackId,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
       console.log(data); console.log(data.message.body.lyrics.lyrics_body); 
      var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
       
        var j = document.createElement("p")
        j.textContent = lyricsBody
        document.getElementById("lyrics").appendChild(j)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };


 //FIREBASE

 //FIREBASE

//   // Initialize Firebase
 var config = {
   apiKey: "AIzaSyDltL_UoPGDnD--mBV5zCWzt-txKfxMYs4",
   authDomain: "music-emotions.firebaseapp.com",
   databaseURL: "https://music-emotions.firebaseio.com",
   projectId: "music-emotions",
   storageBucket: "music-emotions.appspot.com",
   messagingSenderId: "707236220935"
 };
 firebase.initializeApp(config);

var database = firebase.database();
console.log(database, "test");

$("#addEmotion").on("click", function (event) {
   event.preventDefault();


   var emotionInput = $("#emotion-input").val().trim();

   var addDate = $("#addDate").val().trim();


   var newEmotion = {
       temotion: emotionInput,
       taddDate: addDate,
   };

   database.ref().push(newEmotion);

   console.log(newEmotion.temotion, "ok");

   



   $("#emotion-input").val("")
   $("#addDate").val("")

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var emotionInput = childSnapshot.val().temotion;
    var addDate = childSnapshot.val().taddDate;

    $("#emotion-tracker").append("<tr><td>" + emotionInput + "</td><td>" + addDate + "</td></tr>")
}); 