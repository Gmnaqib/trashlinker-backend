class PostVolunteer {
    constructor(id, volunteerId, postId, checkin, createdAt, updatedAt) {
        this.id = id;
        this.volunteerId = volunteerId;
        this.postId = postId;
        this.checkin = checkin;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = PostVolunteer;
