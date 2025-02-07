class Post {
    constructor(id, title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.image = image;
        this.longitude = longitude;
        this.latitude = latitude;
        this.userId = userId;
        this.tpaId = tpaId;
        this.schedule = schedule;
        this.fullAddress = fullAddress;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Post;
