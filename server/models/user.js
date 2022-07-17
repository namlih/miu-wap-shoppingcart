
let users = [
    { id: 1, username: 'hasan', password: '111', accessToken: '' },
    { id: 2, username: 'can', password: '222', accessToken: ''}
];


module.exports = class User {

    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }


    login() {
        const userIndex = users.findIndex(s => s.username === this.username && s.password === this.password);
        const user = users[userIndex];

        if (user) {
            this.accessToken = `${user.id}-${user.username}-${Date.now().toString()}`;
            this.id = user.id;
            users.splice(userIndex, 1, this);
            return this;
        }
        else return null;
    }

    static verifyToken(accessToken) {
        return users.find(s => s.accessToken === accessToken);
    }

}