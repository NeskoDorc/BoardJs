const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items

let updatedOnLoad = false


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = []

// Drag Functionality

let draggedItem
let curentColum


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool'];
    }
}

// getSavedColumns()
// updateSavedColumns()

// Set localStorage Arrays
function updateSavedColumns() {

    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray]
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold']
    arrayNames.forEach((arryname, index) => {

        localStorage.setItem(`${arryname}Items`, JSON.stringify(listArrays[index]))

    })


}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
    // console.log('columnEl:', columnEl);
    // console.log('column:', column);
    // console.log('item:', item);
    // console.log('index:', index);
    // List Item
    const listEl = document.createElement('li');
    listEl.classList.add('drag-item');

    listEl.textContent = item
    listEl.draggable = true

    listEl.setAttribute('ondragstart', 'drag(event)')
        // append

    columnEl.appendChild(listEl)

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    // Check localStorage once
    if (!updatedOnLoad) {
        getSavedColumns()
    }
    // Backlog Column
    backlogList.textContent = ''
    backlogListArray.forEach((backLogItem, index) => {

        createItemEl(backlogList, 0, backLogItem, index)
    })

    progressList.textContent = ''
    progressListArray.forEach((progressLogItem, index) => {

        createItemEl(progressList, 0, progressLogItem, index)
    })

    completeList.textContent = ''
    completeListArray.forEach((completeItem, index) => {

        createItemEl(completeList, 0, completeItem, index)
    })

    onHoldList.textContent = ''
    onHoldListArray.forEach((onHoldItem, index) => {

        createItemEl(onHoldList, 0, onHoldItem, index)
    })
    updatedOnLoad = true
    updateSavedColumns()

    // Progress Column

    // Complete Column

    // On Hold Column

    // Run getSavedColumns only once, Update Local Storage


}


// Allows arrays to reflect drag and drop Function

function rebuildArrays() {
    backlogListArray = []


    for (let i = 0; i < backlogList.children.length; i++) {
        backlogListArray.push(backlogList.children[i].textContent)

    }
    progressListArray = []
    for (let i = 0; i < progressList.children.length; i++) {
        progressListArray.push(progressList.children[i].textContent)

    }
    completeListArray = []
    for (let i = 0; i < completeList.children.length; i++) {
        completeListArray.push(completeList.children[i].textContent)

    }
    onHoldListArray = []
    for (let i = 0; i < onHoldList.children.length; i++) {
        onHoldListArray.push(onHoldList.children[i].textContent)

    }
    console.log(backlogList.children)
    updateDOM()

}


// when Itam star Draging
function drag(e) {

    draggedItem = e.target
    console.log(draggedItem)


}
// Column allows for item to Drop
function allowDrop(e) {
    e.preventDefault();

}

// function dragLeave(column) {


//     itemLists[column].classList.remove('over');
// }

// on Draged element entered element
function dragEnter(column) {
    itemLists[column].classList.add('over')
    curentColum = column
    console.log(itemLists[column])
}


// Droping item in Column

function drop(e) {
    e.preventDefault();
    //Remove background color/padding

    itemLists.forEach(column => {
        column.classList.remove('over')
    })

    // add itam to new column

    const parent = itemLists[curentColum]
    console.log(parent)
    parent.appendChild(draggedItem)
    rebuildArrays()

}



updateDOM()