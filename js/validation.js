
const mail = document.getElementById("email");
const pass = document.getElementById("password");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


function login(email, password){
    var raw = JSON.stringify({
        "email": email,
        "password": password
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/users", requestOptions)
        .then(response => response.text())
        .then(result => {
              console.log(result);
              localStorage.setItem('token',result.accesToken);
              window.location.href = './home.html'})
        .catch(error => console.log('error', error));
}
