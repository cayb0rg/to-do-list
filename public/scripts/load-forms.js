const projCreateBtn = document.getElementById('createProj');
const projCreateForm = document.querySelector('.createProjForm');

projCreateBtn.addEventListener('click', () => {
    projCreateForm.classList.toggle('hideForm');
    if(projCreateForm.classList.contains('hideForm')) {
        projCreateBtn.innerText = 'Create New Project';
    } else {
        projCreateBtn.innerText = 'Cancel';
    }
})

const itemCreateBtn = document.getElementById('createItem');
const itemCreateForm = document.querySelector('.createItemForm');

itemCreateBtn.addEventListener('click', () => {
    itemCreateForm.classList.toggle('hideForm');
    if(itemCreateForm.classList.contains('hideForm')) {
        itemCreateBtn.innerText = 'Create New Item';
    } else {
        itemCreateBtn.innerText = 'Cancel';
    }
})

const editItemBtn = document.getElementById('editItem');
const editItemForm = document.querySelector('.editItemForm');
const details = document.querySelector('.details-content');

document.getElementById('description').value=document.getElementById('description').value;

editItemBtn.addEventListener('click', () => {
    editItemForm.classList.toggle('hideForm');
    details.classList.toggle('hideForm');
    if(editItemForm.classList.contains('hideForm')) {
        editItemBtn.innerText = 'Edit';
    } else {
        editItemBtn.innerText = 'Cancel';
    }
})