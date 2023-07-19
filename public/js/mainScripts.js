async function deleteItem(id){
    try{
        console.log(id);
        const element = document.querySelector(`#itemForm-${id}`);
        element.style.display = "none";
        const res = await fetch('/main/delete', {method:'delete', headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        });
        console.log(res)
    }catch(e){ 
        console.log(e)
    }
}


async function saveItem(id){
    try{
        console.log(id);
        const element = document.querySelector(`#itemForm-${id}`);
        const notes = element.querySelector("#notes-item").value;
        const res = await fetch('/main/put', {method:'put', headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({id, notes})
        });
        console.log(res)
    }catch(e){
        console.log(e)
    }
}

async function seeUsers(){
    location.href = '/main/users'
}





$('#searchItems').on('input', function() {
    searchItem();
  });

async function searchItem() {
    const searchValue = $('#searchItems').val().toLowerCase();
    console.log(searchValue);
    const itemContainers = $('.item-container .item-card');
  
    itemContainers.each(function () {
      const itemName = $(this).find('.test').text().toLowerCase();
      console.log(itemName);
      if (itemName.includes(searchValue)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
  




//async function addItem(){
    var modal = document.getElementById('myModal')
    var btn = document.getElementById('addItemBtn')
    var span = document.getElementsByClassName("close")[0]

    btn.onclick = function () {
        modal.style.display = "flex"
    }
    span.onclick = function(){
        modal.style.display = "none"
    }

    window.onclick = function(event){
        if (event.target == modal){
            modal.style.display = "none"
        }
    }
//}
  

async function addItem() {
    try {
        const itemData = {
            name : document.querySelector('.addContainer input[placeholder="назва"]').value,
            units_of_measurement : document.querySelector('.addContainer input[placeholder="одиниця виміру"]').value,
            year_of_admission : document.querySelector('.addContainer input[placeholder="рік введення в експлуатацію"]').value,
            kaf_mumber : document.querySelector('.addContainer input[placeholder="і/н"]').value,
            number : document.querySelector('.addContainer input[placeholder="кількість"]').value,
            price : document.querySelector('.addContainer input[placeholder="ціна"]').value,
            service : document.querySelector('.addContainer input[placeholder="служба яка надала"]').value,
            notes : document.querySelector('.addContainer textarea[placeholder="нотатки"]').value,
        }
        console.log(itemData);
        var modal = document.getElementById('myModal')
        modal.style.display = "none"
        location.href = '/main'
        await fetch('/main/addItem', {method:'post', headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(itemData)
        });
    } catch (error) {
      console.error(error);
    }
  }
  




async function exportsExcel(){
    try {
        const res = await fetch('/main/downloadExcel');
        console.log(res)        
        const data = await res.blob()
        console.log(data)
        const url = URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = url
        a.download = 'items22.xls'
        const clicker  =()=>{
            setTimeout(()=>{
                URL.revokeObjectURL(url)
                a.removeEventListener('click', clicker)
            }, 150)

        }
        a.addEventListener('click', clicker, false)
        a.click()

    } catch (error) {
        console.log(error);
    }
}




