// In-memory task store (simulates a database)
const tasks = [];

const ALLOWED_UPDATES = ['title', 'completed'];
const TITLE_MIN = 1;
const TITLE_MAX = 200;

class Task {
  constructor(id, userId, title, completed = false) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
  }

  /** Validate and sanitize a task title. Returns an error message string or null. */
  static validateTitle(title) {
    if (typeof title !== 'string') {
      return 'Title must be a string';
    }
    const trimmed = title.trim();
    if (trimmed.length < TITLE_MIN) {
      return 'Title is required';
    }
    if (trimmed.length > TITLE_MAX) {
      return `Title must be at most ${TITLE_MAX} characters`;
    }
    return null; // valid
  }

  /** Return only the fields that are safe to update. */
  static sanitizeUpdates(updates) {
    const safe = {};
    for (const key of ALLOWED_UPDATES) {
      if (key in updates) {
        safe[key] = updates[key];
      }
    }
    return safe;
  }

  static findByUserId(userId) {
    return tasks.filter(t => t.userId === userId);
  }

  static findById(id) {
    return tasks.find(t => t.id === id);
  }

  static create(userId, title) {
    const task = new Task(Date.now().toString(), userId, title.trim());
    tasks.push(task);
    return task;
  }

  static update(id, updates) {
    const task = Task.findById(id);
    if (!task) return null;
    const safe = Task.sanitizeUpdates(updates);
    if (safe.title && typeof safe.title === 'string') {
      safe.title = safe.title.trim();
    }
    Object.assign(task, safe);
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
