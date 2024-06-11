"use strict"

window.onload = () => {

    getUsers()
}



function getUsers() {
    
    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((response) =>response.json())
        .then((users)=>{

            displayUsers(users)

        })
        .catch((error) => console.log("its broke"));
}

function displayUsers(users){
    let tbody = document.querySelector("#userTableBody")

    for(let i =0; i < users.length; i++){

        let row = tbody.inserRow();

        let cell1 = row.insertCell();
        cell1.innerhtml = users[i].id

        let cell2 = row.insertCell();
        cell2.innerhtml = users[i].name

        let cell3 = row.insertCell();
        cell3.innerhtml = users[i].username

        let cell4 = row.insertCell();
        cell4.innerhtml = users[i].email

        let cell5 = row.insertCell();
        cell5.innerhtml = users[i].address

        let cell6 = row.insertCell();
        cell6.innerhtml = users[i].phone
    }
}
