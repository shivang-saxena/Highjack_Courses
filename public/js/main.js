function postLogin(){
  var email = $('#idEmailLogin').val();
  var password =  $('#idPasswordLogin').val();
  const csrf = $('#csrfToken').val();
   fetch('/login',{
     method : 'POST',
     body: JSON.stringify({email: email, password: password }),
     headers: {
      "Content-Type": "application/json",
       'csrf-token' : csrf
     },
   })
   .then(result => {
    return result.json();
  })
  .then(data =>{
    if(!data.isLoggedIn){
     alert(data.msg);
    }else{
      location.reload();
    }
   })
   .catch(err =>{
  console.log(err);
   })

  return false;
}

function postSignup(){
  var email = $('#idEmailSignup').val();
  var password =  $('#idPasswordSignup').val();
  const csrf = $('#csrfToken').val();
   fetch('/signup',{
     method : 'POST',
     body: JSON.stringify({email: email, password: password }),
     headers: {
      "Content-Type": "application/json",
       'csrf-token' : csrf
     },
   })
   .then(result => {
    return result.json();
  })
  .then(data =>{
    $('#signupModal').modal('toggle');
    alert(data.msg);
   })
   .catch(err =>{
  console.log(err);
   })

  return false;
}