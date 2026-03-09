console.log('Index is conected..');

document.getElementById('singin-btn').addEventListener('click',()=>{
    //console.log("singin succes");
    const inputName = document.getElementById('input-username');
    const name = inputName.value;
    console.log(name);
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;
    console.log(password);
    if(name !== "admin" ){
        alert('Wrong UserName');
    }
    else if( password !=="admin123"){
        alert("Login Failed")
    }else if(name === "admin" && password ==="admin123"){
        window.location.assign("home.html");
    }

})