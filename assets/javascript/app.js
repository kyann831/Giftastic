$(document).ready(function() {
    //Array of Cool Shows
    var topics = ["Stranger things", "Bird Box", "Ozarks", "Frontierland", "Goliath", "Game of Thrones", "Nurse Jackie", "Dexter", "Breaking Bad", "Anne with an E", "Orange is the New Black", "Fuller House", "Billions"]; 

    function displayShowInfo (e) {
        var $target = $(e.target);
        var search = $target.attr('data-name');
        console.log(search);

        var topics = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=AvtnaTM37vVtPKE6K4WZB9ADB6ithNlR&limit=10&rating=G&lang=en";

       //performing ajax request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        //After the data from the AJAX request comes back
        .then(function(response){
            $('#gifs-view').empty();

            window.resp = response;
            window.data = response.data;
            console.log(response.data);

            var dataobject = response.data;

            for (var i = 0; i < dataobject.length; i++ ) {
                var gif = dataobject[i];
                var gifURL = gif.images.fixed_width.url;
                var gifStill = gif.images.fixed_width_still.url;

                //Creating a div to hold the show
                var showDiv = $("<div class='show'>");
                var rating = gif.rating;
                var pOne = $("<p>").text("Rating: " + rating);

                showDiv.append(pOne);

                //Retrieving URL for image
                //Creating an element to hold the image
                var image = $("<img>").attr("src", gifURL);
                image.attr('data-still', gifStill);
                image.attr('data-animate', gifURL);
                image.attr('data-state', 'animate');
                image.on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                });

                //Appending the image
                showDiv.append(image);

                $("#gifs-view").prepend(showDiv);
            }
        });
    }

    //Function for displaying shows
    function renderButtons () {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++){
            var a = $("<button>");
            a.addClass("show-btn btn-info");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

    $("add-show").on("click", function(event) {
        event.preventDefault();

        var topics =$("#show-input").val().trim();

        topics.push(topics);

        renderButtons();
    });

    $(document).on("click", ".show-btn", displayShowInfo);
    renderButtons();
});
