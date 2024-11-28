import { getUserLocation } from './geolocation.js';
import { getCoordsFromAddress, getAddressFromCoords} from './adressApi.js';
import { getCinemasNearby } from './cinemaApi.js';

document.querySelector('#cinema-search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const addressInput = document.querySelector('#address').value;
    const distance = document.querySelector('#distance').value;

    if (!addressInput) {
        alert("Veuillez entrer une adresse ou activer la géolocalisation.");
        return;
    }

    getCoordsFromAddress(addressInput)
        .then(function (coords) {
            console.log("Coordonnées obtenues :", coords);
            return searchCinemas(coords.latitude, coords.longitude, distance);
        })
        .catch(function (error) {
            alert(error.message);
        });
});


function searchCinemas(latitude, longitude, distance) {
    return getCinemasNearby(latitude, longitude, distance)
        .then(function (cinemas) {
            const cinemaList = document.querySelector('#cinema-list');
            cinemaList.innerHTML = '';

            cinemas.forEach(function (cinema) {
                const li = document.createElement('li');
                li.textContent = `${cinema.name} - ${cinema.address}`;
                cinemaList.appendChild(li);
            });
        })
        .catch(function (error) {
            alert(error.message);
        });
}

document.querySelector('#geolocation-button').addEventListener('click', function () {
    getUserLocation()
        .then(function (coords) {
            console.log("Coordonnées récupérées :", coords);
            return getAddressFromCoords(coords.latitude, coords.longitude);
        })
        .then(function (address) {
            console.log("Adresse trouvée :", address);
            document.querySelector('#address').value = address;
        })
        .catch(function (error) {
            alert(error.message);
        });
});


document.querySelector('#distance').addEventListener('input', function () {
    const distanceValue = document.querySelector('#distance').value;
    document.querySelector('#distance-value').textContent = `${distanceValue} km`;
});
