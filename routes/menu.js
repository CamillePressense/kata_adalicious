const express = require('express');
const router = express.Router();
const sql = require('../db'); // importe la connexion

// Route /menu _ Méthode GET Affiche le menu

router.get('/', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM plates`;
    res.json(result); 
  } catch (err) {
    console.error('Erreur lors de la récupération des plats :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

