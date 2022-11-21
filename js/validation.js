
const mail = document.getElementById("email");
const pass = document.getElementById("password");

const form = document.querySelector(".form-login");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
   {
     return (true)
   }
     alert("You have entered an invalid email address!")
     return (false)
}
function validatePassword(validationPassword){
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(pass.value)) {
        return (true)
    }
    alert("You have entered an invalid password!")
    return (false)
}

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


form.addEventListener('submit', (e) =>{
  e.preventDefault();
  if(validateEmail(mail)&& validatePassword(pass)){
    login(mail, pass);
  }else {
    console.log("oops");
  }
})