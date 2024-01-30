const signuphandler=(event)=>{
    event.preventDefault();
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const info = {
        username,first_name,last_name,email,password,confirm_password
    }
    console.log(info);
    if(password===confirm_password){
        document.getElementById("pass-error").innerText=""
        if(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)){
            fetch("https://testing-8az5.onrender.com/patient/register/",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(info),
            })
            .then((req)=>req.json())
            .then((data)=>console.log(data))
        }
        else{
            alert("Password not strong enough")
            document.getElementById("pass-error").innerText="Password must contain minimum 8 letters with at least a symbol, upper and lower case letters and a number"
        }
    }
    else{
        alert("Passwords do not match")
        document.getElementById("pass-error").innerText="Passwords do not match"
    }
}

const loginhandler=(event)=>{
    event.preventDefault();
    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value
    if((username,password)){
        fetch("https://testing-8az5.onrender.com/patient/login/",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({username,password}),
            })
            .then((req)=>req.json())
            .then((data)=>{
                if(data.token && data.user_id){
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("user_id",data.user_id);
                    window.location.href="index.html";
                }
            })
    }
}

const LogoutHandler=()=>{
    const token = localStorage.getItem("token");
    fetch("https://testing-8az5.onrender.com/patient/logout/",{
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json"
        },  
    })
    .then((req)=>req.json())
    .then((data)=>{
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("patient_id")
    })
}