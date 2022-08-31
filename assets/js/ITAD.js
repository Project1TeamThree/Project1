//console.log("Hello")
var itadPriceCheck = "https://api.isthereanydeal.com/v01/game/prices/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&plains=";
var itadGameSearch = "https://api.isthereanydeal.com/v02/search/search/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&q=&limit=15";
var itadPriceLow = "https://api.isthereanydeal.com/v01/game/storelow/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&plains=&region=us&country=us";
// var gameName = window.location.search.slice(3);
var searchHistoryITAD = JSON.parse(localStorage.getItem('searchHistory'));
var historyObject = searchHistoryITAD.find(item => item.gameid == window.location.search.slice(3));
var gameName = historyObject.title;
var rList = document.getElementById("ITAD");


function priceData(list){
    fetch(itadPriceCheck + list)

    .then((response) => response.json())
    .then((data) => {
        displayDeals(data)
    })
}

// function displayITAD(data){
//     console.log(data)
//     testdata = data["data"]
//     console.log("test:",testdata);
//     for (x in testdata) {
//         let itadData = testdata[x];
//         console.log("ITAD_TEST",itadData);
//     for (x in itadData){
//         let dataspin = itadData[x];
//         console.log(dataspin);
//     for (x in dataspin) {
//         let datafinal = dataspin[x];
//         console.log("plz:", datafinal);
//         shopName = document.createElement('li');
//         shopName.textContent = datafinal.shop.name;
//         gamePrice = document.createElement('li');
//         gamePrice.textContent = datafinal.price_new;
//         rList.append(shopName)
//         rList.append(gamePrice)
//     }
//     }

//     }

function displayDeals(data) {
    console.log("Game Name: ", gameName)
    console.log("ITAD Data: ", data.data[gameName.toLowerCase()])
    let dealList = data.data[gameName.toLowerCase()].list
    console.log("dealList: ", dealList)
    console.log("length: ", dealList.length)
    for (let i=0; i < dealList.length; i++){

        // Create list item to contain all info
        var dealListing = document.createElement('li');
        dealListing.classList.add("dealListing")

        // Put the associated dealID in its dataset so that it can be linked later
        dealListing.setAttribute("data-dealurl", dealList[i].url)

        // Find the store in the CheapShark shop listings so its banners can be pulled
        var storeObject = storeReference.find(entry => entry.storeName == dealList[i].shop.name)

        if (storeObject == undefined){
            storeObject = {
                storeName: dealList[i].shop.name,
                storeID: false
            }
        }

        var dealStoreImage = document.createElement('img');
        if (storeObject.storeID){
            var imageRef = storeObject.storeID;
            imageRef --;
            dealStoreImage.setAttribute('src', "https://www.cheapshark.com/img/stores/banners/" + imageRef + ".png")
        } else {
            dealStoreImage.setAttribute('src', 'https://via.placeholder.com/50')
        }
        dealListing.append(dealStoreImage);

        var orgDiv = document.createElement('div');
        dealListing.append(orgDiv);

        var dealStoreName = document.createElement('p');
        dealStoreName.textContent = storeObject.storeName;
        orgDiv.append(dealStoreName)

        var dealPrice = document.createElement('p');
        dealPrice.textContent = "$" + dealList[i].price_old;
        if(dealList[i].price_new < dealList[i].price_old){
            dealPrice.innerHTML = "<del>" + dealPrice.textContent + "</del> $" + dealList[i].price_new
        }
        orgDiv.append(dealPrice)


        rList.append(dealListing);
    
    }
}
// var str = 'cult of the the lamb'
// str = str.split(' ').join('');
// str = str.split('the').join('');
// console.log("STR TEST:",str);


// document.getElementById("searchButton").addEventListener('click', function(){
//     gameName = document.getElementById("searchBar").value;

//     gameName = gameName.split(' ').join('');
//     gameName = gameName.split('the').join('');
//     console.log("USERINPUT:",gameName);

//     priceData(gameName)
// })

gameName = gameName.split(' ').join('');
gameName = gameName.split('the').join('');
//console.log("USERINPUT:",gameName);

priceData(gameName)

// document.addEventListener('click', function(event){
//     if (event.target.dataset.dealurl){
//         // console.log("Click!")
//         document.location.href = event.target.dataset.dealurl
//     }
// })