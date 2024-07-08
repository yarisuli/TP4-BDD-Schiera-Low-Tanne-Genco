import { conn } from "../db.js";

const getCanciones = async (_, res) => {
   
        const [rows, fields] = await conn.query
        (`SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
        FROM canciones 
        JOIN albumes ON canciones.album = albumes.id
        JOIN artistas ON albumes.artista = artistas.id`);
                
        res.json(rows);
};

const getCancion = async (req, res) => {

        const id = req.params.id;
        
        const [rows, fields] = await conn.query
        (`SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones  
        FROM canciones 
        JOIN albumes ON canciones.album = albumes.id
        JOIN artistas ON albumes.artista = artistas.id
        WHERE canciones.id = ?`, [id]);
        
        res.json(rows[0]);
};

const createCancion = async (req, res) => {

    const nombre = req.body.nombre;
    const album = req.body.album;
    const duracion = req.body.duracion;
    
    const [rows, fields] = await conn.query
    ('INSERT INTO canciones (nombre,album,duracion) VALUES (?,?,?)', [nombre, album, duracion]);
     
    res.json({
        nombre: nombre,
        album: album,
        duracion: duracion
        });

};

const updateCancion = async (req, res) => {
   
    const id = req.params.id;
    const nombre = req.body.nombre;
    const album = req.body.album;
    const duracion = req.body.duracion;    
    
    const [rows, fields] = await conn.query
    (`UPDATE canciones SET nombre = ?, album =?, duracion = ?
    WHERE id = ?`, [nombre, album, duracion, id]);
    
    res.json({
        nombre: nombre,
        album: album,
        duracion: duracion
        });
};

const deleteCancion = async (req, res) => {
    const id = req.params.id;
    
    const [rows, fields] = await conn.query
    (`DELETE FROM canciones WHERE id = ?`, [id]);
    
    res.send("Se eliminó correctamente.");
};

const reproducirCancion = async (req, res) => {
    const id = req.params.id;  
    
    const [rows, fields] = await conn.query
    (`UPDATE canciones SET reproducciones = reproducciones + 1
    WHERE id = ?`, [id]);
    
    res.send("Se actualizó correctamente.");
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;
