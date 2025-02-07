const volunteerRepository = require("../repositories/volunteerRepository");

module.exports = {
    joinVolunteer: async (req, res) => {
        const { id: userId } = req.userData;
        const { postId } = req.body;

        try {
            const newPostVolunteer = await volunteerRepository.addVolunteer(userId, postId);
            return res.status(201).json({
                message: "Volunteer successfully joined",
                data: {
                    id: newPostVolunteer.id,
                    volunteerId: newPostVolunteer.volunteerId,
                    postId: newPostVolunteer.postId,
                    checkin: newPostVolunteer.checkin,
                    createdAt: newPostVolunteer.createdAt,
                    updatedAt: newPostVolunteer.updatedAt
                }
            });
        } catch (error) {
            return res.status(500).json({ error: "Server error occurred", details: error.message });
        }
    },

    getVolunteersByPost: async (req, res) => {
        try {
            const { postId } = req.params;
            const volunteers = await volunteerRepository.getVolunteersByPost(postId);
            const totalVolunteers = volunteers.length;

            res.status(200).json({
                totalVolunteers,
                volunteers: volunteers.map(v => ({
                    postVolunteerId: v.id,
                    volunteerId: v.volunteerId,
                    postId: v.postId,
                    checkin: v.checkin,
                    createdAt: v.createdAt,
                    updatedAt: v.updatedAt
                }))
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVolunteersByUser: async (req, res) => {
        try {
            const { id: userId } = req.userData;
            const userVolunteers = await volunteerRepository.getVolunteersByUser(userId);

            res.status(200).json({
                totalPosts: userVolunteers.length,
                data: userVolunteers.map(v => ({
                    postVolunteerId: v.id,
                    volunteerId: v.volunteerId,
                    postId: v.postId,
                    checkin: v.checkin,
                    createdAt: v.createdAt,
                    updatedAt: v.updatedAt
                }))
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllVolunteer: async (req, res) => {
        try {
            const volunteers = await volunteerRepository.getAllVolunteer();
            res.status(200).json({
                totalVolunteers: volunteers.length,
                volunteers: volunteers.map(v => ({
                    id: v.id,
                    userId: v.userId,
                    createdAt: v.createdAt,
                    updatedAt: v.updatedAt
                }))
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVolunteerLeaderboard: async (req, res) => {
        try {
            const leaderboard = await volunteerRepository.getVolunteerLeaderboard();
            res.status(200).json({ leaderboard });
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
    },

    updateVolunteer: async (req, res) => {
        try {
            const { volunteerId } = req.params;
            const { checkin } = req.body;
            await volunteerRepository.updateVolunteer(volunteerId, checkin);
            res.status(200).json({ message: "Volunteer updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
