import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const urlParams = new URLSearchParams(search);
  const adventureId = urlParams.get("adventure");

  return adventureId;
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    // Construct the API endpoint using the provided adventureId
    const apiEndpoint = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;

    // Make the API call
    const response = await fetch(apiEndpoint);

    if (response.ok) {
      const adventureDetails = await response.json();
      console.log(adventureDetails);
      return adventureDetails;
    } else {
      // console.error(`Failed to fetch adventure details. Status code: ${response.status}`);
      return null;
    }
  } catch (error) {
    // console.error('An error occurred while fetching adventure details:', error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // Get HTML elements by their IDs
  const adventureNameElement = document.getElementById("adventure-name");
  const adventureSubtitleElement =
    document.getElementById("adventure-subtitle");
  const photoGalleryElement = document.getElementById("photo-gallery");
  const adventureContentElement = document.getElementById("adventure-content");

  // Populate adventure details into the DOM
  adventureNameElement.textContent = adventure.name;
  adventureSubtitleElement.textContent = adventure.subtitle;
  adventureContentElement.textContent = adventure.content;

  // Loop through the images and create div elements for each
  adventure.images.forEach((image) => {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("activity-card-image");

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageDiv.appendChild(imageElement);

    // Insert the image div into the photo gallery
    photoGalleryElement.appendChild(imageDiv);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGalleryElement = document.getElementById("photo-gallery");

  // Create the Bootstrap carousel structure
  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel", "slide");
  carouselContainer.setAttribute("data-bs-ride", "carousel");

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  // Loop through the images and create carousel items
  images.forEach((image, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    // Set the first image as active
    if (index === 0) {
      carouselItem.classList.add("active");
    }

    const imageElement = document.createElement("img");
    imageElement.classList.add("d-block", "w-100"); // Bootstrap class for responsive images
    imageElement.src = image;

    carouselItem.appendChild(imageElement);
    carouselInner.appendChild(carouselItem);
  });

  // Add the carousel-inner to the carousel container
  carouselContainer.appendChild(carouselInner);

  // Add the Bootstrap carousel to the photo-gallery element
  photoGalleryElement.innerHTML = ""; // Clear existing content
  photoGalleryElement.appendChild(carouselContainer);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const isAvailable = adventure.available;

  // 2. If the adventure is available
  if (isAvailable) {
    // Hide the reservation-panel-sold-out panel
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";

    // Show the reservation-panel-available panel
    document.getElementById("reservation-panel-available").style.display =
      "block";

    // Update the appropriate element to show the cost per head using the costPerHead field
    const costPerHeadElement = document.getElementById(
      "reservation-person-cost"
    ); // Adjust the ID accordingly
    if (costPerHeadElement) {
      costPerHeadElement.textContent = `${adventure.costPerHead}`; // Update the content as needed
    }
  } else {
    // 3. If the adventure is not available
    // Hide the reservation-panel-available panel
    document.getElementById("reservation-panel-available").style.display =
      "none";

    // Show the reservation-panel-sold-out panel
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const costPerPerson = adventure.costPerHead;
  const totalCost = costPerPerson * persons;

  const reservationCostElement = document.getElementById("reservation-cost");

  if (reservationCostElement) {
    reservationCostElement.textContent = `${totalCost}`;
  }
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const reservationData = {
      name: formData.get("name"),
      date: formData.get("date"),
      person: formData.get("person"),
      adventure: adventure.id,
    };

    
    const apiEndpoint = `${config.backendEndpoint}/reservations/new`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Reservation Successful!");
        window.location.reload();
      } else {
        alert("Reservation Failed!");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      alert(
        "An error occurred while making the reservation. Please try again."
      );
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById("reserved-banner");

  if (adventure.reserved && reservedBanner) {
    reservedBanner.style.display = "block";
  } else if (reservedBanner) {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
