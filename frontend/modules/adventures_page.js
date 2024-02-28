
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);

  // Get the value of the "city" parameter
  const cityId = params.get('city');

  // Return the extracted city id
  return cityId;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const adventuresData = await response.json();
  return adventuresData;
  } catch (error) {
     return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const adventuresContainer = document.getElementById('data'); // Replace with the actual container ID

  adventures.forEach((adventure) => {
    const adventureCard = document.createElement('div');
    adventureCard.classList.add('activity-card');
    const adventureLink = document.createElement('a');
    adventureLink.href = `detail/?adventure=${adventure.id}`; 
    adventureLink.classList.add('adventure-link');
    adventureLink.id = adventure.id; 
    const adventureImage = document.createElement('img');
    adventureImage.src = adventure.image;
    adventureImage.alt = adventure.name;
   const categoryBanner = document.createElement('div');
    categoryBanner.classList.add('category-banner');
    categoryBanner.textContent = adventure.category;
    const adventureDetails = document.createElement('div');
    adventureDetails.classList.add('adventure-details');
    adventureDetails.innerHTML = `
      <h2>${adventure.name}</h2>
      <p>Cost per head: $${adventure.costPerHead}</p>
      <p>Duration: ${adventure.duration} hours</p>
    `;
    adventureLink.appendChild(adventureImage);
    adventureLink.appendChild(categoryBanner);
    adventureLink.appendChild(adventureDetails);
    adventureCard.appendChild(adventureLink);
    adventuresContainer.appendChild(adventureCard);
  });

}

function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adventure => adventure.duration >= low && adventure.duration <= high);
  

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
   if (!filters || Object.keys(filters).length === 0) {
    return list;
  }

  let filteredList = [...list];

  if (filters.duration) {
    const [low, high] = filters.duration.split('-').map(Number);
    filteredList = filterByDuration(filteredList, low, high);
  }

  if (filters.category && filters.category.length > 0) {
    const categoryList = filters.category;
    filteredList = filterByCategory(filteredList, categoryList);
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const storedFilters = localStorage.getItem('filters');
  return storedFilters ? JSON.parse(storedFilters) : null;

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryListElement = document.getElementById("category-list");

  categoryListElement.innerHTML = '';

  if (filters.category && filters.category.length > 0) {
    filters.category.forEach(category => {
      const pillElement = document.createElement("span");
      pillElement.className = "filter-pill";
      pillElement.textContent = category;
      categoryListElement.appendChild(pillElement);
    });
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
