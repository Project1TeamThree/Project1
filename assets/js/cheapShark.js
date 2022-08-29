// Don't remember why but initially I declared the requestUrlCheapShark variable and then redefined it before it was ever used. Saving both URLs for now.
//var requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";
var requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/games?title=";
var userInput = document.getElementById("searchBar");
var resultList = document.getElementById("cheap-shark");
var appIDs;
var testzone = document.getElementById('placeholder');
var storeInfoArray = [0];
var historyDisplay = document.getElementById('search-history-area');
var searchHistory;

// Sets some initial variables based on what we find in local storage.
var historySave = JSON.parse(localStorage.getItem("searchHistory"));
if (historySave == null || historySave == undefined){
    searchHistory = [];
} else {
    searchHistory = historySave;
}




requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/games?title=";


function testFunction(){
    console.log("The test function was called successfully")
}

// Gets the cheapshark store list on launch so that "storeID" can be referenced easily
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
        if (data.length == 0){
            document.getElementById('notice').textContent = "Hmmm... we didn't find any games from that search.";
        } else {
            document.getElementById('notice').textContent = 'We found deals for these games:'
        }
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


// Creates clickable to bring user back to previously searched games' store listings
function displayHistory () {
    for (let i = 0; i < searchHistory.length; i++){
        var newButton = document.createElement('button');
        newButton.setAttribute('class', 'btn btn-primary history-button');
        newButton.setAttribute('data-title', parseTitle(searchHistory[i]));
        newButton.innerHTML = searchHistory[i];
        historyDisplay.append (newButton);
    }
}

// Print the pertinent info from getGameNames into the resultsList
function display(data){

    document.getElementById('card1').classList.remove('hidden');
    console.log("User-friendly Data:", data)
    for (x in data){
        let gameData = data[x]
        var gameListing = document.createElement('li');
        gameListing.classList.add('game-listing')

        // Name
        var listingName = document.createElement('p');
        listingName.textContent = gameData.info.title;
        gameListing.append(listingName);


        // Image
        var listingImage = document.createElement('img');
        listingImage.setAttribute('src', gameData.info.thumb);
        gameListing.append(listingImage);

        // Lowest (CheapShark) price
        var listingPrice = document.createElement('p');
        listingPrice.textContent = "Lowest Price: $" + gameData.deals[0].price;
        gameListing.append(listingPrice);

        // Button to take you to buying options
        var listingButton = document.createElement('button');
        listingButton.textContent = 'Store Options';
        listingButton.setAttribute('id',parseTitle(gameData.info.title));
        listingButton.setAttribute('data-title', gameData.info.title)
        gameListing.append(listingButton);

        // var gameListings = document.querySelectorAll('#cheap-shark > *');
        // console.log('All Listings:', gameListings)
        resultList.append(gameListing);
    }
}

displayHistory();

// Search for games with CheapShark API when button is clicked
document.getElementById('searchButton').addEventListener('click', function(){
    userInput = document.getElementById("searchBar").value;
    resultList.innerHTML = "";
    getAppIDs(userInput);
})

// Treat pressing Enter/Return with focus on search bar as clicking search button
userInput.addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchButton').click();
    }
})

// Listen for clicking on buttons other than the search bar to send to advanced results page.
document.addEventListener('click', function(event){
    // Check to make sure that it's a button and not the search button or a search history button
    if (event.target.nodeName == "BUTTON" && event.target.id != 'searchButton' && !event.target.classList.contains('history-button')){
        // Add it to search history if it's not already there.
        if (!searchHistory.includes(event.target.dataset.title)) {
            searchHistory.push(event.target.dataset.title)
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        }
        //console.log(event.target.dataset.title)
        document.location.href = './results.html?q=' + event.target.id
    }
})