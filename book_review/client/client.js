/*
selecting form and loading gif and hiding it
 */
let form = document.querySelector('form')
let loadingGif = document.querySelector('.loading')
let ImageCards = document.getElementById('imageCards')
loadingGif.style.display = '';

const API_URL = 'http://localhost:5000/books'

listBooks(API_URL)


var image = document.getElementById('output');
/*
event listener for submit button
 */
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const formData = new FormData(form)
    const name = formData.get('name')
    const price = formData.get('price')
    const description = formData.get('description')
    const photo = formData.get('photo')
    
    const inputData = {
        name,
        price,
        description,
        photo
    }
    //hides the form and shows loading
    form.style.display = 'none'
    loadingGif.style.display = '';

    postBook(API_URL, inputData)
    .then((book) => book.json())
    .then((response) => {
        console.log(response)
        form.reset()
        form.style.display = ''
        loadingGif.style.display = 'none';
    })
    listBooks(API_URL)
})


function postBook(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function listBooks(url) {
    fetch(url)
    .then(response => response.json())
    .then(books => {
        console.log(books)
        imageCards.innerHTML = ''
        books.forEach((item, index) => {
           imageCards.innerHTML += `
            <div class="col s12 m4">
              <div class="card">
                <div class="card-image">
                  <img id="output" width="300" height="450" src="${item.photo}">
                  <span class="card-title">${item.name}</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light red">$ ${item.price}</a>
                </div>
                <div class="card-content">
                  <p>${item.description}
                </div>
              </div>
            </div>` 
        })
        form.style.display = ''
        loadingGif.style.display = 'none';
    })
}

// https://images-na.ssl-images-amazon.com/images/I/41JYDubvTvL._SX258_BO1,204,203,200_.jpg

// ================================================================================
// ================================================================================
// ================================================================================
/*
This is text area function. It has nothing to do with other parts
 */
function changedValue() {
    let text = document.getElementById("textarea1");
    document.querySelector("#textarea1 + label").textContent = "";
    let textValue = text.value;
    let row = text.getAttribute('rows');
    let lines = textValue.split(/\r|\r\n|\n/);
    let count = lines.length;
    if (count >= row) {
        text.style.overflowY = "scroll";
    }
    else if (count < row) {
        text.style.overflowY = "hidden";
    }
}
