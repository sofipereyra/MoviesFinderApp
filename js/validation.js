
const mail = document.getElementById("email");
const pass = document.getElementById("password");

const form = document.querySelector(".form-login");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

function UserException(sms) {
  this.sms = sms;
}

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)){
     return (true);
   }else if(mail.value.length === 0){
      throw new UserException("Please enter an email address");
   }else{
      throw new UserException("You have entered an invalid email address!");
   }
}
function validatePassword(validationPassword){
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(pass.value)) {
        return (true)
    }else if(password.value.length === 0){
      throw new UserException("A password is required!");
    }else{
      throw new UserException("You have entered an invalid password!");
    }
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

const errorLabel = document.getElementById("error")

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  try{
    if(validateEmail(mail) && validatePassword(pass)){
      login(mail, pass);
    }
  }catch (UserException){
    errorLabel.innerHTML = UserException.sms;
  }
})