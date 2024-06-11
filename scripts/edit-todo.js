"use strict"

window.onload = () =>{

    let deleteSection = document.querySelector("#deleteId")
    deleteSection.addEventListener("submit", deleteAComment )

    let getIdToEdit = document.querySelector("#getIdToEdit")
    getIdToEdit.addEventListener("submit", populateUpdateForm)

    let updatedId = document.querySelector("#updateIdForm")
    updatedId.addEventListener("submit", updateAComment)

}


//method/function to delete a comment
//CRUD: (D)elete a comment
const deleteAComment = async (event) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (DELETE) request to remove a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/todos/" + event.target.todoId.value,
            {
                method: "DELETE"
            }
        );
        //turn those comments in to something we can work with
        let deletedId = await response.json();

        //put the comments in the console
        console.log(deletedId)

    } catch (err) {

        //what the hell happend
        console.log("something went south")

    }

}

//method/function to update a comment
//CRUD: (U)pdate a comment
const updateAComment = async (event) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (PUT) request to update a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/todos/" + event.target.inputId.value,
            {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    userId: event.target.userId.value,
                    id: event.target.inputId.value,
                    title: event.target.title.value,
                    completed: event.target.completed.value
                })
            }
        );
        //turn those comments in to something we can work with
        let updatedId = await response.json();

        //put the comments in the console
        console.log(updatedId)

    } catch (err) {

        //what the hell happend
        console.log("something went south", err)

    }

}

const populateUpdateForm = async (event) => {
    event.preventDefault();

    //go get the single comment for the id the user selected
    let ID = await getSingleId(event.target.getIdToEdit.value);

    //fill out the form with the data from the comment we just got from the API
    document.querySelector("#userId").value = ID.userId;
    document.querySelector("#inputId").value = ID.inputId;
    document.querySelector("#title").value = ID.title;
    document.querySelector("#completed").value = ID.completed;

}


const getSingleId = async (getIdToEdit) => {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + getIdToEdit);
    let ID = await response.json();

    return ID;

}
