class Volunteer {
    constructor(id, checkin, userId, postId, createdAt, updatedAt) {
        this.id = id;
        this.checkin = checkin;
        this.userId = userId;
        this.postId = postId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Volunteer;
