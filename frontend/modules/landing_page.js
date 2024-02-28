import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`)
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
   
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const citiesContainer = document.getElementById('data');

  const cityCard = document.createElement('div');
  cityCard.classList.add('card', 'm-3', 'text-white', 'bg-dark', 'col-lg-2', 'col-md-6', 'col-sm-12');
 
  const cityImage = document.createElement('img');
  cityImage.src = image;
  cityImage.alt = city;
  cityImage.classList.add('card-img-top'); 

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cityName = document.createElement('h5');
  cityName.classList.add('card-title');
  cityName.textContent = city;

  const cityDescription = document.createElement('p');
  cityDescription.classList.add('card-text');
  cityDescription.textContent = description;

  const cityLink = document.createElement('a');
  cityLink.href = `pages/adventures/?city=${id}`;
  cityLink.id = id; 
 cardBody.appendChild(cityName);
  cardBody.appendChild(cityDescription);
  cityCard.appendChild(cityImage);
  cityCard.appendChild(cardBody);
  cityLink.appendChild(cityCard);

  cityLink.addEventListener('click', function() {
    window.location.href = cityLink.href;
  });

  citiesContainer.appendChild(cityLink);
}

export { init, fetchCities, addCityToDOM };
