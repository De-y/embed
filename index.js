const express = require('express');
const app = express();
const port = 3001;

function escape(s) {
    let lookup = {
        '&': "&amp;",
        '"': "&quot;",
        '\'': "&apos;",
        '<': "&lt;",
        '>': "&gt;"
    };
    return s.replace( /[&"'<>]/g, c => lookup[c] );
}

app.get('/', (req, res) => {
  // Récupérer les paramètres og:title, og:description, og:image à partir de req.query
  const { title, color, image } = req.query;

  // Créer la page HTML avec les balises meta modulables
  const html = `
    <html>
      <head>
        <meta property="og:description" content="${escape(decodeURIComponent(title || '[This embed is empty]'))}">
        <meta property="og:image" content="${escape(image || 'URL_de_l_image_par_défaut')}">
        <meta name="theme-color" content="${"#"+escape(color || '#FFD700')}">
        <meta property="og:image:height" content="600">
        <meta property="og:image:width" content="1200">
      </head>
      <body>
    </html>
  `;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
