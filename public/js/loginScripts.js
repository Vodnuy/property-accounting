async function  loginSubmit(e){
    e.preventDefault()
    console.log('login here')
    
    form = document.getElementById('loginForm')
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

        window.location = '/main'
    }else{
        
        console.log(res)
        document.getElementById('login-error-message').textContent = data.message
    }
}

async function logout(){
    window.location = '/login'
    console.log('logout')
    document.cookie = ''
    await fetch('/logout', {method: "POST"})
    window.location = '/login'
}

document.getElementById('loginBtn').addEventListener('click', loginSubmit)
document.getElementById('logoutBtn').addEventListener('click', logout)
