// In-memory user store (simulates a database)
const users = [];

class User {
  constructor(id, email, passwordHash) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  static findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static findById(id) {
    return users.find(u => u.id === id);
  }

  static create(email, passwordHash) {
    const user = new User(Date.now().toString(), email, passwordHash);
    users.push(user);
    return user;
  }

  static all() {
    return users;
  }
}

module.exports = User;
