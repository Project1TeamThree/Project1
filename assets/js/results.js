var searchedGameName = window.location.search.slice(3);

var gameNameDisplay = document.getElementById('test-heading');

var searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory'));

var results = document.getElementById('cheap-shark');

var dealLookupURL = 'https://www.cheapshark.com/api/1.0/games?id=';

var gameid = window.location.search.slice(3);
console.log("test",window.location.search.slice(3))

var histObj = searchHistoryArray.find(item => item.gameid == gameid);

var gametitle = histObj.title;

var storeReference = JSON.parse(localStorage.getItem('CSharkStoreIDs'))
console.log("Store Info: ", storeReference)




gameNameDisplay.textContent = searchedGameName.split('%20').join(' ');


function getCheapSharkDeals(gameid){
    console.log('Constructed URL: ', dealLookupURL + gameid)
    fetch(dealLookupURL + gameid)
    .then((response) => response.json())
    .then ((data) => {
        console.log('Sale Data: ', data)
        
        for (let i=0; i < data.deals.length; i++){

            // Create list item to contain all info
            var dealListing = document.createElement('li');
            dealListing.classList.add("dealListing")

            // Put the associated dealID in its dataset so that it can be linked later
            dealListing.setAttribute("data-dealid", data.deals[i].dealID)
            var storeObject = storeReference[data.deals[i].storeID]

            var dealStoreImage = document.createElement('img');
            dealStoreImage.setAttribute('src', "https://www.cheapshark.com/img/stores/banners/" + data.deals[i].storeID + ".png")
            dealListing.append(dealStoreImage);

            var orgDiv = document.createElement('div');
            dealListing.append(orgDiv);

            var dealStoreName = document.createElement('p');
            dealStoreName.textContent = storeObject.storeName;
            orgDiv.append(dealStoreName)

            var dealPrice = document.createElement('p');
            dealPrice.textContent = "$" + data.deals[i].retailPrice;
            if(data.deals[i].price < data.deals[i].retailPrice){
                dealPrice.innerHTML = "<del>" + dealPrice.textContent + "</del> $" + data.deals[i].price
            }
            orgDiv.append(dealPrice)


            results.append(dealListing);
            
        }
        
    })
}

getCheapSharkDeals(gameid)


// Home Button
document.getElementById('backButton').addEventListener('click', function(){
    document.location.href = './index.html'
})

document.addEventListener('click', function(event){
    if (event.target.dataset.dealid){
        // console.log("Click!")
        document.location.href = "https://www.cheapshark.com/redirect?dealID=" + event.target.dataset.dealid
    }
})