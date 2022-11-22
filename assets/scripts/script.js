$(document).ready(function (){
    var cityName; 
    var startTime; 
    var endTime;
    
    if(localStorage.length != 0){
        window.location.href = "higher.html";        
    }

    $('.submit').click(function(){
        cityName = $('.city-name').val();
        startTime = $('.start-time').val();
        endTime = $('.end-time').val();
        localStorage.setItem(0 , cityName);
        localStorage.setItem(1, startTime);
        localStorage.setItem(2,endTime);
        window.location.href = "higher.html";
    })
});