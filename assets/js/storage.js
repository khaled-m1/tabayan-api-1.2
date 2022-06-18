// Set
window.localStorage.setItem("color", "#000");
// Get
console.log(window.localStorage.getItem("color"));
// Set Color in page
document.body.style.color = window.localStorage.getItem("color");
