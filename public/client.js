// client-side js
// run by the browser each time your view template is loaded
console.log('hello world :o');


// define variables that reference elements on our page
const santaForm = document.forms[0];

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function(event) {
  const data = Object.fromEntries(new FormData(event.target))
  if(data.wish.length > 100){
    return false;
  }
};