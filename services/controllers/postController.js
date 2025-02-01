const postRepository = require("../repositories/postRepository");

module.exports = {
    addPost: async (req, res) => {
        const { id: userId } = req.userData;
        let { title, description, type, longitude, latitude, schedule, tpaId } = req.body;
        const image = req.file ? `/image/${req.file.filename}` : null; // Multer handling image

        try {
            if (type === "Report" || type === "report") {
                schedule = null;
            }
            const newPost = await postRepository.createPost(title, description, type, image, longitude, latitude, userId, tpaId, schedule);
            return res.status(201).json({ message: "Post successfully created", data: newPost });
        } catch (error) {
            return res.status(500).json({ error: "Server error occurred", details: error.message });
        }
    },

    getAllPostsWithinRadius: async (req, res) => {
        try {
            const { latitude: latitude, longitude: longitude } = req.userData;
            const { radius } = req.query;

            if (!latitude || !longitude || !radius) {
                const posts = await postRepository.getAllPosts();
                return res.json({ message: "Success", data: posts });
            }
            // Panggil repository untuk mendapatkan postingan dalam radius
            const posts = await postRepository.getAllPostsWithinRadius(latitude, longitude, parseFloat(radius));
            return res.json({ message: "Success", data: posts });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const posts = await postRepository.getAllPosts();
            return res.json({ message: "Success", data: posts });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    updatePost: async (req, res) => {
        const { id: postId } = req.params;
        const { title, description, type, longitude, latitude, schedule } = req.body;
        const image = req.file ? `/image/${req.file.filename}` : null;

        try {
            await postRepository.updatePost(postId, title, description, type, image, longitude, latitude, schedule);
            return res.json({ message: "Post updated successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deletePost: async (req, res) => {
        const { id: postId } = req.params;

        try {
            await postRepository.deletePost(postId);
            return res.json({ message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
