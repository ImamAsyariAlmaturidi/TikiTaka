const bcrypt = require('bcryptjs');

class Helper {
    static async hashingPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); 
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }
}

module.exports = Helper;
