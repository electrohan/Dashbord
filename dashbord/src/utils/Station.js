const fetchStation = async () =>{
    try{
        const response = await fetch(`http://localhost:3002/api/stations`)
        const data=response.json();
        return data;
    }catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}

module.exports={fetchStation}