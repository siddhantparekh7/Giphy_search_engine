var offset = 0;
//Input
document.querySelector(`.Go`).addEventListener(`click`,function(){
    
    let input = document.querySelector(`input`).value;
    input.value = '';
        document.querySelector(`.js-container`).innerHTML = '';
        apiCall(input);
})
    
//Good stuff happening


document.querySelector(`.js-userinput`).addEventListener(`keyup`,function(e){    
    let input = document.querySelector(`input`).value;
    
    //if ENTER key is pressed then execute
    //'e' is the event 
    //'13' is key code
    if(e.which === 13) {
        input.value = '';
        document.querySelector(`.js-container`).innerHTML = '';
        apiCall(input,0)
    }
})



function next(){
    offset += 5;
    let input = document.querySelector(`input`).value;
    console.log(input);
    console.log(offset);
    apiCall(input,offset)
}

function previous(){
    offset -= 5;
    let input = document.querySelector(`input`).value;
    apiCall(input,offset)
}

function apiCall(input,offset){
//URL is generated
    var url = url_generator(input,offset)

// AJAX Request
var GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

GiphyAJAXCall.addEventListener('load',function(e){

  var data = e.target.response;
  output(data);

});
}

function url_generator(query,offset){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=KWuH4hlpsrCfdOQnsRiujpXYksIryXxn&q=${query}&limit=12&offset=${offset}&rating=g&lang=en`;
    return url;
}

//Output
function output(input){
    document.querySelector(`.js-container`).innerHTML = "";
    var container = document.querySelector(`.js-container`);
    let response = JSON.parse(input);

    response.data.forEach(e => {
        let imgEl = document.createElement('img')
        imgEl.width=200;
        imgEl.height=200;
        imgEl.hspace=10;
        imgEl.vspace=10;

        imgEl.src = e.images.downsized.url;
        container.appendChild(imgEl)
    })
}
