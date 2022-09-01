var gameNameDisplay = document.getElementById('title-display');

var searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory'));

var results = document.getElementById('cheap-shark');

var dealLookupURL = 'https://www.cheapshark.com/api/1.0/games?id=';

var gameid = window.location.search.slice(3);
//console.log("test",window.location.search.slice(3))

var histObj = searchHistoryArray.find(item => item.gameid == gameid);

var gametitle = histObj.title;

var storeReference = JSON.parse(localStorage.getItem('CSharkStoreIDs'))
console.log("Store Info: ", storeReference)

var gameInfoDisplay = document.getElementById("gameInfo")



gameNameDisplay.textContent = gametitle.split('%20').join(' ');


function getGameInfo(dealIDdata) {
    fetch('https://www.cheapshark.com/api/1.0/deals?id=' + dealIDdata.deals[0].dealID)
        .then((response) => response.json())
        .then((data) => {
            var gameInfo = data.gameInfo;
            console.log("Game Info: ", gameInfo)

            if (gameInfo.publisher != "N/A") {
                var publisher = document.createElement('p');
                publisher.textContent = "Publisher: " + gameInfo.publisher;
                gameInfoDisplay.append(publisher)
            }

            // TODO: Release date is provided, but must be formatted from Unix timestamp

            if (gameInfo.steamRatingCount != 0) {
                var steamRating = document.createElement('p');
                steamRating.textContent = "Steam Rating: " + gameInfo.steamRatingText + ", at " + gameInfo.steamRatingPercent + "% with " + gameInfo.steamRatingCount + " votes."
                gameInfoDisplay.append(steamRating)
            }

            if (gameInfo.metacriticScore != 0) {
                var metacriticScore = document.createElement('p');
                metacriticScore.innerHTML = '<a href="https://www.metacritic.com' + gameInfo.metacriticLink + '">Metascore</a>: ' + gameInfo.metacriticScore + '%';
                gameInfoDisplay.append(metacriticScore)
            }

            var gameImage = document.createElement('img');
            gameImage.setAttribute('src', gameInfo.thumb);
            gameInfoDisplay.append(gameImage)
        })
}


function getCheapSharkDeals(gameid) {
    //console.log('Constructed URL: ', dealLookupURL + gameid)
    fetch(dealLookupURL + gameid)
        .then((response) => response.json())
        .then((data) => {
            console.log('CheapShark Sale Data: ', data)
            getGameInfo(data);
            for (let i = 0; i < data.deals.length; i++) {

                // Create list item to contain all info
                var dealListing = document.createElement('li');
                dealListing.classList.add("dealListing")

                // Put the associated dealID in its dataset so that it can be linked later
                dealListing.setAttribute("data-dealurl", "https://www.cheapshark.com/redirect?dealID=" + data.deals[i].dealID)
                var storeObject = storeReference.find(entry => entry.storeID == data.deals[i].storeID)
                // console.log("StoreObject Check: ", storeObject)

                var dealStoreImage = document.createElement('img');
                var imgRef = storeObject.storeID;
                imgRef--;
                dealStoreImage.setAttribute('src', "https://www.cheapshark.com/img/stores/banners/" + imgRef + ".png")
                dealListing.append(dealStoreImage);

                var orgDiv = document.createElement('div');
                dealListing.append(orgDiv);

                var dealStoreName = document.createElement('p');
                dealStoreName.textContent = storeObject.storeName;
                orgDiv.append(dealStoreName)

                var dealPrice = document.createElement('p');
                dealPrice.textContent = "$" + data.deals[i].retailPrice;
                if (data.deals[i].price < data.deals[i].retailPrice) {
                    dealPrice.innerHTML = "<del>" + dealPrice.textContent + "</del> $" + data.deals[i].price
                }
                orgDiv.append(dealPrice)


                results.append(dealListing);
                // TODO: Look at including the "Deal Rating" info from Cheap Shark to, like, color-code or something;
            }

        })
}

getCheapSharkDeals(gameid)


// Home Button
document.getElementById('backButton').addEventListener('click', function () {
    document.location.href = './index.html'
})

document.addEventListener('click', function (event) {
    if (event.target.dataset.dealurl) {
        // console.log("Click!")
        document.location.href = event.target.dataset.dealurl
    }
})