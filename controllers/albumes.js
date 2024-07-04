import { conn } from "../db.js";

const getAlbumes = async (_, res) => {

    const [rows, fields] = await conn.query 
    (`SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes
    JOIN artistas on artistas.id = albumes.artista`);
    
    res.json(rows);
};

const getAlbum = async (req, res) => {
    
    const id = req.params.id;
    
    const [rows, fields] = await conn.query 
    (`SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes
    JOIN artistas on artistas.id = albumes.artista
    WHERE albumes.id = ?`,[id]);
    
    res.json(rows[0]); 
};

const createAlbum = async (req, res) => {
    
    const nombre = req.body.nombre;
    const artista = req.body.artista;
    
    const [rows, fields] = await conn.query
    ('INSERT INTO albumes (nombre,artista) VALUES (?,?)',[nombre,artista]);
    
    res.json({
        nombre: nombre,
        artista: artista
        });
};

const updateAlbum = async (req, res) => {
    
    const id = req.params.id;
    const nombre = req.body.nombre;
    const artista = req.body.artista;
    
    const [rows, fields] = await conn.query
    (`UPDATE albumes SET nombre = ?, artista = ?
    WHERE id = ?`,[nombre,artista,id]);
    
    res.json({
        nombre: nombre,
        artista: artista
      });
};

const deleteAlbum = async (req, res) => {
    const id = req.params.id;
    
    const [rows, fields] = await conn.query
    (`DELETE FROM albumes WHERE id = ?`,[id]);
    
    res.send("Se eliminó correctamente.");
};

const getCancionesByAlbum = async (req, res) => {
    
    const id = req.params.id;
    
    const [rows, fields] = await conn.query(`
        SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
        FROM canciones
        JOIN albumes on canciones.album = albumes.id
        JOIN artistas on albumes.artista = artistas.id
        WHERE albumes.id = ?`, [id]);
        
        res.json(rows);
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
