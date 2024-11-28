export function getCinemasNearby(latitude, longitude, distance) {
    const url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${distance}km)&limit=20`;

    //affichage de l'url de l'api car les cinémas n'étaient pas détéctés
    console.log("URL de la requête API des cinémas :", url);

    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject(new Error("Erreur réseau lors de la récupération des cinémas."));
            }
            return response.json();
        })
        .then(function (data) {
            console.log("Réponse de l'API :", data);

            if (!data.results || data.results.length === 0) {
                return Promise.reject(new Error("Aucun cinéma trouvé pour cette recherche."));
            }

            //ajout de cette ligne manquante car les cinémas n'étaient pas trouvés
            return data.results.map(function (record) {
                return {
                    name: record.nom,
                    address: record.adresse
                };
            });
        })
        .catch(function (error) {
            console.error("Erreur dans la récupération des cinémas :", error); //affichage d'erreur pour me permettre de retrouver l'erreur de récupération de la data dans l'API
            return Promise.reject(new Error("Une erreur est survenue lors de la récupération des cinémas."));
        });
}
