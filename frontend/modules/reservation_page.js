import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const apiEndpoint = `${config.backendEndpoint}/reservations`;

  try {
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch reservations. Status: ${response.status}`);
    }

    const reservations = await response.json();
    return reservations;
  } catch (error) {
    // console.error("Error fetching reservations:", error);
    return null;
  }

  }

  document.addEventListener('DOMContentLoaded', function () {
    // Assuming 'reservations' is defined somewhere in your code
    addReservationToTable(reservations);
  });
//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    const reservationTable = document.getElementById('reservation-table');
    const noReservationBanner = document.getElementById('no-reservation-banner');
    const reservationTableParent = document.getElementById('reservation-table-parent');
  
    reservationTable.innerHTML = '';
  
    if (reservations.length === 0) {
      noReservationBanner.style.display = 'block';
      reservationTableParent.style.display = 'none';
      return; // No reservations to display
    } else {
      noReservationBanner.style.display = 'none';
      reservationTableParent.style.display = 'block';
    }
  
    reservations.forEach((reservation) => {
      const row = reservationTable.insertRow();
  
      const transactionIdCell = row.insertCell(0);
      transactionIdCell.textContent = reservation.id;
  
      const bookingNameCell = row.insertCell(1);
      bookingNameCell.textContent = reservation.name;
  
      const adventureCell = row.insertCell(2);
      adventureCell.textContent = reservation.adventureName;
  
      const personsCell = row.insertCell(3);
      personsCell.textContent = reservation.person;
  
      const dateCell = row.insertCell(4);
      const formattedDate = new Date(reservation.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      dateCell.textContent = formattedDate;
  
      const priceCell = row.insertCell(5);
      priceCell.textContent = reservation.price;
  
      const bookingTimeCell = row.insertCell(6);
      const formattedTime = formatTime(reservation.time);
      bookingTimeCell.textContent = formattedTime;
  
      const actionCell = row.insertCell(7);
      const visitAdventureButton = document.createElement('button');
      visitAdventureButton.id = reservation.id;
      visitAdventureButton.className = 'reservation-visit-button';
       visitAdventureButton.innerHTML = `<a href="detail/?adventure=${reservation.adventure}">Visit Adventure</a>`
      actionCell.appendChild(visitAdventureButton);
    });
    // "name": "Rahul",
    // "date": "2020-10-26",
    // "person": "02",
    // "adventure": "2447910730",
    // "adventureName": "Niaboytown",
    // "price": 8006,
    // "id": "34b2076696d4e51a",
    // "time": "Sun Oct 25 2020 19:32:12 GMT+0530 (India Standard Time)"
  }
  function formatTime(apiTime) {
    const dateObj = new Date(apiTime);

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    const formatter = new Intl.DateTimeFormat('en-IN', options);
    let formattedTime = formatter.format(dateObj);
    formattedTime = formattedTime.replace(' at', ',');
    return formattedTime;
}
export { fetchReservations, addReservationToTable };
