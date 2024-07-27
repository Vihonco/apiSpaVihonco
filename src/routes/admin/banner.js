const express = require('express');
const uploadMiddleware = require('../../middleware/uploadMiddleware'); // Importar correctamente el middleware
const { uploadImageAndSaveLink, getAllBanners, putBanner, deleteBanner } = require('../../controller/banner/banner.controller');

const router = express.Router();

// Ruta para subir una imagen
router.post('/upload/img', uploadMiddleware.single('image'), uploadImageAndSaveLink);
router.get('/allBanner', getAllBanners);
router.put('/:id',uploadMiddleware.single('image'),putBanner)
router.delete('/delete/:id', deleteBanner);

module.exports = router;
