$(document).ready(function (){
    var cityName = localStorage.getItem(0);
    var startTime = localStorage.getItem(1);
    var endTime = localStorage.getItem(2);

    if(localStorage.length == 0){
        window.location.href = "index.html"
    }

    //Display City and Start Time 
    $('.conditions').find('h2').text(cityName);
    $('.conditions').find('p').text(startTime+ " -> " +endTime);

});