import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { profile } from "../../services/LoginSignup/loginSignup"; // Importez la fonction profile depuis votre fichier de services

function Profile() {
    const { username } = useParams(); // Obtenez le nom d'utilisateur à partir des paramètres d'URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Appel de la fonction profile pour récupérer les informations du profil de l'utilisateur
        const fetchData = async () => {
            try {
                const userData = await profile({ username });
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // Gérer les erreurs ici
            }
        };

        fetchData(); // Exécutez la fonction fetchData au chargement du composant
    }, [username]); // Utilisez le nom d'utilisateur comme dépendance pour l'appel API

    if (!user) {
        // Affichez un message de chargement ou une indication de chargement ici
        return <div>Loading...</div>;
    }

    // Si les informations de l'utilisateur existent, affichez les détails du profil
    return (
        <div>
            <h1>Bienvenue sur ton profil, {user.username} !</h1>
            <p>Nom : {user.nom}</p>
            <p>Prénom : {user.prenom}</p>
            {/* Afficher d'autres informations de profil ici */}
        </div>
    );
}

export default Profile;
