$(document).ready(function (){
    if(localStorage.length == 0 || localStorage.getItem(0) == null){
        window.location.href = "index.html"
    }
    var cityName = localStorage.getItem(0);
    var startTime = localStorage.getItem(1);
    var startHour = startTime.slice(0,2);  
    var endTime = localStorage.getItem(2);    
    var endHour = endTime.slice(0,2)
    var currentDay = parseInt(dayjs().format('DD'));
    var arrayDay;
    var arrayTime;
    var temps = [];
    var windSpeeds = [];
    var conditions = [];



    //Display City and Start Time 
    $('.conditions').find('h2').text(cityName);
    $('.conditions').find('p').text(startTime+ " -> " +endTime);

    displayWeather(cityName);

    function displayWeather (n){
        weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+n+"&units=metric&appid=ee1d180c5b424d260ddb1d1ce6058778";
        fetch(weatherUrl).then(function(response){
            if (response.ok){
                response.json().then(function(data){
                    for(var i = 0; i < data.list.length; i++){
                        arrayDay = parseInt(data.list[i].dt_txt.slice(8,10));
                        arrayTime = parseInt(data.list[i].dt_txt.slice(11,13));
                        if(currentDay + 1 == arrayDay && startHour <= arrayTime && endHour >= arrayTime ){
                            conditions.push(data.list[i].weather[0].description);
                            windSpeeds.push(data.list[i].wind.speed);
                            temps.push(data.list[i].main.temp);
                        }                        
                    }
                    console.log(temps, windSpeeds, conditions);
                    const averageTemp=temps.reduce((a,b)=>a+b,0)/temps.length;
                    clothingSuggestion(averageTemp);
                    // umbrellaSuggestion(conditions);
                })
            }
        }) 
    };

    function displayWeatherAlert (n){
        weatherAlertUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=43.7001&lon=-79.4163&exclude=hourly,daily&appid=a0bbd7e7d2d686d902e4b6b8ef49689e"
        fetch(weatherAlertUrl).then(function(response){
            if (response.ok){
                response.json().then(function(data){
                    console.log(data);

                })
            }
        })
    };

    // display clothing suggestions
    function clothingSuggestion(averageTemp){
        if(averageTemp>=25){
            document.querySelector("#clothes").innerHTML=
            `<div class="list-item-group"> 
            <img src="./assets/image/t-shirt-blue.png" alt="shirt">
            <img src="./assets/image/denim-shorts.png" alt="shorts">
            <img src="./assets/image/sunglass.png" alt="sunglass">
            <p> Hot, drink enough water to avoid dehydration </p>
            </div>`;
        }else if(averageTemp>=20 && averageTemp<25){
            document.querySelector("#clothes").innerHTML=
            `<div class="list-item-group"> 
            <img src="./assets/image/t-shirt-blue.png" alt="shirt">
            <img src="./assets/image/trousers-grey.png" alt="trousers">
            </div>`;
        }else if(averageTemp>=10 && averageTemp<20){
            document.querySelector("#clothes").innerHTML=
            `<div class="list-item-group"> 
            <img src="./assets/image/denim-jacket.png" alt="jacket">
            <img src="./assets/image/long-sleeve-color.png" alt="long sleeve">
            <img src="./assets/image/trousers-grey.png" alt="trousers">
            </div>`;
        }else if(averageTemp>=0 && averageTemp<10){
            document.querySelector("#clothes").innerHTML=
            `<div class="list-item-group"> 
            <img src="./assets/image/jacket.png" alt="jacket">
            <img src="./assets/image/hoodie.png" alt="hoodie">
            <img src="./assets/image/trousers-warm.png" alt="trousers">
            <img src="./assets/image/boot-yellow.png" alt="boots">
            </div>`;
        }else{
            document.querySelector("#clothes").innerHTML=
            `<div class="list-item-group"> 
            <img src="./assets/image/coat-gray.png" alt="coat">
            <img src="./assets/image/sweater.png" alt="sweater">
            <img src="./assets/image/trousers-warm.png" alt="trousers">
            <img src="./assets/image/scarf-blue.png" alt="scarf">
            <img src="./assets/image/winter-hat-pink.png" alt="hat">
            <img src="./assets/image/boot-yellow.png" alt="boots">
            </div>`;
        }
    }

   
    // umbrella is added when it's raining and not strong wind; when wind is also strong, raincoat is added
    // function umbrellaSuggestion(condition){
    //     let umbrella= condition.search("rain");
    //     console.log(umbrella);
    //     if(umbrella){
    //         document.querySelector("#clothes").innerHTML+=
    //         `<img src="./assets/image/raincoat-yellow.png" alt="raincoat">
    //         <img src="./assets/image/umbrella-color.png" alt="umbrella"> `
    //     }
        
    // }

});