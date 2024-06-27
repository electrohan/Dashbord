import "./Dashbord.css";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import Bouton from "../Bouton/Bouton";
import Graph from "../Graph/Graph";
import Station from "../Station/Station";
import Avis from "../Avis/Avis";
import Previ from "../Previ/Previ";
import "leaflet/dist/leaflet.css";
import Constante from "../Constante/Constante";
import Rain from "../Graph/Rain";
import SolarRadiation from "../Graph/SolarRadiation";
import DirectVent from "../Graph/DirectVent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faCloudMoon,
  faUserTie,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import WindSpeed from "../Graph/WindSpeed";
export default function Dashbord() {
  const [selectedCity, setSelectedCity] = useState("Ville");
  const [currentDate, setCurrentDate] = useState("");
  const [avis,setAvis] = useState("");
  const UserId = localStorage.getItem("userId");
  const [avisPosted, setAvisPosted] = useState(false);
  const [avisError, setAvisError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCityChange = (city) => {
    console.log("handleCityChange called with:", city);
    setSelectedCity(city);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);

  };
  const handlePostAvis = async() => {
    if(avis){
      console.log(UserId);
      const uppercaseEndpoint = selectedCity.toUpperCase();
      try{
        const postavis = await fetch('http://localhost:3002/api/Avis/post' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({texte:avis , AddedById:UserId , onModel:'SUPERADMIN',station:uppercaseEndpoint})
        })
        if(postavis.ok){
          console.log("avis posté avec succes")
          setAvisPosted(true);
          setAvisError(false);
          setAvis('');
        }else{
          console.log("erreur lors de l'emission de l'avis")
          setAvisPosted(false);
          setAvisError(true);
        }
      }catch(error){
        console.error(error);
        console.log("une erreur c'est produit lors de l'execution de la requetes")
        setAvisPosted(false);
        setAvisError(true);
      }
    }
  }
  useEffect(() => {
    if (selectedCity !== "Ville") {
      try {
        console.log("Ville sélectionnée:", selectedCity);
        // Ajoutez ici toute autre action que vous souhaitez exécuter lorsque la ville change
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  }, [selectedCity]);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);
  return (
    <div className="App">
      <div className="NavBar">
        <div className="NavHead">
          <div className="LogoSodexam">
            <img src={Logo} alt="Logo" className="logo" />
          </div>
          <div className="Titre">
            <p>Centre de surveillance météorologique</p>
          </div>
          <div className="Nav_Links">
            <Bouton onCityChange={handleCityChange} />
          </div>
        </div>

        <div className="User-Actions">
          <div className="Actions-previ">
            <button className="ActionsButton" onClick={handleOpenModal}>
              <FontAwesomeIcon
                icon={faNewspaper}
                size="3xs"
                style={{ color: "#ffffff" }}
              />
            </button>
            <button className="ActionsButton">
              <FontAwesomeIcon
                icon={faCloudMoon}
                size="3xs"
                style={{ color: "#ffffff" }}
              />
            </button>
            <button className="ActionsButton">
              <FontAwesomeIcon
                icon={faUserTie}
                size="3xs"
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Ajouter un avis"
          >
            <h1>AJOUTER UN AVIS </h1>
            <form>
              <textarea
                id="avis"
                name="avis"
                rows="20"
                cols="75"
                required
                value={avis}
                onChange={(e) => setAvis(e.target.value)}
              ></textarea>
              <button type="button" onClick={handlePostAvis}>Envoyer</button>
            </form>
            {avisPosted && <p>Avis posté avec succès !</p>}
            {avisError && <p>Erreur lors de l'émission de l'avis</p>}
          </Modal>
          <button className="log-out">
            Deconnexion{" "}
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="3xs"
              style={{ color: "#ffffff" }}
            />
          </button>
        </div>
      </div>
      <div className="dashbord">
        <div className="dashbord-info">
          <div className="dashbord-text">
            <h1>Tableaux de bord</h1>
            <h3>{currentDate}</h3>
          </div>
        </div>
        <div className="meteo-dashbord">
          <Constante selectedCity={selectedCity}></Constante>
          <div className="graph">
            <Graph selectedCity={selectedCity}></Graph>
            <Rain selectedCity={selectedCity}></Rain>
          </div>
          <div className="graph">
            <SolarRadiation selectedCity={selectedCity}></SolarRadiation>
            <WindSpeed selectedCity={selectedCity}></WindSpeed>
          </div>
        </div>
      </div>
      <div className="Informations">
        <div className="InfoUtile-Previ">
          <Station></Station>
          <Avis selectedCity={selectedCity}></Avis>
        </div>
        <div className="PrevisionMeteo">
          <Previ></Previ>
        </div>
      </div>
    </div>
  );
}
