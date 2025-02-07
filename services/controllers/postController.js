const postRepository = require("../repositories/postRepository");

module.exports = {
    addPost: async (req, res) => {
        const { id: userId, role: role } = req.userData;
        let { title, description, type, longitude, latitude, schedule, fullAddress, tpaId } = req.body;

        if (role !== "COMMUNITY" && type == "Volunteer") {
            return res.status(403).json({ message: "You can't create volunteer" });
        }

        const image = req.file ? `/image/${req.file.filename}` : null; // Multer handling image

        try {
            if (type === "Report" || type === "report") {
                schedule = null;
            }
            const newPost = await postRepository.createPost(title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress);
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

    getMyposts: async (req, res) => {
        const { id: userId } = req.userData;
        try {
            const posts = await postRepository.myPostRepository(userId);
            return res.json({ message: "Success", data: posts });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    updatePost: async (req, res) => {
        const { id: postId } = req.params;
        const { title, description, type, longitude, latitude, schedule, fullAddress } = req.body;
        const image = req.file ? `/image/${req.file.filename}` : null;
        console.log(req.body);

        try {
            await postRepository.updatePost(postId, title, description, type, image, longitude, latitude, schedule, fullAddress);
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
    },

    addToVolunteer: async (req, res) => {
        const { id: postId } = req.params;
        const { id: userId } = req.userData;
        const { schedule, type } = req.body;
        console.log(req.params);

        try {
            await postRepository.updateToVolunteer(postId, userId, schedule, type);
            return res.json({ message: "Successfully added to volunteer" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getReportPost: async (req, res) => {
        try {
            const posts = await postRepository.getReportPost();
            return res.json({ message: "Success", data: posts });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
