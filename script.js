let apiKey = 'nwALmGW5E83FFH3TGVniydsQSeIYl1ME';
const submitBtn = document.getElementById('submit-btn');

let generateGif = () => {
    let loader = document.querySelector('.loader');
    loader.style.display = 'block';
    document.querySelector('.wrapper').style.display = 'none';

    //Get default value (default => laugh)
    let q = document.getElementById('search-box').value;
    //We need 10 gif to be displayed in result
    let gifCount = 10;

    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector('.wrapper').innerHTML = '';

    //Make a call to API
    fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
        console.log(info.data);
        //All gifs
        let gifsData = info.data;
        gifsData.forEach((gif) => {
            //Generate cards for every gif
            let container = document.createElement('div');
            container.classList.add('container');
            let iframe = document.createElement('img');
            console.log(gif);
        })
    });
};

submitBtn.addEventListener('click', generateGif);
window.addEventListener('load', generateGif);




// const img = document.querySelector('img');




// fetch('https://api.giphy.com/v1/gifs/translate?api_key=qcLC7YHYga67Ii3DB3IeWbt4KoJ4YEuL&s=cats', {mode: 'cors'})
// .then(function(response) {
//     return response.json();
//     // console.log(response.json());
// })
// .then(function(response) {
//     // console.log(response.data.images.original.url);
//     img.src = response.data.images.original.url;
// });