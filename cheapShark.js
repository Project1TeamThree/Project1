// console.log("hi");
var requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";
var userInput;
var resultList = document.getElementById("results-area");
var appIDs;
var testzone = document.getElementById('placeholder')

requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/games?title=";

function testFunction(){
    console.log(userInput)
}





function getAppIDs(title){
    var appIDarrays = [];
    fetch(requestUrlCheapShark + title + "&limit=10")
    .then((response) => response.json())
    .then((data) => {
        console.log("CheapShark Data:", data)
        // display(data)
        for (let i=0; i < data.length-1 ; i++){
            appIDarrays.push(data[i].gameID)
        }
        console.log("ID Array: ", appIDarrays);
        getGameNames(appIDarrays);
    });
}

function getGameNames(array){
    var IDstring = array.toString();
    console.log("Stringified Array:", IDstring)
    fetch("https://www.cheapshark.com/api/1.0/games?ids=" + IDstring)
    .then((response) => response.json())
    .then((data) => {
        display(data);
    })
}

function display(data){
    // for (let i = 0; i <= data.length; i++){
    //     var newLi = document.createElement('li');
    //     newLi.textContent = data[i].internalName;
    //     resultList.append(newLi)
    // }
    var objectArray = []
    console.log("User-friendly Data:", data)
    for (x in data){
        let gameData = data[x]
        var gameListing = document.createElement('li');
        gameListing.textContent = gameData.info.title;
        // TODO: Figure out how/where/if to use the thumb image
        // var gameIcon = document.createElement('img');
        // gameIcon.setAttribute("href", gameData.info.thumb.value)
        // testzone.append(gameIcon)
        resultList.append(gameListing);
    }
    
}


document.getElementById('searchButton').addEventListener('click', function(){
    userInput = document.getElementById("city").value;
    getAppIDs(userInput);
})



