/*
selecting form and loading gif and hiding it
 */
let form = document.querySelector('form')
let loadingGif = document.querySelector('.loading')
loadingGif.style.display = 'none';


/*
event listener for submit button
 */
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const formData = new FormData(form)
    const name = formData.get('name')
    const telephone = formData.get('telephone')
    const description = formData.get('description')
    const photo = formData.get('photo')
    
    const data = {
        name,
        telephone,
        description,
        photo
    }

    //hides the form and shows loading
    console.log(data)
    form.style.display = 'none'
    loadingGif.style.display = '';
})


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
