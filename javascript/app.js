// What do you have?
//   - jQuery to make AJAX requests to an API
//   - jQuery to work with the DOM
//   - Some existing HTML with placeholder information (.result-card)
//   - An API endpoint that has data for me "https://api.tvmaze.com/search/shows?q="
//   - A reference to how to use that API: "https://www.tvmaze.com/api#show-search"

// What do you need?
// When the user clicks the search button, the following needs to happen afterwards:
//     1. I need to take the text they typed in the input box
//     2. I need to get the TV show information based on what the user typed in: "https://api.tvmaze.com/search/shows?q=[SEARCH_STRING]"
//     2. I need to display that information using the .result-card html as a template

// How do you get there?
// I need to use this API endpoint: "https://api.tvmaze.com/search/shows?q="
// I can use the URL bar in my web browser to see what comes back when I visit an end point, e.g."https://api.tvmaze.com/search/shows?q=lost"
// I need to handle a click event on the search button
// I need to get the user information from the input box
// I need to use $.get to make an AJAX request to the endpoint with the user search info, e.g. "https://api.tvmaze.com/search/shows?q=lost"
// I need to use jQuery to recreate the .result-card html and all of it's nested elements
// I need to go through the data sent from the AJAX request and create a result card for each TV show
// I need to add each result card to the #results element.


//setting global variables to grab the results div and the submit button
const $results = $("#results");
const $submit = $("#submit");
$results.text("Use the search bar above to find your favorite TV shows!");


//function that generates each result card upon search
function generateResultCards(data){

  var $span = $('<span class="result-card"></span>');
  var $h3 = $('<h3 class="card-title"></h3>');
  var $img = $('<img class="card-image" src=""></img>')
  var $h2 = $('<h2 class="card-genres">');
  var $div = $('<div class="card-summary">');
  var $em = $('<em>Summary:</em>');
  var $a = $('<a>View Show</a>');

  $h3.text(data.show.name);
  $img.attr('src', data.show.image.medium);
  $h2.text(data.show.genres.toString());
  $div.append($em);
  $div.append(data.show.summary);
  $a.attr('href', data.show.url);

  $results.append($span);
  $span.append($h3);
  $span.append($img);
  $span.append($h2);
  $span.append($div);
  $span.append($a);

}

//function that initiates result card generation after getting search data
function returnResults(){

  //sets url to the tvmaze search url and sets the query to the search box text
  let url =  "https://api.tvmaze.com/search/shows?q=" + $("#text").val(); 

  //retrieves search data based off search url
  $.get(url, (data) => {
      //Clears previous results upon initiating a new search
      $results.empty();
        //Alerts the user if search results returns no results
      if(data.length === 0){
        $results.text("Sorry, we don't have that show!");
      };

          //generates result cards while looping through the collected search data
          for (var index = 0; index < data.length; index++){
              generateResultCards(data[index]);
          };
  });

};


//on clicking submit, it executes the returnResults function
$("#submit").click(returnResults);


//on hitting enter after typing search, run returnResults()
$("#text").keydown(function (e) {
  if (e.keyCode == 13) {
    returnResults();
  };
});