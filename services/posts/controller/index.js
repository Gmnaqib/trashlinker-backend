const PostRepository = require("../repository");
const postRepo = new PostRepository();

module.exports = {
  addPost: async (req, res) => {
    const { title, description, longitude, latitude, schedule, userId, tpaId } = req.body;
    const image = req.file ? `/image/${req.file.filename}` : null;

    try {
      const newPost = await postRepo.addPostRepository( title, description, image, longitude, latitude, schedule, userId, tpaId );
      return res.json({ message: "Post successfully created", data: newPost });
    } catch (error) {
      return res.status(500).json({ error: "Server error occurred" });
    }
  },

  joinVolunteer: async (req, res) => {
    const { checkin, userId, postId } = req.body;

    try {
      const newVolunteer = await postRepo.AddVolunteerRepository( checkin, userId, postId );
      return res.json({ message: "Volunteer successfully joined", data: newVolunteer });
    } catch (error) {
      return res.status(500).json({ error: error});
    }
  }
};
