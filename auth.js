// Authentication Manager for Spiritual Growth Companion
class AuthManager {
    static JUDGE_CREDENTIALS = {
        userId: 'Hackathon_Judge',
        password: 'Hackathon_Judge@123'
    };

    static STORAGE_KEYS = {
        USERS: 'spiritual_users',
        SESSION_USER: 'session_user',
        SELECTED_RELIGION: 'selected_religion'
    };

    // Initialize localStorage if not exists
    static init() {
        if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
            localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify([]));
        }
    }

    // Login function
    static login(userId, password) {
        this.init();

        // Check hardcoded judge credentials first
        if (userId === this.JUDGE_CREDENTIALS.userId && password === this.JUDGE_CREDENTIALS.password) {
            const user = {
                userId: userId,
                fullName: 'Hackathon Judge',
                isJudge: true,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(this.STORAGE_KEYS.SESSION_USER, JSON.stringify(user));
            // Set default religion for simplified flow
            localStorage.setItem(this.STORAGE_KEYS.SELECTED_RELIGION, 'universal');
            return { success: true, user: user };
        }

        // Check stored users
        const users = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USERS) || '[]');
        const user = users.find(u => u.userId === userId && u.password === password);

        if (user) {
            const sessionUser = {
                userId: user.userId,
                fullName: user.fullName,
                isJudge: false,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(this.STORAGE_KEYS.SESSION_USER, JSON.stringify(sessionUser));
            // Set default religion for simplified flow
            localStorage.setItem(this.STORAGE_KEYS.SELECTED_RELIGION, 'universal');
            return { success: true, user: sessionUser };
        }

        return { success: false, message: 'Invalid credentials' };
    }

    // Signup function
    static signup(userId, password, fullName) {
        this.init();

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USERS) || '[]');
        if (users.find(u => u.userId === userId)) {
            return { success: false, message: 'User ID already exists' };
        }

        // Check if it's the judge ID
        if (userId === this.JUDGE_CREDENTIALS.userId) {
            return { success: false, message: 'This User ID is reserved' };
        }

        // Create new user
        const newUser = {
            userId: userId,
            password: password,
            fullName: fullName,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));

        return { success: true, user: newUser };
    }

    // Get current session user
    static getCurrentUser() {
        const userStr = localStorage.getItem(this.STORAGE_KEYS.SESSION_USER);
        return userStr ? JSON.parse(userStr) : null;
    }

    // Check if user is logged in
    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Logout function
    static logout() {
        localStorage.removeItem(this.STORAGE_KEYS.SESSION_USER);
        localStorage.removeItem(this.STORAGE_KEYS.SELECTED_RELIGION);
        window.location.href = 'login.html';
    }

    // Set selected religion
    static setReligion(religion) {
        localStorage.setItem(this.STORAGE_KEYS.SELECTED_RELIGION, religion);
    }

    // Get selected religion
    static getReligion() {
        return localStorage.getItem(this.STORAGE_KEYS.SELECTED_RELIGION);
    }

    // Require authentication (redirect to login if not authenticated)
    static requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Auto-redirect if already logged in (for login/signup pages)
function redirectIfLoggedIn() {
    if (AuthManager.isLoggedIn()) {
        window.location.href = 'index.html';
    }
}

// Initialize auth manager
AuthManager.init();