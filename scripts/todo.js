"use strict"

window.onload = () => {

    let theDropdown = document.querySelector("#todoId")
    theDropdown.addEventListener("click", getUsers)

}



async function getUsers() {
    let userInput = document.querySelector("#todoIdInput")
    let results = document.querySelector("#results")
    console.log(userInput.value)

    let newString = ("https://jsonplaceholder.typicode.com/todos/").concat(userInput.value)
    console.log(newString)

    try {
        let reponse = await fetch(newString);
        if (!reponse.ok) {
            throw new Error("gosh darnit");
        }
        let data = await reponse.json();
        console.log(data)

        results.innerHTML = JSON.stringify(data)



    } catch (error) {
        console.log(error);
    }
}


async function buildTextDrop(){

let users = await getUsers()
    users.forEach(user => {
        let newOption = document.createElement("option");
        newOption.textContent = user.userId;
        newOption.value = user.id
        theDropdown.appendChild(newOption)
});
}