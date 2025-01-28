class User {
    constructor(email, username, password, address, longitude, latitude, role) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.role = role;
    }
}

module.exports = User;
