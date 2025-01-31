const volunteerRepository = require("../repositories/volunteerRepository");

module.exports = {
    joinVolunteer: async (req, res) => {
        const { id: userId } = req.userData;
        const { postId } = req.body;

        try {
            // Menambah volunteer yang bergabung
            const newVolunteer = await volunteerRepository.addVolunteer(userId, postId);
            return res.status(201).json({ message: "Volunteer successfully joined", data: newVolunteer });
        } catch (error) {
            return res.status(500).json({ error: "Server error occurred", details: error.message });
        }
    },

    getVolunteersByPost: async (req, res) => {
        try {
            const { postId } = req.params;
            const volunteers = await volunteerRepository.getVolunteersByPost(postId);
            res.status(200).json(volunteers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVolunteersByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const posts = await volunteerRepository.getVolunteersByUser(userId);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteVolunteer: async (req, res) => {
        try {
            const { volunteerId } = req.params;
            await volunteerRepository.deleteVolunteer(volunteerId);
            res.status(200).json({ message: "Volunteer deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

