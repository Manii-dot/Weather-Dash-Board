$(document).ready(function(){
    $("#search-btn").on("click",function(){
        var city = $("#search-input").val()
        searchWeather(city)
    })
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




})

