const fetchAirTemp = async (endpoint) => {
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/AirTemp/${uppercaseEndpoint}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

const fetchRain = async (endpoint) => {
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/Rain/${uppercaseEndpoint}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

const fetchSolar=async (endpoint) => {
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/SoloRadiation/${uppercaseEndpoint}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

const fetchWinDir = async (endpoint) => {
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/WinDir/${uppercaseEndpoint}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}
module.exports = { fetchAirTemp , fetchRain ,fetchSolar , fetchWinDir};