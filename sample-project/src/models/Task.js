// In-memory task store (simulates a database)
const tasks = [];

class Task {
  constructor(id, userId, title, completed = false) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
  }

  static findByUserId(userId) {
    return tasks.filter(t => t.userId === userId);
  }

  static findById(id) {
    return tasks.find(t => t.id === id);
  }

  static create(userId, title) {
    const task = new Task(Date.now().toString(), userId, title);
    tasks.push(task);
    return task;
  }

  static update(id, updates) {
    const task = Task.findById(id);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
  }

  static delete(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}

module.exports = Task;
