const volunteerRepository = require("../repositories/volunteerRepository");
const response = require("../../utils/response");

class VolunteerController {
    async joinVolunteer(req, res) {
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
    }

    // getVolunteersByPost: async (req, res) => {
    //     try {
    //         const { postId } = req.params;
    //         const volunteers = await volunteerRepository.getVolunteersByPost(postId);
    //         const totalVolunteers = volunteers.length;

    //         res.status(200).json({
    //             totalVolunteers,
    //             volunteers: volunteers.map(v => ({
    //                 postVolunteerId: v.id,
    //                 volunteerId: v.volunteerId,
    //                 postId: v.postId,
    //                 checkin: v.checkin,
    //                 createdAt: v.createdAt,
    //                 updatedAt: v.updatedAt
    //             }))
    //         });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    async getVolunteersByPost(req, res) {
        try {
            const { postId } = req.params;
            const { totalVolunteers, volunteers } = await volunteerRepository.getVolunteersByPost(postId);

            res.status(200).json({
                totalVolunteers,
                volunteers: volunteers.map(v => ({
                    postVolunteerId: v.postVolunteerId, // Fix akses property sesuai yang dikembalikan dari repository
                    volunteerId: v.volunteerId,
                    postId: v.postId,
                    checkin: v.checkin,
                    createdAt: v.createdAt,
                    updatedAt: v.updatedAt
                }))
            });
        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    }


    async getVolunteersByUser(req, res) {
        try {
            const { id: userId } = req.userData;
            const userVolunteers = await volunteerRepository.getVolunteersByUser(userId);
            return response({ res, data: userVolunteers, code: 200, message: "Get My Volunteer Success" })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllVolunteer(req, res) {
        try {
            const volunteers = await volunteerRepository.getAllVolunteer();
            return response({ res, data: volunteers, code: 200, message: "Get All Volunteer Success" })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Untuk Leaderboard
    async getVolunteerLeaderboard(req, res) {
        try {
            const leaderboard = await volunteerRepository.getVolunteerLeaderboard();
            return response({ res, data: leaderboard, code: 200, message: "Get Leaderboard Success" })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Hapus Volunteer
    async deleteVolunteer(req, res) {
        try {
            const { id } = req.params;
            await volunteerRepository.deleteVolunteer(id);
            res.status(200).json({ message: "Volunteer deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateVolunteer(req, res) {
        try {
            const { id } = req.params;
            const { checkin } = req.body;
            await volunteerRepository.updateVolunteer(id, checkin);
            res.status(200).json({ message: "Volunteer updated successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = new VolunteerController();
