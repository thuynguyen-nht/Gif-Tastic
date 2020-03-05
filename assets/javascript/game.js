$(document).ready(function () {


    //Global Variables==================
    var animalLists = ["bird", "bear", "fish", "cat", "turtle", "wolf", "squirrel", "owl"];

    //1. Add the button to the DOM
    function buttonRendering() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        for (var i = 0; i < animalLists.length; i++) {
            //add a variable with new button
            var animalBtn = $("<button>");

            animalBtn.text(animalLists[i]);

            animalBtn.addClass("animal").attr("data-name", animalLists[i]);

            $("#buttons-view").append(animalBtn);

        }
    }

    //2. When the search button submit, the input is push to array then push to the DOM
    $("#add-animal").on("click", function (event) {
        event.preventDefault();

        var inputAnimal = $("#search-input").val().toLowerCase().trim();

        console.log(inputAnimal)

        var check = false;
        if (animalLists.indexOf(inputAnimal) !== -1) {

            alert("Exist")
            check = false;
            console.log(check)
            $("#search-input").val("");
        } else {
            check = true;
            console.log(check)
        }
        if (check) {

            //push to the array
            animalLists.push(inputAnimal);

            buttonRendering();
            $("#search-input").val("");
        }
    })

    //3. get the gif from Giphy
    function displayGif() {
        var animalDisplay = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalDisplay + "&api_key=4MpjWrAM3wf0qX6G6dbnCaxyWlDJPuHq&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var animalGif = response.data;
            for (var i = 0; i < animalGif.length; i++) {
                console.log(animalGif[i].rating)
                // Creating and storing a div tag
                var gifArea = $("<div class='inlineBlock'>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + animalGif[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img class='gif img-fluid'>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", animalGif[i].images.fixed_height_still.url)
                animalImage.attr("data-still", animalGif[i].images.fixed_height_still.url)
                animalImage.attr("data-animate", animalGif[i].images.fixed_height.url)
                animalImage.attr("data-state", "still");

                // Appending the paragraph and image tag to the animalDiv
                gifArea.append(p);
                gifArea.append(animalImage);

                $("#display-view").prepend(gifArea);
            }
        });

    }

    $(document).on("click", ".gif", function () {
        console.log("I am working")

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }

    });

    //GAME RUN=============
    $(document).on("click", ".animal", displayGif);

    buttonRendering();

});