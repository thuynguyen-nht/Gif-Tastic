$(document).ready(function () {
    //Global Variables==================
    var animalLists = ["birds", "bear", "mammal", "fish", "cat", "turtle", "wolf", "squirrel", "owl"];

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

        var inputAnimal = $("#search-input").val().trim();

        //push to the array
        animalLists.push(inputAnimal);

        buttonRendering();
    })

    //3. get the gif from Giphy
    function displayGif() {
        var animalDisplay = $(this).attr("data-name");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalDisplay + "&api_key=4MpjWrAM3wf0qX6G6dbnCaxyWlDJPuHq&limit=10";

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
                var gifArea = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + animalGif[i].rating);




            }
        });
    }




    //GAME RUN=============
    $(document).on("click", ".animal", displayGif);

    buttonRendering();



});