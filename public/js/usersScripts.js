async function deleteUser(id){
    try{
        console.log(id);
        const element = document.querySelector(`#userForm-${id}`);
        element.style.display = "none";
        const res = await fetch('/main/users/delete', {method:'delete', headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        });
        console.log(res)
    }catch(e){
        console.log(e)
    }
}


async function changeRole(id,role){
    try{
    console.log(id)
    location.reload()
    const res = await fetch('/main/users/put', {method:'put', headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({id,role})
    });
    }catch(e){
        console.log(e)
    }
}

