var key ='07c1c6d5328a19f0c0e6b57a45d767d0'
var city ='Detroit'


// need to get current date and time
var today = dayjs();
$("#cardTodayDate").text(today.format('MMMM DD, YYYY'));


// need to save the user search and store it to an array in local storage
var cityHistory = [];
$('.btn-search').on("click", function(event){
    event.preventDefault();
    
})


// need to turn the city's in search history into buttons

// function display the current weather on the Today div
// fetch the weather data from the api Update the HTML and CSS with the weather data
$.ajax({
    url: requestUrl,
    method: 'GET',
}).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
});


// add event listeners to form inputs and search history elements so that the user can interact with your weather dashboard

