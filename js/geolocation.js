export function getUserLocation() {
    return new Promise(function (resolve, reject) {
        if (!navigator.geolocation) {
            reject(new Error("La géolocalisation n'est pas prise en charge par votre navigateur."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log("Position récupérée :", position.coords);
                resolve(position.coords);
            },
            function (error) {
                let message;
              
                //Affichage de message d'erreur pour retrouver l'erreur en rapport avec la self.localisation
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "Vous avez refusé la géolocalisation. Veuillez l'autoriser pour continuer.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = "Impossible de déterminer votre position. Essayez à nouveau.";
                        break;
                    case error.TIMEOUT:
                        message = "La demande de géolocalisation a expiré. Réessayez.";
                        break;
                    default:
                        message = "Une erreur inconnue est survenue.";
                }
                reject(new Error(message));
            }
        );
    });
}
