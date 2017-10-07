// initial array of foods
var topics = ["watermelon", "pumpkin", "tomato", "pie", "cake", "pizza", "spaghetti", ];
//make butttons
// var src;
// var dataUrl;
// var foodImage;

function renderButtons() {
    $("#food-view").empty();
    for (i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("food");
        a.attr("data-name", topics[i]),
            a.text(topics[i]);
        $("#food-view").append(a);
    }
}

$("#add-food").on("click", function (event) {
    event.preventDefault();
    var food = $("#food-input").val().trim();
    topics.push(food);
    clearInput();
    renderButtons();
});

renderButtons();

function clearInput() {
    $("#food-input").val('');
    $("#food-input").focus();
}
$(".food").on("click", function (event) {
    // api_key = bOKLbAqau8gyELiXlbxmxG4gKbfXELE4;
    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=bOKLbAqau8gyELiXlbxmxG4gKbfXELE4&limit=10";
    //create ajax call
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var foodDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                foodImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                foodImage.attr({
                    "src": results[i].images.fixed_height_still.url,
                    "data-still":results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still",
                });
                // var src = foodImage.attr["src"];
                // var dataUrl = foodImage.attr["data-url"];
                foodImage.addClass("image");
                // Appending the paragraph and image tag to the foodDiv
                foodDiv.append(p);
                foodDiv.append(foodImage)
                $("#gifs-appear-here").prepend(foodDiv);
                // console.log(this);
                // console.log(foodImage);
            };
            $(".image").on("click", function () {

                console.log("hi")
                console.log(this);
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }


            });
        });


});