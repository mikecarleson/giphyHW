var show = ["Rick and Morty", "Simpsons", "Animaniacs", "Doug", "Rugrats"];
var newButton;
var cartoonImage;

function createButtons() {
  $("#cartoon-btn-div").empty();

  for (var i = 0; i < show.length; i++) {
    var newButton = $("<button>");
    newButton.text(show[i]);
    newButton.attr("data-name", show[i]);
    newButton.addClass("btn btn-primary p-2 mr-3 mb-2 cartoon-btn");
    $("#cartoon-btn-div").append(newButton);
  }
}

function displayCartoonImages() {
  $("#results-div-col1").empty();
  $("#results-div-col2").empty();
  $("#results-div-col3").empty();
  $("#click-to-play-text").empty();

  var cartoon = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    cartoon +
    "&api_key=AnyswKAyOHNYMqaS6u0CNgkOjHRQY7Dp&limit=9";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    var results = response.data;
    $("#click-to-play-text").append(
      "<h4>" + "Click a gif to play. Click again to pause." + "</h4>"
    );

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r") {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var cartoonImage = $("<img>");
        cartoonImage.attr("src", results[i].images.fixed_height_still.url);
        cartoonImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        cartoonImage.attr("data-animate", results[i].images.fixed_height.url);
        cartoonImage.attr("data-state", "still");
        cartoonImage.addClass("img-fluid gif");

        gifDiv.prepend(p);
        gifDiv.prepend(cartoonImage);

        if (i >= 0 && i < 3) {
          $("#results-div-col1").append(gifDiv);
        } else if (i >= 3 && i < 7) {
          $("#results-div-col2").append(gifDiv);
        } else {
          $("#results-div-col3").append(gifDiv);
        }
      }
    }

    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
}

$("#submit-button").on("click", function(event) {
  event.preventDefault();
  var cartoonInput = $("#cartoon-input")
    .val()
    .toLowerCase();

  $("#cartoon-input").val("");

  if (show.indexOf(cartoonInput) > -1) {
    alert(cartoonInput + " this button already exists.");
  } else if (cartoonInput === "" || cartoonInput === null) {
    return false;
  } else if (show.indexOf(cartoonInput) === -1) {
    show.push(cartoonInput);
    createButtons();
  }
});

createButtons();

$(document).on("click", ".cartoon-btn", displayCartoonImages);
