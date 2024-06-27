import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentification.css'; // Import a CSS file for styling

export default function Authentification() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Implement your authentication logic here
    if (Username  && Password ) {
      console.log(Username,Password)
      try {
        const response = await fetch('http://localhost:3002/api/SuperAdmin/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Username, Password }),
        });
  
        if (response.ok) {
          // La requête a réussi, donc l'utilisateur est authentifié
        const data = await response.json();
        console.log(data);
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('userId',data.superadmin._id)
          navigate('/dashboard'); // Rediriger vers le tableau de bord ou toute autre page
        } else {
          // La requête a échoué, donc les informations d'identification sont incorrectes
          alert('Nom d\'utilisateur ou mot de passe incorrect');
        }
      } catch (error) {
        console.error(error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
      } // Redirect to the dashboard or any other page
    } 
  };

  return (
    <div className='container'>
      <h2>Authentification</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            id='username'
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="nom d'utilisateur"
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            id='password'
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="mot de passe"
          />
        </div>
        <button type='submit'>Se connecter</button>
      </form>
    </div>
  );
}
