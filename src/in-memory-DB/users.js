const bcrypt = require('bcrypt');

let users = [ ];

// Function to add a new user
async function addUser(username, password) {
    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        console.log("Username already exists. Please choose a different one.");
        return false;
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Add the new user to the users array
    users.push({ username, passwordHash });
    console.log("User added successfully.");

    return true;

}

// Function to check if a user exists and verify password
async function checkUser(username, password) {
    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        console.log("User not found.");
        return false;
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (passwordMatch) {
        console.log("Password matched. User authenticated.");
        return true;
    } else {
        console.log("Incorrect password.");
        return false;
    }
}

// Export the addUser and checkUser functions
module.exports = {
    addUser,
    checkUser
};