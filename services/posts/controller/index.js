const PostRepository = require('../repository'); 
const postRepo = new PostRepository();

module.exports = {
  addPost: async (req, res) => {
    const { title, description, image, location, volunteer, schedule, userId, tpaId } = req.body;
    try {
        const newPost = await postRepo.addPostRepository(title, description, image, location, volunteer, schedule, userId, tpaId);
        return res.json({Post: req.body});
    } catch (error) {
        console.error("Error in Salman:", error); 
        return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },
};
