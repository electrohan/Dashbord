const fs = require('fs');

// Lire le fichier CSV
fs.readFile('C:\\Dashbord-client\\dashbord\\src\\assets\\Test.pulsonic.csv', 'utf8', (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier:", err);
    return;
  }

  // Remplacer le format de date dans les données
  const modifiedData = data.replace(/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}:\d{2})/g, '$1-$2-$3 $4');

  // Écrire les données modifiées dans un nouveau fichier CSV
  fs.writeFile('C:\\Dashbord-client\\dashbord\\src\\assets\\Test.csv', modifiedData, 'utf8', (err) => {
    if (err) {
      console.error("Erreur lors de l'écriture du fichier:", err);
      return;
    }
    console.log("Les dates ont été modifiées avec succès !");
  });
});
