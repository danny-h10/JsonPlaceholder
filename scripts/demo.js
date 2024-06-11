"use strict"

window.onload = () => {

    /*
     Create stuff
    */

    //get the create form off the page
    const createCommentForm = document.querySelector("#createCommentForm");

    //listen for the form submission and call createAComment
    createCommentForm.addEventListener("submit", createAComment)

    /*
     Update stuff
    */

    //get the getComment form off the page
    const getCommentForm = document.querySelector("#getCommentToEdit");

    //listen for submit of the getCommentForm and attempt to populate the update form
    getCommentForm.addEventListener("submit", populateUpdateForm);

    //get the updateComment form off the page
    const updateCommentForm = document.querySelector("#updateCommentForm");

    //listen for submit of the getCommentForm and attempt to populate the update form
    updateCommentForm.addEventListener("submit", updateAComment);

    /*
     Delete stuff
    */

     //get the delete comment form
     const deleteForm = document.querySelector("#commentToDeleteForm");

     //listen for the submit event and delete the comment
     deleteForm.addEventListener("submit", deleteAComment)



    //doing the CRUD actions
   /*C*/ //createAComment();
   /*R*/ getComments();
   /*U*/ // updateAComment();
   /*D*/ // deleteAComment();

}

//method to help get the data for update and fill out the form for the user
const populateUpdateForm = async (event) => {
    event.preventDefault();

    //go get the single comment for the id the user selected
    let comment = await getSingleComment(event.target.commentId.value);

    //fill out the form with the data from the comment we just got from the API
    document.querySelector("#body").value = comment.body;
    document.querySelector("#email").value = comment.email;
    document.querySelector("#name").value = comment.name;
    document.querySelector("#postId").value = comment.postId;
    document.querySelector("#id").value = comment.id;

}

const getSingleComment = async (commentId) => {

    const response = await fetch("https://jsonplaceholder.typicode.com/comments/" + commentId);
    let comment = await response.json();

    return comment;

}

//getComments function
//CRUD: (R)ead comments
const getComments = async () => {

    //try catch for error handling
    try {

        //make a fetch (GET) request to get the comments from the API
        let response = await fetch("https://jsonplaceholder.typicode.com/comments",
            //redundant and not needed for a get request
            {
                method: "GET"
            }
        );

        //turn those comments in to something we can work with
        let comments = await response.json();

        //put the comments in the console
        console.log(comments);

    } catch (err) {

        //what the hell happend
        console.log("something went south")

    }

}

//method/function to create a comment
//CRUD: (C)reate a comment
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
        let response = await fetch("https://jsonplaceholder.typicode.com/comments",
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

//method/function to update a comment
//CRUD: (U)pdate a comment
const updateAComment = async (event) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (PUT) request to update a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/comments/" + event.target.id.value,
            {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    body: event.target.body.value,
                    email: event.target.email.value,
                    name: event.target.name.value,
                    postId: event.target.postId.value
                })
            }
        );
        //turn those comments in to something we can work with
        let updatedComment = await response.json();

        //put the comments in the console
        console.log(updatedComment)

    } catch (err) {

        //what the hell happend
        console.log("something went south", err)

    }

}

//method/function to delete a comment
//CRUD: (D)elete a comment
const deleteAComment = async (event) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (DELETE) request to remove a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/comments/" + event.target.commentId.value,
            {
                method: "DELETE"
            }
        );
        //turn those comments in to something we can work with
        let deletedComment = await response.json();

        //put the comments in the console
        console.log(deletedComment)

    } catch (err) {

        //what the hell happend
        console.log("something went south")

    }

}