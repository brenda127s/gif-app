let apiKey = 'nwALmGW5E83FFH3TGVniydsQSeIYl1ME';
const submitBtn = document.getElementById('submit-btn');
const randomBtn = document.getElementById('random-btn');

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

        if (gifsData.length === 0) {
            //no results found
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.innerText = 'No results found';
            document.querySelector('.wrapper').innerHTML = '';
            document.querySelector('.wrapper').appendChild(errorDiv);
            loader.style.display = 'none';
            document.querySelector('.wrapper').style.display = 'block';
            return;
        }

        gifsData.forEach((gif) => {
            //Generate cards for every gif
            let container = document.createElement('div');
            container.classList.add('container');
            let iframe = document.createElement('img');
            console.log(gif);
            iframe.setAttribute('src', gif.images.downsized_medium.url);
            iframe.onload = () => {
                //if iframe has loaded correctly reduce the count when each gif loads
                gifCount--;
                if (gifCount == 0) {
                    //if all gifs have loaded then hide loader and display gifs UI
                    loader.style.display = 'none';
                    document.querySelector('.wrapper').style.display = 'grid';
                }
            };
            container.appendChild(iframe);

            //Copy link button 
            let copyBtn = document.createElement('button');
            copyBtn.innerText = 'Copy Link';
            copyBtn.onclick = () => {
                let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;

                navigator.clipboard.writeText(copyLink).then(() => {
                    alert('GIF copied to clipboard');
                }).catch(() => {
                    alert('GIF copied to clipboard');
                    //create temporary input
                    let hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'text');
                    document.body.appendChild(hiddenInput);
                    hiddenInput.value = copyLink;
                    hiddenInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(hiddenInput);
                });
            };
            container.appendChild(copyBtn);

            document.querySelector('.wrapper').append(container);
        })
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.innerText = 'Something went wrong. Please try again later.';
        document.querySelector('.wrapper').innerHTML = '';
        document.querySelector('.wrapper').appendChild(errorDiv);
        loader.style.display = 'none';
        document.querySelector('.wrapper').style.display = 'block'; // Ensure wrapper is visible
    });
};

let generateRandomGif = () => {
    let loader = document.querySelector('.loader');
    loader.style.display = 'block';
    document.querySelector('.wrapper').style.display = 'none';

    let gifCount = 1;

    let finalURL = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&limit=${gifCount}&rating=g&lang=en`;
    document.querySelector('.wrapper').innerHTML = '';

    //Fetch random gif
    fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
        console.log(info.data);
        let gifsData = Array.isArray(info.data) ? info.data : [info.data];

        gifsData.forEach((gif) => {
            let container = document.createElement('div');
            container.classList.add('container');
            let iframe = document.createElement('img');
            console.log(gif);
            iframe.setAttribute('src', gif.images.downsized_medium.url);
            iframe.onload = () => {
                //if iframe has loaded correctly reduce the count when each gif loads
                gifCount--;
                if (gifCount == 0) {
                    //if all gifs have loaded then hide loader and display gifs UI
                    loader.style.display = 'none';
                    document.querySelector('.wrapper').style.display = 'grid';
                }
            };
            container.appendChild(iframe);

            //Copy link button 
            let copyBtn = document.createElement('button');
            copyBtn.innerText = 'Copy Link';
            copyBtn.onclick = () => {
                let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;

                navigator.clipboard.writeText(copyLink).then(() => {
                    alert('GIF copied to clipboard');
                }).catch(() => {
                    alert('GIF copied to clipboard');
                    //create temporary input
                    let hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'text');
                    document.body.appendChild(hiddenInput);
                    hiddenInput.value = copyLink;
                    hiddenInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(hiddenInput);
                });
            };
            container.appendChild(copyBtn);

            document.querySelector('.wrapper').append(container);
        })
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.innerText = 'Something went wrong. Please try again later.';
        document.querySelector('.wrapper').innerHTML = '';
        document.querySelector('.wrapper').appendChild(errorDiv);
        loader.style.display = 'none';
        document.querySelector('.wrapper').style.display = 'block'; // Ensure wrapper is visible
    });
};


submitBtn.addEventListener('click', generateGif);
randomBtn.addEventListener('click', generateRandomGif);
window.addEventListener('load', generateGif);
