const apiKey = "MLGTlMdtowfcga5NFs_5qxHYCzd4JWW4L41LTw3SlIs";

//Define elements
const searchInput = document.getElementById('search-input');
const searchButton = document.querySelector('.btn-search');
const imageContainer = document.querySelector('.image-container');
const showMoreButton = document.querySelector('.btn-show-more');
const formEl = document.querySelector('form');
let query;
let page = 1;

// Add Event Listner
searchButton.addEventListener("click", (event) => {
    //Get the user's search query
    event.preventDefault();
    page = 1;
    query = searchInput.value;
    fetchImages(query);
});

showMoreButton.addEventListener('click', () => {
    fetchImages(query);
    
});

//Fetch Images Function
async function fetchImages(query) {
    const perPage = 12;
    const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if(page === 1){
        imageContainer.innerHTML = '';

    }
    const results = data.results;

    displayImages(results);
    page++;

    if(page > 1){
        showMoreButton.style.display = 'block';
    }
    
    
}

//Display Image Function
async function displayImages(images){
    
    images.map(image => {

        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        const imageElement = document.createElement('img');
        imageElement.src = image.urls.raw;
        imageElement.alt = image.alt_description;
        imageElement.loading = 'lazy';

        const linkDiv = document.createElement('div');
        linkDiv.classList.add('image-link');
        const imageLink = document.createElement('a');
        imageLink.href= image.links.html;
        imageLink.target = '_blank';
        imageLink.rel = 'noopener noreference';
        imageLink.innerText = image.alt_description;

        imageDiv.appendChild(imageElement);
        linkDiv.appendChild(imageLink);
        imageCard.appendChild(imageDiv);
        imageCard.appendChild(linkDiv);
        imageContainer.appendChild(imageCard);
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        // Trigger the click event of the search button
        searchButton.click();
      }
});

// Infinite Scrolling
// window.addEventListener('scroll', () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     if (scrollTop + clientHeight >= scrollHeight - 5) {
//         // Load more images when the user is near the bottom
//         fetchImages(query);
//     }
// });



