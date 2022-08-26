var requestUrl = "https://api.isthereanydeal.com/v01/game/prices/?pretty&key=2afc79d7442b1d5fd726834b16f3974d9bb17def&plains=";
var requestUrl2 = "https://api.isthereanydeal.com/v02/game/plain/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&title="
var requestUrl3 = "https://api.isthereanydeal.com/v01/game/plain/list/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&shops=";
var gameName
var rList = document.getElementById("ITAD")
function priceData(list){
    fetch(requestUrl + list)
    .then((response) => response.json())
    .then((data) => {
        displayITAD(data)
    })
}

function displayITAD(data){
    console.log(data)
    testdata = data["data"]
    console.log("test:",testdata);
    for (x in testdata) {
        let itadData = testdata[x];
        console.log("ITAD_TEST",itadData);
    for (x in itadData){
        let dataspin = itadData[x];
        console.log(dataspin);
    for (x in dataspin) {
        let datafinal = dataspin[x];
        console.log("plz:", datafinal);
        shopName = document.createElement('li');
        shopName.textContent = datafinal.shop.name;
        gamePrice = document.createElement('li');
        gamePrice.textContent = datafinal.price_new;
        rList.append(shopName)
        rList.append(gamePrice)
    }
    }

    }
    // for (let i = 0; i < data.length; i++) {
    //     var List = document.createElement('li');
    //     List.textContent = data[i];
    //     rList.append(List);
    // }
    
}

var str = 'cult of the the lamb'
str = str.split(' ').join('');
str = str.split('the').join('');
console.log("STR TEST:",str);


document.getElementById("searchButton").addEventListener('click', function(){
    gameName = document.getElementById("searchBar").value;
    gameName = gameName.split(' ').join('');
    gameName = gameName.split('the').join('');
    console.log("USERINPUT:",gameName);
    priceData(gameName)
})