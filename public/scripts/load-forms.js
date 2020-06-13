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

const editItemBtn2 = document.getElementById('editItem2');
const editItemForm2 = document.querySelector('.editItemForm2');
const details = document.querySelector('.details-content');

editItemBtn2.addEventListener('click', () => {
    editItemForm2.classList.toggle('hideForm');
    details.classList.toggle('hideForm');
    if(editItemForm2.classList.contains('hideForm')) {
        editItemBtn2.innerText = 'Edit';
    } else {
        editItemBtn2.innerText = 'Cancel';
    }
})
