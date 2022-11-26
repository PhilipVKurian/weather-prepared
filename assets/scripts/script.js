$(document).ready(function (){
    var cityName; 
    var startTime; 
    var endTime;
    var valid;

    if(localStorage.length != 0 && localStorage.getItem(0) != null){
        window.location.href = "higher.html";        
    }

    function getResponseStatus(n,s,e){        
        weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+n+"&units=metric&appid=ee1d180c5b424d260ddb1d1ce6058778";
        fetch(weatherUrl).then(function(response){
            if (response.ok && s && e){
                response.json().then(function(data){
                    localStorage.setItem(0 , n);
                    localStorage.setItem(1, s);
                    localStorage.setItem(2, e);
                    window.location.href = "higher.html";
                })
            } else {
                displayModal(); 
            }
        })
    }

    function displayModal() {
        $('#failed').attr('class', 'is-active');   

        $('body').on('click', function(){
            $('#failed').attr('class', 'modal');    
        });        
        $('.modal-close').click(function(){
            $('#failed').attr('class', 'modal');
        });
    }

    $('.submit').click(function(){
        cityName = $('.city-name').val();
        startTime = $('.start-time').val();
        endTime = $('.end-time').val();
        getResponseStatus(cityName, startTime, endTime);
    })
});