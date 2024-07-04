import { conn } from "../db.js";

const getArtistas = async (_, res) => {
    
    const [rows, fields] = await conn.query
    ('SELECT * FROM artistas');
    
    res.json(rows);
};

const getArtista = async (req, res) => {
    
    const id = req.params.id;
    
    const [rows, fields] = await conn.query
    ('SELECT id, nombre FROM artistas WHERE id = ?',[id]);
    
    res.json(rows[0]);
};

const createArtista = async (req, res) => {

    const nombre = req.body.nombre;
        
    const [rows, fields] = await conn.query
    ('INSERT INTO artistas (nombre) VALUES (?)',[nombre]);
        
    res.json({
        nombre: nombre
        });
};

const updateArtista = async (req, res) => {

    const id = req.params.id;
    const nombre = req.body.nombre;
    
    const [rows, fields] = await conn.query
    (`UPDATE artistas SET nombre = ? WHERE id = ?`,[nombre, id]);
    
    res.json({
        nombre: nombre
        });
};

const deleteArtista = async (req, res) => {
    
    const id = req.params.id;
        
    const [rows, fields] = await conn.query
    (`DELETE FROM artistas WHERE id = ?`,[id]);
    
    res.send("Se eliminó correctamente.");
};

const getAlbumesByArtista = async (req, res) => {

    const id = req.params.id;
    
    const [rows, fields] = await conn.query
    (`SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista 
    FROM albumes 
    JOIN artistas ON artistas.id=albumes.artista
    WHERE artistas.id= ?`,[id]);
    
    res.json(rows[0]);
};

const getCancionesByArtista = async (req, res) => {
    
    const id = req.params.id;
    
    const [rows, fields] = await conn.query(`
    SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
    from canciones 
    JOIN albumes ON canciones.album = albumes.id
    JOIN artistas ON albumes.artista = artistas.id
    WHERE artistas.id = ?`,[id]); 
    
    res.json(rows); 
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
