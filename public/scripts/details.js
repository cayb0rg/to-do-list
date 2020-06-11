
if (document.querySelector('body').clientWidth <= 1000) {
    
    document.querySelectorAll('.descriptionLink').forEach((link) => {
        link.classList.add('hideForm');
    })
    document.querySelectorAll('.descriptionContent').forEach((p) => {
        p.classList.remove('hideForm');
    })
} else {
    document.querySelectorAll('.descriptionLink').forEach((link) => {
        link.classList.remove('hideForm');
    })
    document.querySelectorAll('.descriptionContent').forEach((p) => {
        p.classList.add('hideForm');
    })
    
}

function loadDetails(id) {
    document.getElementById(id).classList.toggle('hideForm');
}