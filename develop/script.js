var key ='07c1c6d5328a19f0c0e6b57a45d767d0'
var city ='Detroit'


// need to get current date and time
var today = dayjs();
$("#cardTodayDate").text(today.format('MMMM DD, YYYY'));


// need to save the user search and store it to an array in local storage
var cityHistory = [];
$('.btn-search').on("click", function(event){
    event.preventDefault();
    weatherDisplay($(this))
    city = $(this).parent(".btnParent").siblings(".btnTextVal").val().trim();
    if (city === "") {
        return;
    };
    cityHistory.push(city);
    console.log(cityHistory)

    // store in localStorage
    localStorage.setItem('city', JSON.stringify(cityHistory));

})


// need to turn the city's in search history into buttons


// function display the current weather on the Today div
// fetch the weather data from the api Update the HTML and CSS with the weather data

function weatherDisplay (event) {
    var cityName = event.parent().siblings("input").val()
    
    var geo = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
    $.ajax({
        url: geo,
        method: 'GET',
    }).then(function (response) {
        console.log('Ajax Reponse \n-------------');
        console.log(response);
        var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}&units=imperial`
        return $.ajax({
            url: requestUrl,
            method: 'GET',
        })
    }) .then(function (response){
        console.log(response);
        // current weather display code goes here
        $(".cardTodayCityName").text(response.name)
        var ul = $("<ul>")
        // current temp display

        var liTemp = $("<li>")
        liTemp.text("Temperature: " + response.main.temp + "°F")

        // current humidity display
        var liHumidity = $("<li>")
        liHumidity.text("Humidity: " + response.main.humidity)

        // current wind speed display
        var liWind = $("<li>")
        liWind.text("Wind speed: " + response.wind.speed + "mph")


        ul.append(liTemp, liHumidity, liWind)

        $(".cardTextToday").empty()
        $(".cardTextToday").append(ul)

        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}`
        return $.ajax({
            url: requestUrl,
            method: 'GET'
        })
    }) .then (function (response){
        console.log(response);
        // code to display the 5 day forecast
    }) 

}


// add event listeners to form inputs and search history elements so that the user can interact with your weather dashboard

