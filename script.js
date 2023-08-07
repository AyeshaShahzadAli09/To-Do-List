const ItemLists = document.querySelector('.list-group-flush');
const addbtn = document.querySelector('#addButton');
const clearbtn = document.querySelector('#clearButton'); 
const input =document.getElementById('input');
const mode = document.getElementById("mode");
loadEvents();

function loadEvents()
{
    // DOM Load event
   document.addEventListener('DOMContentLoaded', getLists);

    // add btn / add lists
   addbtn.addEventListener('click' , addLists);

   //clears specific lists item
   ItemLists.addEventListener('click',removeListsItem);

   // clear lists
   clearbtn.addEventListener('click',clearLists);

}
// Get Tasks from LS
function getLists() {
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function(item){
      //create the li's
    const li = document.createElement('li');
    // adding the class to li's
    li.className = 'list-group-item d-flex justify-content';
    // add the text input into li's
    li.appendChild(document.createTextNode(item));
    //create a div for checkbox and delete item
    const div = document.createElement('div');
    //create a link to check ot unchecked the lists items
    const checkbox = document.createElement('input');
    checkbox.className = 'form-check-input ';
    // set the type attribute to checkbox
    checkbox.setAttribute('type', 'checkbox');
    // set the value attribute to an empty string
    checkbox.setAttribute('value', '');
    // Get the checkbox state from the local storage, using the task text as the key, or set it to false if not found
    let checked = JSON.parse(localStorage.getItem(item) || false);
    // Set the checkbox state to the stored value
    checkbox.checked = checked;
    // console.log(checked);
    // Set the text decoration according to the checkbox state
    li.style.textDecoration = checked ? 'line-through' : 'none';
    checkbox.addEventListener('change', () =>{
    // check if the checkbox is checked
    if (checkbox.checked == true) {
    // add a line-through effect to the text element
    li.style.textDecoration = 'line-through';
    // Store the checkbox state as true in the local storage, using the task text as the key
    localStorage.setItem(item, JSON.stringify(true));
    } else {
    // remove the line-through effect from the text element
    li.style.textDecoration = 'none';
    // Store the checkbox state as false in the local storage, using the task text as the key
    localStorage.setItem(item, JSON.stringify(false));
      }})

    //create a link to delete the specific lists item
    const link = document.createElement('a');
    // add the class
    link.className = 'delete-item secondary-content';
    // add icon
    link.innerHTML = '<i class="fa-solid fa-trash"></i>';
    //append the checkbox to li
    div.appendChild(checkbox);
    // append link to the li
    div.appendChild(link);
    //append div to li
    li.appendChild(div);
    // Append li to ul
    ItemLists.appendChild(li);
  });
}

function addLists(e){
    if(input.value === ''){
        alert('Add List Items');
    }
    else{
         //create the li's
    const li = document.createElement('li');
    // adding the class to li's
    li.className = 'list-group-item d-flex justify-content';
    // add the text input into li's
    li.appendChild(document.createTextNode(input.value));
    //create a div for checkbox and delete item
    const div = document.createElement('div');
    //create a link to check ot unchecked the lists items
    const checkbox = document.createElement('input');
    checkbox.className = 'form-check-input ';
    // set the type attribute to checkbox
    checkbox.setAttribute('type', 'checkbox');
    // set the value attribute to an empty string
    checkbox.setAttribute('value', '');
    let text = input.value;
    // Get the checkbox state from the local storage, using the task text as the key, or set it to false if not found
    let checked = JSON.parse(localStorage.getItem(text) || false);
    // Set the checkbox state to the stored value
    checkbox.checked = checked;
    console.log(checked);
    // Set the text decoration according to the checkbox state
    li.style.textDecoration = checked ? 'line-through' : 'none';
    checkbox.addEventListener('change', () =>{
    // check if the checkbox is checked
    if (checkbox.checked == true) {
    // add a line-through effect to the text element
    li.style.textDecoration = 'line-through';
    // Store the checkbox state as true in the local storage, using the task text as the key
    localStorage.setItem(text, JSON.stringify(true));
    } else {
    // remove the line-through effect from the text element
    li.style.textDecoration = 'none';
    // Store the checkbox state as false in the local storage, using the task text as the key
    localStorage.setItem(text, JSON.stringify(false));
      }})
    //create a link to delete the specific lists item
    const link = document.createElement('a');
    // add the class
    link.className = 'delete-item secondary-content';
    // add icon
    link.innerHTML = '<i class="fa-solid fa-trash"></i>';
    //append the checkbox to li
    div.appendChild(checkbox);
    // append link to the li
    div.appendChild(link);
    //append div to li
    li.appendChild(div);
    // Append li to ul
    ItemLists.appendChild(li);
    // Store in LS
    storeTaskInLocalStorage(input.value);
     // Clear input
      input.value = '';
    e.preventDefault();
    } 
}
// Store Task
function storeTaskInLocalStorage(item) {
  let items;
  if(localStorage.getItem('items') === null){
   items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

 items.push(item);

  localStorage.setItem('items', JSON.stringify(items));
}
function removeListsItem(e){
        if(e.target.parentElement.classList.contains('delete-item')) {
          if(confirm('Are You Sure to delete the item from lists?')) {
              console.log( e.target.parentElement.parentElement.parentElement);
            e.target.parentElement.parentElement.parentElement.remove();
             // Remove from LS
          removeTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement);
          }
        }
      }
      // Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('items') === null){
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.forEach(function(item, index){
    if(taskItem.textContent === item){
      items.splice(index, 1);
    }
  });
    // Add this line to update the local storage
    localStorage.setItem('items', JSON.stringify(items));
}
// Clear Tasks
function clearLists() {
    ItemLists.innerHTML = '';
    // Faster
  // while(ItemLists.firstChild) {
  //   ItemLists.removeChild(ItemLists.firstChild);
  // }
 // Clear from Local Storage
 clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

mode.addEventListener("click",function()
{
  var element = document.getElementById("row2");
  element.classList.toggle("dark-mode");
  input.classList.toggle('dark-mode');
  var cardHeader = document.getElementById('cardHeader');
  cardHeader.classList.toggle('dark-mode');
})