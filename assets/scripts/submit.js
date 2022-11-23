$(document).ready(function (){
    var cityName = localStorage.getItem(0);
    var startTime = localStorage.getItem(1);
    var endTime = localStorage.getItem(2);

    if(localStorage.length == 0 || localStorage.getItem(0) == null){
        window.location.href = "index.html"
    }

    //Display City and Start Time 
    $('.conditions').find('h2').text(cityName);
    $('.conditions').find('p').text(startTime+ " -> " +endTime);

    displayWeather(cityName);

    function displayWeather (n){
        weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+n+"&units=metric&appid=ee1d180c5b424d260ddb1d1ce6058778";
        fetch(weatherUrl).then(function(response){
            if (response.ok){
                response.json().then(function(data){
                    console.log(data);

                })
            }
        }) 
    };
});
