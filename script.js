$("#search-btn").on("click",function(){
    var city = $("#search-input").val();
    cities.push(city);
    storeThisCity();
    searchWeather(city)
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
    $.ajax({
        type: 'GET',
        url: "https://api.openweathermap.org/data/2.5/weather?q="+x+"&appid=91c1d0e4e6ad5ba477f27aa09d5d56d5&units=imperial"
    }).then(function(data){
        let d = new Date();
        let date = $('<p>').text(d)
        let cityName = $('<h2>').text(data.name);
        let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        let a = $('<div>');
        $(a).append(cityName).append(date).append(img);

        let b = $('<div>');
        

        $('.today-wth').append(a);
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

