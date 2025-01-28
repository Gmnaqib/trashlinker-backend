const postRepository = require("../repositories/postRepository");
const volunteerRepository = require("../repositories/volunteerRepository");

module.exports = {
    addPost: async (req, res) => {
        const { id: userId } = req.userData;
        const { title, description, longitude, latitude, schedule, tpaId } = req.body;
        const image = req.file ? `/image/${req.file.filename}` : null; // Multer handling image

        try {
            // Menyimpan post baru menggunakan repository
            const newPost = await postRepository.createPost(title, description, 'Volunteer', image, longitude, latitude, userId, tpaId, schedule);
            return res.status(201).json({ message: "Post successfully created", data: newPost });
        } catch (error) {
            return res.status(500).json({ error: "Server error occurred", details: error.message });
        }
    },

    joinVolunteer: async (req, res) => {
        const { id: userId } = req.userData;
        const { checkin, postId } = req.body;

        try {
            // Menambah volunteer yang bergabung
            const newVolunteer = await volunteerRepository.addVolunteer(userId, postId);
            return res.status(201).json({ message: "Volunteer successfully joined", data: newVolunteer });
        } catch (error) {
            return res.status(500).json({ error: "Server error occurred", details: error.message });
        }
    }
};
