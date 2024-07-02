import express from "express";
const app = express();
const port = 3000;

import artistas from "./controllers/artistas.js";
import albumes from "./controllers/albumes.js";
import canciones from "./controllers/canciones.js";

app.use(express.json());

app.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});

/* ------------------- Rutas ------------------- */

// Artistas
// Completar con las rutas de artistas

app.get("/artistas", artistas.getArtistas);
app.get("/artistas/:id", artistas.getArtista);
app.post("/artistas",artistas.createArtista);
app.put("/artistas/:id",artistas.updateArtista);
app.delete("/artistas/:id",artistas.deleteArtista);
app.get("/artistas/:id/canciones",artistas.getCancionesByArtista);
app.get("/artistas/:id/albumes",artistas.getAlbumesByArtista);

// Albumes
// Completar con las rutas de albumes

app.get("/albumes",albumes.getAlbumes);
app.get("/albumes/:id",albumes.getAlbum);
app.post(`/albumes`,albumes.createAlbum);
app.put("/albumes/:id",albumes.updateAlbum);
app.delete("/albumes/:id",albumes.deleteAlbum);
app.get("/albumes/:id/canciones",albumes.getCancionesByAlbum);

// Canciones
// Completar con las rutas de canciones


app.get("/canciones",canciones.getCanciones);
app.get("/canciones/:id",canciones.getCancion);
app.post("/canciones",canciones.createCancion);
app.put("/canciones/:id",canciones.updateCancion);
app.delete("/canciones/:id",canciones.deleteCancion);
app.put("/canciones/:id/reproducir",canciones.reproducirCancion);


app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});
