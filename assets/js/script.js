
$(document).ready(function(){
		
		
	$('#submit').on('click', function (event) {
			event.preventDefault();

			var photo = $('#image').val();
			console.log('{"url": '+photo+'}');
			console.log('{"url": "https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg"}"')
			$('#scores').empty();
			$('#faceRectangle').empty();
			$('#title').text("Emotions");
			$('#display').html("<img src='" + photo +  "'alt= 'your image'>");
			

		$(function() {
		        // No query string parameters for this API call.
				var params = { };
				
			var subscriptionKey = "064789cfb06a474ba3531bbc773cfbb0";

		        $.ajax({
		            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
		            //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the 
		            //   URL below with "westcentralus".
					url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion" ,
		            beforeSend: function(xhrObj){
		                // Request headers, also supports "application/octet-stream"
		                xhrObj.setRequestHeader("Content-Type","application/json");

		                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
						xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",subscriptionKey);
		            },
		            type: "POST",
		            // Request body
		            data: '{"url": "'+photo+'"}',
		        }).done(function(data) {
		           
		            
					console.log(data)
		            // Get emotion confidence scores
		            var scores = data[0].faceAttributes.emotion;
		            var scoresList = $('#scores');

					if (data[0].faceAttributes.emotion.happiness > 0.5) {
		            	$('#recommended').text("Major Emotion: Happiness");
		            	$('.content').css("background-color", "#febf55");
		            	$('#playList').html("<iframe src='https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqmBTGDYngZ' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>");
					} else if (data[0].faceAttributes.emotion.anger > 0.5) {
		            	$('#recommended').text("Major Emotion: Anger");
		            	$('.content').css("background-color", "#FC4445");
		            	$('#playList').html("<iframe src='https://open.spotify.com/embed/user/gmcauchi94/playlist/5Zmi1L2g2uUbGJNgq5VHXM' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>");
					} else if (data[0].faceAttributes.emotion.sadness > 0.5) {
		            	$('#recommended').text("Major Emotion: Sadness");
		            	$('.content').css("background-color", "#07889b");
		            	$('#playList').html("<iframe src='https://open.spotify.com/embed/user/funnybunny000000/playlist/4EoPt05ztUjVaujcWbUL2Z' width='300 'height='380' frameborder='0' allowtransparency='true'></iframe>");
		            }


		            // Append to DOM
		            for(var prop in scores) {
		                scoresList.append("<li> " + prop + ": " + scores[prop] + "</li>")
		            }
		        }).fail(function(err) {
		            alert("Error: " + JSON.stringify(err));
		        });
	    });


  


			
	})


});