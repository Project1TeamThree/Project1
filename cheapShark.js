// console.log("hi");
var requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";
var userInput = document.getElementById("searchBar");
var resultList = document.getElementById("cheap-shark");
var appIDs;
var testzone = document.getElementById('placeholder');
var storeInfoArray = [0];


requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/games?title=";


function testFunction(){
    console.log(userInput)
}

// Gets the cheapshark store list on launch so that "storeID" can be references
function displayStoreInfo(){
    fetch("https://www.cheapshark.com/api/1.0/stores")
    .then((response) => response.json())
    .then((data) => {
        console.log("STORE INFO:", data)
        for (let i = 0; i < data.length; i++){
            storeInfoArray.push(data[i].storeName)
        }
        console.log(storeInfoArray)
    })
}

displayStoreInfo();

function getAppIDs(title){
    var appIDarrays = [];
    fetch(requestUrlCheapShark + title + "&limit=60")
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
        //getDealInfo()
    })
}

// Makes the game/info/title more readable to ITAD API.
function parseTitle (title) {
    parsedTitle = title.split(' ').join('');
    parsedTitle = parsedTitle.split(' ').join('');
    return parsedTitle;
}

// function getDealInfo(dealID, storeID){
//     fetch("https://www.cheapshark.com/api/1.0/deals?id=" + dealID)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log("DEAL INFO:", data)
//     })

//     fetch("https://www.cheapshark.com/api/1.0/stores")
//     .then((response) => response.json())
//     .then((data) => {
//         console.log("STORE INFO:", data)
//     })
//}


function display(data){

    document.getElementById('card1').classList.remove('hidden');
    console.log("User-friendly Data:", data)
    for (x in data){
        let gameData = data[x]
        var gameListing = document.createElement('li');
        gameListing.classList.add('game-listing')

        var listingName = document.createElement('p');
        listingName.textContent = gameData.info.title;
        gameListing.append(listingName);

        var listingImage = document.createElement('img');
        listingImage.setAttribute('src', gameData.info.thumb);
        gameListing.append(listingImage);

        
        var listingPrice = document.createElement('p');
        listingPrice.textContent = "Lowest Price: $" + gameData.deals[0].price;
        gameListing.append(listingPrice);

        var listingButton = document.createElement('button');
        listingButton.textContent = 'Store Options';
        listingButton.setAttribute('id',parseTitle(gameData.info.title));
        gameListing.append(listingButton);

        // var gameListings = document.querySelectorAll('#cheap-shark > *');
        // console.log('All Listings:', gameListings)
        resultList.append(gameListing);
    }
}


document.getElementById('searchButton').addEventListener('click', function(){
    userInput = document.getElementById("searchBar").value;
    resultList.innerHTML = "";
    getAppIDs(userInput);
})


userInput.addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchButton').click();
    }
})

document.addEventListener('click', function(event){
    if (event.target.nodeName == "BUTTON" && event.target.id != 'searchButton'){
        document.location.replace('./results.html?q=' + event.target.id)
    }
})