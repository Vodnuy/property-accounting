async function registrationSubmit(e){
    e.preventDefault()

    form = document.getElementById('registrationForm')
    const payload = {
              username: form["username"].value, 
              password: form["password"].value, 
            }


            const res = await fetch(form.action, {method:'POST', headers: {
                "Content-Type": "application/json"
            },
      body: JSON.stringify(payload)})
  const data = await res.json()
  if (res.status===200){

      window.location = '/login'
  }else{
      
      console.log(res)
      document.getElementById('registration-error-message').textContent = data.message
  }

}

document.getElementById('registrationBtn').addEventListener('click', registrationSubmit)
