const express = require('express');
const router = express.Router();
const sql = require('../db'); 

// Route /order _ Méthode GET Affiche toutes les commandes

router.get('/', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM orders`;
        res.json(result); 
    } catch (err) {
        console.error('Erreur lors de la récupération des commandes :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

//Route /order _ Méthode POST pour créer une commande

router.post('/', async (req, res) => {

    const { client_firstname, plate_id } = req.body;
    
    if (!client_firstname || !plate_id) {
        return res.status(400).json({ error: 'le prénom du client et le plat sont requis' });
    }

    try {
        const result = await sql`
            INSERT INTO orders (client_firstname, plate_id)
            VALUES (${client_firstname}, ${plate_id})
            RETURNING *;
        `;
        res.status(201).json(result[0]); // renvoie la commande créée
    } catch (err) {
        console.error('Erreur lors de la création de la commande :', err);
        res.status(500).json({ error: 'Erreur serveur lors de la création de la commande' });
    }
});


module.exports = router;

