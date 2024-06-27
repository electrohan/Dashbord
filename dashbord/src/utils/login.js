const loginAdmin = async () =>{
    try{
        const response = await fetch("http://localhost:3002/api/SuperAdmin/login/")
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
    }catch(error){

    }
}