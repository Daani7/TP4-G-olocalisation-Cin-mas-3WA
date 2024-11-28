export function getAddressFromCoords(latitude, longitude) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => data.features[0].properties.label);
}

export function getCoordsFromAddress(address) {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`;

    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.features.length === 0) {
                return Promise.reject(new Error("Adresse non trouvée."));
            }
            const coords = data.features[0].geometry.coordinates;
            return { latitude: coords[1], longitude: coords[0] };
        });
}
