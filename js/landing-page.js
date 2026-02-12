//Prevents user from accessing login page without logging out first.
if (sessionStorage.getItem("currentUser")) {
  location.replace("home.html");
}



//Takes in user input, checks against the localStorage user array, validates and redirects to home on success
const handleLogin = (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const validUser = users.find(user => user.username === username && user.password === password);

    if(validUser) {
        sessionStorage.setItem(
            "currentUser", JSON.stringify({
                username: validUser.username
            })
        );

        const onlineUsers = JSON.parse(localStorage.getItem("onlineUsers")) || [];
        const updatedOnlineUsers = onlineUsers.includes(validUser.username) ? onlineUsers : [...onlineUsers, validUser.username];

        localStorage.setItem("onlineUsers", JSON.stringify(updatedOnlineUsers));

        location.replace("pages/home.html");
    } else {
        alert("Username and/or Password is Invalid");
    }

}

document.getElementById("login-form").addEventListener("submit", handleLogin);

