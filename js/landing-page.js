document.getElementById("login-form").addEventListener("submit", handleLogin);

//Takes in user input, checks against the localStorage user array, validates and redirects to home on success
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const validUser = users.find(user => user.username === username && user.password === password);

    if(validUser) {
        sessionStorage.setItem(
            "currentUser", JSON.stringify({
                username: validUser.username,
                isOnline: true,
            })
        );

        location.replace("pages/home.html");
    } else {
        alert("Username and/or Password is Invalid");
    }

}

