const fetchAvis = async (endpoint) =>{
    try{
        const uppercaseEndpoint = endpoint.toUpperCase();
        const response = await fetch(`http://localhost:3002/api/Avis/getlast/${uppercaseEndpoint}`);
        if(response.ok){
            const data= response.json();
            return data;
        }else{
            const data=[];
            return data;
        }
    }catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}

module.exports ={fetchAvis}