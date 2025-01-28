const volunteerRepository = require("../repositories/volunteerRepository");

class VolunteerController {
    async registerVolunteer(req, res) {
        try {
            const { userId, postId } = req.body;
            if (!userId || !postId) {
                return res.status(400).json({ message: "userId and postId are required" });
            }

            const volunteer = await volunteerRepository.addVolunteer(userId, postId);
            res.status(201).json(volunteer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getVolunteersByPost(req, res) {
        try {
            const { postId } = req.params;
            const volunteers = await volunteerRepository.getVolunteersByPost(postId);
            res.status(200).json(volunteers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getVolunteersByUser(req, res) {
        try {
            const { userId } = req.params;
            const posts = await volunteerRepository.getVolunteersByUser(userId);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteVolunteer(req, res) {
        try {
            const { volunteerId } = req.params;
            await volunteerRepository.deleteVolunteer(volunteerId);
            res.status(200).json({ message: "Volunteer deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new VolunteerController();
