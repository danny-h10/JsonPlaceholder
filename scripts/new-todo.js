"use strict"

window.onload = () => {

    const createCommentForm = document.querySelector("#createinfoForm");

    createCommentForm.addEventListener("submit", createAComment)
}

const createAComment = async (event) => {

    //call preventDefault to keep the page from reloading
    event.preventDefault();

    //generate a new form data object
    let formData = new FormData(event.target);

    //generate a JavaScript Object from the formData object created above
    let formDataAsObject = Object.fromEntries(formData);

    //try catch for error handling
    try {

        //make a fetch (POST) request to create a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/todos",
            {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                //take the data from the form and build the body of the request
                body: JSON.stringify(formDataAsObject)
            }
        );
        //turn the response in to something we can work with
        let newComment = await response.json();

        //put the comments in the console
        console.log(newComment)

    } catch (err) {

        //what the hell happend
        console.log("something went south")

    }

}