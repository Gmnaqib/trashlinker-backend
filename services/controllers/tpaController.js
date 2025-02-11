const tpaRepository = require("../repositories/tpaRepository");

class tpaController {
    async getAllTpa(req, res) {
        try {
            const tpas = await tpaRepository.getAllTpa();
            return res.status(200).json({ message: "Success", data: tpas });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getTpaById(req, res) {
        try {
            const tpa = await tpaRepository.getTpaById(req.params.id);
            if (!tpa) {
                return res.status(404).json({ message: "TPA not found" });
            }
            return res.status(200).json({ message: "Success", data: tpa });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createTpa(req, res) {
        try {
            const { tpa_name, tpa_location, tpa_description } = req.body;
            const tpa_image = req.file ? `/image/${req.file.filename}` : null;

            const newTpa = await tpaRepository.createTpa({ tpa_name, tpa_location, tpa_image, tpa_description });
            return res.status(201).json({ message: "TPA successfully created", data: newTpa });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateTpa(req, res) {
        try {
            const { tpa_name, tpa_location, tpa_description } = req.body;
            const tpa_image = req.file ? `/image/${req.file.filename}` : null;

            const updatedTpa = await tpaRepository.updateTpa(req.params.id, { tpa_name, tpa_location, tpa_image, tpa_description });
            return res.status(200).json({ message: "TPA successfully updated", data: updatedTpa });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteTpa(req, res) {
        try {
            await tpaRepository.deleteTpa(req.params.id);
            return res.status(200).json({ message: "TPA successfully deleted" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = new tpaController();
