$(document).ready(function (){
    //checks for null value in local storage or if its empty
    if(localStorage.length == 0 || localStorage.getItem(0) == null){
        window.location.href = "index.html";
    }
    //variable declaration
    var cityName = localStorage.getItem(0);
    var startTime = localStorage.getItem(1);
    var startHour = startTime.slice(0,2);  
    var endTime = localStorage.getItem(2);    
    var endHour = endTime.slice(0,2);
    var currentDay = parseInt(dayjs().format('DD'));
    var arrayDay;
    var arrayTime;
    var temps = [];
    var windSpeeds = [];
    var conditions = [];
    var times = [];
    var icons = [];
    var alertsDescription = [];


    //Display City and Start Time 
    $('.conditions').find('.city-name').text(cityName);
    $('.conditions').find('start-end').text(startTime+ " -> " +endTime);

    displayWeather(cityName);
    //Function gets the weather data for the shift and displays it by calling many other functions that handle specific tasks
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
                            times.push(arrayTime);
                            icons.push(data.list[i].weather[0].icon);
                        }                        
                    }                    
                    const averageTemp=temps.reduce((a,b)=>a+b,0)/temps.length;
                    clothingSuggestion(averageTemp);
                    toolSuggestion(conditions,windSpeeds);
                    getConditions(conditions, icons, times);
                    displayWeatherAlert (cityName);
                })
            }
        }) 
    }    
    //if there are weatheralerts in the selected city they are rendered here
    function displayWeatherAlert (n){
        weatherAlertUrl = "https://api.weatherbit.io/v2.0/alerts?city="+n+"&key=c569e1e0140d46009e8130354da99ed7"
        fetch(weatherAlertUrl).then(function(response){
            if (response.ok){
                response.json().then(function(data){
                    try{
                        $('.displayed-conditions').append(
                            `<article class="message is-warning article-alert">
                                <div class="message-header">
                                    <p>Warning</p>                                
                                </div>
                                <div class="message-body">
                                    `+ data.alerts[0].description +` 
                                </div>
                            </article>` 
                        );
                    }catch(err){
                        $('.displayed-conditions').append(
                            `<article class="message is-success article-alert">
                                <div class="message-header">
                                    <p>No Storms Detected</p>                                
                                </div>
                                <div class="message-body">
                                    No Severe Weather Warnings reported by weatherbit.io in `+ n +`.
                                </div>
                            </article>`
                        ); 
                    }
                })
            }
        })
    };

    // display clothing suggestions based on temperature
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
            <img src="./assets/image/trousers_warm_blue.png" alt="trousers">
            <img src="./assets/image/boot-yellow.png" alt="boots">
            </div>`;
        }else{
            document.querySelector("#clothes").innerHTML=
            `<div class="list-item-group"> 
            <img src="./assets/image/coat-gray.png" alt="coat">
            <img src="./assets/image/sweater.png" alt="sweater">
            <img src="./assets/image/trousers_warm_blue.png" alt="trousers">
            <img src="./assets/image/scarf-blue.png" alt="scarf">
            <img src="./assets/image/winter-hat-pink.png" alt="hat">
            <img src="./assets/image/boot-yellow.png" alt="boots">
            </div>`;
        }
    }
   
    // umbrella is added when it's raining and not windy; 
    // raincoat is added when it's raining and windy (>20mph is windy );
    // windcoat is added when it's not raining and windy
    function toolSuggestion(condition,wind){
        let rain;
        let windy;
        for(let i=0; i<condition.length; i++){
            rain=condition[i].includes("rain");
            if(rain){
                break;
            }
        }
        for(let i=0; i<wind.length; i++){
            windy=wind[i]>20;
            if(windy){
                break;
            }
        }

        if(rain ==true && windy ==false){
            document.querySelector("#clothes").innerHTML+=
            `<img src="./assets/image/umbrella-color.png" alt="umbrella"> `
        }else if(rain ==true && windy ==true){
            document.querySelector("#clothes").innerHTML+=
            `<img src="./assets/image/raincoat-yellow.png" alt="raincoat">`
        }else if(rain ==false && windy ==true){
            document.querySelector("#clothes").innerHTML+=
            `<img src="./assets/image/windcoat.png" alt="windcoat">`
        }
    }
    //function that creates the html nodes for the different forecast hours and appends it to the DOM
    function getConditions(conditions,icons,times){
        for (i = 0; i < conditions.length; i++){
            var isPM;

            if (times[i] > 12){
                isPM = times[i] + ":00 PM";
            }else{
                isPM = times[i] + ":00 AM";
            }
            
            $('.displayed-conditions').append(
                `<div class="card card-created">
                </header>
                <button class="card-header-icon dropdown is-hoverable" aria-label="more options">
                    <img src="http://openweathermap.org/img/wn/`+ icons[i] +`@2x.png"></img>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div class="dropdown-content">
                        <div class="dropdown-item">
                            <p>Condition: `+conditions[i]+`</p>
                            <p>Time: `+isPM+`</p>                            
                        </div>
                        </div>
                    </div>
                </button>
                </div>` 
            );            
        }
    }

    //Click listner for reseting local storage
    $('.submit').click(function() {
        localStorage.clear();
        location.href = 'index.html';
    })

})