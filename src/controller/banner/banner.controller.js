const { default: mongoose } = require('mongoose');
const Banner = require('../../models/Banner');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// Función para subir una imagen a Cloudinary y guardar el enlace en la base de datos
const uploadImageAndSaveLink = async (req, res) => {
    try {

        if (!req.file) {
            throw new Error('No file uploaded');
        }
        if (!req.body.name) {
            throw new Error('No name provided');
        }

        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Crear un nuevo documento de banner con el enlace de Cloudinary
        const newBanner = new Banner({
            name: req.body.name,
            img: result.secure_url // Guardar el enlace de Cloudinary
        });

        // Guardar el nuevo banner en la base de datos
        const savedBanner = await newBanner.save();

        // Responder con el banner guardado
        res.status(201).json(savedBanner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const putBanner = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).send("No existe imagen con ese ID");
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Formato de ID de banner inválido");
        }

        const updateData = {};

        if (req.body.name) {
            updateData.name = req.body.name;
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updateData.img = result.secure_url;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).send("No se proporcionaron datos para actualizar");
        }

        // Buscar el banner y actualizar los datos
        const updatedBanner = await Banner.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedBanner) {
            return res.status(404).send('Banner no encontrado');
        }

        // Responder con el banner actualizado
        res.status(200).json(updatedBanner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        if (!id) {
            return res.status(404).send("No existe imagen con ese ID");
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Formato de ID de banner inválido");
        }

        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).send("Banner no encontrado");
        }

       

        // Eliminar el documento del banner de la base de datos
        await Banner.findByIdAndDelete(id);

        res.status(200).send("Banner eliminado correctamente");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadImageAndSaveLink,
    getAllBanners,
    putBanner,
    deleteBanner
};
