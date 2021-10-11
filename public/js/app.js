
const form = document.querySelector("form");
const place = document.getElementById("place");
const text = document.getElementById("text");
const err = document.getElementById("err");
form.addEventListener("submit", e => {
    const searchValue = document.querySelector("input").value;
    fetch("/weather?address=" + searchValue).then( response => {
        response.json().then(data => {
            if(data.error) {
                text.textContent = "";
                place.textContent = "";
                err.textContent = data.error;
            } else {
                text.textContent = data.forcast;
                place.textContent = data.location;
                err.textContent = ""
            }
            
        })
        })
    e.preventDefault()
})
//on the backend you create an endpoint that needs address at the end of the url query, on frontend you can request that value through a form and then append it to the url