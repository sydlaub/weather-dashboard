var key = '07c1c6d5328a19f0c0e6b57a45d767d0'
var city = 'Detroit'

var searchBtn = $(".btn-search")

// need to get current date and time
var today = dayjs();
$("#cardTodayDate").text(today.format('MMMM DD, YYYY'));


// need to save the user search and store it to an array in local storage
 var cityHistory = JSON.parse(localStorage.getItem('city')) || []


$('.btn-search').on("click", function (event) {
    event.preventDefault();
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

console.log(cityHistory)
// need function to render the city searches as buttons 
function createCityButtons (){
    $(".cityHistory").empty()
    $(cityHistory).each(function (i){
        var historyBtn = $("<button>").text(cityHistory[i]).addClass("cityBtn btn btn-light mb-2");
        $(".cityHistory").append(historyBtn).append("<br />");
    })
    
    
    // !!!!!!create function to display weather when city button is clicked
    $(".cityBtn").on("click", function(event){
        var city = $(historyBtn.text)
        weatherDisplay($(this));
    }
    
    )
    
}

// run create city buttons function on search button click
$('.btn-search').on("click", function (event) {
    createCityButtons()
})

// call function if there is information in local storage
if (localStorage.getItem('city') !== null){
    createCityButtons();
}





// weather display function
function weatherDisplay(event) {
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
    }).then(function (response) {
        console.log(response);
        // current weather display code goes here
        $(".cardTodayCityName").text(response.name)
        var ul = $("<ul>")

        // display the weather icon
        var todayIcon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)

        // current temp display
        var liTemp = $("<li>")
        liTemp.text("Temperature: " + response.main.temp + "°F")
        
        // current humidity display
        var liHumidity = $("<li>")
        liHumidity.text("Humidity: " + response.main.humidity + "%")
        
        // current wind speed display
        var liWind = $("<li>")
        liWind.text("Wind Speed: " + response.wind.speed + " mph")
        
        
        ul.append(todayIcon, liTemp, liHumidity, liWind)
        
        $(".cardTextToday").empty()
        $(".cardTextToday").append(ul)
        
        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}&units=imperial`
        return $.ajax({
            url: requestUrl,
            method: 'GET'
        })
    }).then(function (response) {
        console.log(response);
        // code to display the 5 day forecast
        var fiveDayData = response.list;
        var weatherObj = {
            futureTemp: [""],
            futureHumid: [""],
            futureWind: [""],
            futureWeatherIcon: [""]
        };
        console.log(fiveDayData)
        
        // get weather data for the 5 days
        for (i = 8; i < fiveDayData.length; i += 8) {
            var fTemp = $("<li>")
            var fHumid = $("<li>")
            var fWind = $("<li>")
            var fWeatherIcon = $("<img>")
            // get temps for the 5 days
            fTemp.text(fiveDayData[i].main.temp)
            fHumid.text(fiveDayData[i].main.humidity)
            fWind.text(fiveDayData[i].wind.speed)
            weatherObj.futureTemp.push(fTemp)
            weatherObj.futureHumid.push(fHumid)
            weatherObj.futureWind.push(fWind)
            weatherObj.futureWeatherIcon.push(fWeatherIcon)
        }
        console.log(weatherObj)
        //display the 5 day forcast to the browser
        
        // card one
        var ulFutureOne = $("<ul>")
        var cardDivOne = $("<div>");
        cardDivOne.attr("class", "card future-card text-black bg-primary mb-3")
        cardDivOne.attr("style", "max-width: 200px;");
        
        var tempOne = $("<li>")
        tempOne.text("Temperature: " + weatherObj.futureTemp[1][0].innerHTML + "°F")
        
        humidOne = $("<li>")
        humidOne.text("Humidity: " + weatherObj.futureHumid[1][0].innerHTML + "%")
        
        windOne = $("<li>")
        windOne.text("Wind: " + weatherObj.futureWind[1][0].innerHTML + " mph")
        
        iconOne = $("<img>").attr("src", `https://openweathermap.org/img/wn/${response.list[1].weather[0].icon}@2x.png`)
        
        ulFutureOne.append(iconOne, tempOne, humidOne, windOne)
        cardDivOne.append(ulFutureOne)
        $(".futureWeatherDisplay").empty()
        $(".futureWeatherDisplay").append(cardDivOne)
        
        
        // card two
        var ulFutureTwo = $("<ul>")
        var cardDivTwo = $("<div>");
        cardDivTwo.attr("class", "card future-card text-black bg-primary mb-3")
        cardDivTwo.attr("style", "max-width: 200px;");
        
        var tempTwo = $("<li>")
        tempTwo.text("Temperature: " + weatherObj.futureTemp[2][0].innerHTML + "°F")
        
        humidTwo = $("<li>")
        humidTwo.text("Humidity: " + weatherObj.futureHumid[2][0].innerHTML + "%")

        windTwo = $("<li>")
        windTwo.text("Wind: " + weatherObj.futureWind[2][0].innerHTML + " mph")
        
        iconTwo = $("<img>").attr("src", `https://openweathermap.org/img/wn/${response.list[2].weather[0].icon}@2x.png`)
        
        ulFutureTwo.append(iconTwo, tempTwo, humidTwo, windTwo)
        cardDivTwo.append(ulFutureTwo)
        $(".futureWeatherDisplay").append(cardDivTwo)
        
        // card three
        var ulFutureThree = $("<ul>")
        var cardDivThree = $("<div>");
        cardDivThree.attr("class", "card future-card text-black bg-primary mb-3")
        cardDivThree.attr("style", "max-width: 200px;");
        
        var tempThree = $("<li>")
        tempThree.text("Temperature: " + weatherObj.futureTemp[3][0].innerHTML + "°F")
        
        humidThree = $("<li>")
        humidThree.text("Humidity: " + weatherObj.futureHumid[3][0].innerHTML + "%")
        
        windThree = $("<li>")
        windThree.text("Wind: " + weatherObj.futureWind[3][0].innerHTML + " mph")
        
        iconThree = $("<img>").attr("src", `https://openweathermap.org/img/wn/${response.list[3].weather[0].icon}@2x.png`)
        
        ulFutureThree.append(iconThree, tempThree, humidThree, windThree)
        cardDivThree.append(ulFutureThree)
        $(".futureWeatherDisplay").append(cardDivThree)
        
        // card four
        var ulFutureFour = $("<ul>")
        var cardDivFour = $("<div>");
        cardDivFour.attr("class", "card future-card text-black bg-primary mb-3")
        cardDivFour.attr("style", "max-width: 200px;");
        
        var tempFour = $("<li>")
        tempFour.text("Temperature: " + weatherObj.futureTemp[4][0].innerHTML + "°F")
        
        humidFour = $("<li>")
        humidFour.text("Humidity: " + weatherObj.futureHumid[4][0].innerHTML + "%")
        
        windFour = $("<li>")
        windFour.text("Wind: " + weatherObj.futureWind[4][0].innerHTML + " mph")
        
        iconFour = $("<img>").attr("src", `https://openweathermap.org/img/wn/${response.list[4].weather[0].icon}@2x.png`)
        
        
        ulFutureFour.append(iconFour, tempFour, humidFour, windFour)
        cardDivFour.append(ulFutureFour)
        $(".futureWeatherDisplay").append(cardDivFour)


    })
    
}


// add event listeners to form inputs and search history elements so that the user can interact with weather dashboard


