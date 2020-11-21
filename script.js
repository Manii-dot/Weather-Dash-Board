$("#search-btn").on("click",function(){
    var city = $("#search-input").val();
    cities.push(city);
    storeThisCity();
    searchWeather(city);
});

var cities = ['Killeen', 'Austin', 'Round Rock']

function createBtn(x) {
    var list = $('<li>');
    var button = $('<button>').text(x).addClass('showWeather btn btn-light').val(x);
    list.append(button);
    $('.search-history').append(list);
}

function storeThisCity() {
    localStorage.setItem('keyCity', JSON.stringify(cities));
    let getCities = JSON.parse(localStorage.getItem('keyCity'));
    console.log(getCities);
    $('.search-history').empty();
    for(let i =0; i < getCities.length; i ++) {
        createBtn(getCities[i])
    }
}

$(document).ready(function(){
    cities = JSON.parse(localStorage.getItem('keyCity'));
    if(cities === null) {
        cities = ['Killeen', 'Austin', 'Round Rock'];
    }
    storeThisCity();
});

$(document).on('click', '.showWeather', function(){
    let city = $(this).val();
    console.log(city);
    searchWeather(city);
});

function searchWeather(x) {
    $('.today-wth').empty();
    $('.forecast').empty();
    $.ajax({
        type: 'GET',
        url: "https://api.openweathermap.org/data/2.5/weather?q="+x+"&appid=91c1d0e4e6ad5ba477f27aa09d5d56d5&units=imperial"
    }).then(function(data){
        console.log(data);
        let d = new Date();
        let date = $('<p>').text(d)
        let cityName = $('<h2>').text(data.name);
        let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        let a = $('<div>');
        $(a).append(cityName).append(date).append(img);

        let b = $('<div>');
        let temp = $('<div>').text('Temperature: ' + data.main.temp + '´F');
        let humidity = $('<div>').text('Humidity: ' + data.main.humidity + '%');
        let wind = $('<div>').text('Wind Speed: ' + data.wind.speed + 'MPH');

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let uvValue;
        
        $.ajax({
            type: 'GET',
            url: "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=91c1d0e4e6ad5ba477f27aa09d5d56d5"
        }).then(function(data){
            console.log(data);
            uvValue = data.value;
            let uv = $('<div>').text('UV: ' + uvValue);
            $(b).append(uv)
        });
        

        $(b).append(temp, humidity, wind);

        $('.today-wth').append(a, b);
    });

    $.ajax({
        type: 'GET',
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+x+"&appid=91c1d0e4e6ad5ba477f27aa09d5d56d5&units=imperial"
    }).then(function(data){
        console.log(data);

        let title = $('<h2>').text('5-day Forecast');

        let container = $('<div>').addClass('container');
        let row = $('<div>').addClass('row');
        let col = $('<div>').addClass('col-md-4 col-lg-2 p-2 bg-info');

        let dates = [0, 8, 16, 24, 32];

        function getDateWeather(x) {
            let date = data.list[x];
            let d = date.dt_txt;
            let newDate = $('<p>').text(d);
            let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + date.weather[0].icon + ".png");
            let temp = $('<div>').text('Temperature: ' + date.main.temp + '´F');
        let humidity = $('<div>').text('Humidity: ' + date.main.humidity + '%');
        
        let dateCol = $('<div>').addClass('col-md-4 col-lg-2 p-2 bg-info').append(newDate, img, temp, humidity)

        $(row).append(dateCol);
    }
    
    for (let i = 0; i < dates.length; i++){
        getDateWeather(dates[i]);
    }
    
    $(row).append(col);
        $(container).append(row);

        $('.forecast').append(title, container)
    })
}



/* $(document).ready(function(){
    function searchWeather(city){
        $.ajax({
            type: "GET",
            url:"https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=91c1d0e4e6ad5ba477f27aa09d5d56d5&units=imperial",
            dataType: "json",
            success: function(data){
                if(history.indexOf(city)===-1){
                    history.push(city)
                window.localStorage.setItem("searchHistory",JSON.stringify(city)) 
                // makeListItem(city)
                }
                console.log(data)
                var title = $("<h3>").text(data.name)
                console.log(data.name)
                var card = $("<div>").addClass("card")
                // var calcTemp = parseInt(data.main.temp) - 273.15 
                var temp = $("<p>").addClass("card-text").text(data.main.temp)
                var cardBody = $("<div>").addClass("card-body")
                cardBody.append(title, temp)
                card.append(cardBody)
                $(".today-wth").append(card)

            }
        })
    }
    function searchUV(){

    }

    function fiveDaysForecast(){
        $.ajax({
            type: "GET",
            url:"https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=91c1d0e4e6ad5ba477f27aa09d5d56d5&units=imperial",
            dataType: "json",
    }


    var history = JSON.parse(window.localStorage.getItem("searchHistory")) || []




}) */

