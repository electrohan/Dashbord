const fetchAirTemp = async (endpoint) => {
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/AirTemptoday/${uppercaseEndpoint}`);
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
        const response = await fetch(`http://localhost:3002/api/raintoday/${uppercaseEndpoint}`);
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
        const response = await fetch(`http://localhost:3002/api/SoloRadiationByDay/${uppercaseEndpoint}`);
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
const fetchWindSpeed = async (endpoint) =>{
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/wind-speed/${uppercaseEndpoint}`);
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

const fetchLastWindir =async(endpoint) => {
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/last-windir/${uppercaseEndpoint}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

const fetchLastAirTemp =async(endpoint) =>{
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/last-airtemp/${uppercaseEndpoint}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

const fetchLastSolarRadiation =async (endpoint) =>{
    try {
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/last-solar-radiation/${uppercaseEndpoint}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

module.exports = { fetchAirTemp , fetchRain ,fetchSolar , fetchWinDir,fetchWindSpeed,fetchLastWindir,fetchLastAirTemp,fetchLastSolarRadiation};