document.getElementById("registration-form").addEventListener("submit", handleRegister);

//Takes in user input, checks the username in localstorage. If none exists, add user to localstorage and redirect to home.html
function handleRegister(event){
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.username === username);

    if(userExists){
        alert("Username Has Been Taken");
        return;
    }

    const newUser = {
        username: username,
        password: password
    };
    sessionStorage.setItem(
            "currentUser", JSON.stringify({
                username: newUser.username
            })
        );

        const onlineUsers = JSON.parse(localStorage.getItem("onlineUsers")) || [];
        const updatedOnlineUsers = onlineUsers.includes(newUser.username) ? onlineUsers : [...onlineUsers, newUser.username];

        localStorage.setItem("onlineUsers", JSON.stringify(updatedOnlineUsers));


    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    location.replace("home.html");
}


