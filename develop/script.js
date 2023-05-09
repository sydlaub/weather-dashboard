var key ='07c1c6d5328a19f0c0e6b57a45d767d0'
var city ='Detroit'


// need to get current date and time
var today = dayjs();
$("#cardTodayDate").text(today.format('MMMM DD, YYYY'));


// need to save the user search and store it to an array in local storage
var cityHistory = JSON.parse(localStorage.getItem("city")) || [];
$('.btn-search').on("click", function(event){
    event.preventDefault();
    // weatherDisplay($(this))
    city = $(this).parent(".btnParent").siblings(".btnTextVal").val().trim();
    if (city === "") {
        return;
    };
    cityHistory.push(city);
    console.log(cityHistory)

    // store in localStorage
    localStorage.setItem('city', JSON.stringify(cityHistory));
    weatherDisplay($(this));

})

var cityHistoryEl = $('.cityHistory')
function displayHistory() {
    cityHistoryEl.empty();

    for (let i = 0; i < cityHistory.length; i++){
        var row = $('<row>');
        var cityBtn = $('<button>').text(`${cityHistory[i]}`)

        row.addClass('row cityBtnRow');
        cityBtn.addClass('btn btn-outline-secondary cityBtn')
        cityBtn.attr("type", "button");

        cityHistoryEl.prepend(row);
        row.append(cityBtn);
    } if (!city) {
        return; 
    }

    // function to make the city history buttons prompt a search
    $('.cityBtn').on("click", function (event){
        event.preventDefault();
        console.log(event)
        weatherDisplay($(event.target.innerText));
    })
};

displayHistory()

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
        liWind.text("Wind Speed: " + response.wind.speed + " mph")


        ul.append(liTemp, liHumidity, liWind)

        $(".cardTextToday").empty()
        $(".cardTextToday").append(ul)

        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}&units=imperial`
        return $.ajax({
            url: requestUrl,
            method: 'GET'
        })
    }) .then (function (response){
        console.log(response);
        // code to display the 5 day forecast
        var fiveDayData = response.list;
        var weatherArray = [];

        // object to store weather data from API
        $.each(fiveDayData, function (index, value){
            dataObject = {
                date: value.dt_txt.split(' ')[0],
                time: value.dt_txt.split(' ')[1],
                temp: value.main.temp,
                humidity: value.main.humidity,
                wind: value.wind.speed,
                icon: value.weather[0].icon
            }
            // push data at time 12 into my array
            if (value.dt_txt(' ')[1] === "12:00:00"){
                weatherArray.push(dataObject);
            }
        })
        //display the 5 day forcast to the browser
        for (let i = 0; i < myWeather.length; i++){
            // create card for display of weather inside of the 5 day forecast element
            var cardDiv = $("<div>");
            cardDiv.attr("class", "card text-black bg-primary mb-3")
            cardDiv.attr("style", "max-width: 200px;");

            // add divs for elements inside of the card

            var cardDivHead = $("<div>");
            cardDivHead.attr()
        } 
    }) 
    
    // console.log(response.list) 
}


// add event listeners to form inputs and search history elements so that the user can interact with your weather dashboard

