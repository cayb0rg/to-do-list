const intro = document.querySelector('.intro');
const slider = document.querySelector('.slider');
const img = document.getElementById('camper')
const logo = document.querySelector('#logo');
const headline = document.querySelector('.headline');
const header = document.querySelector('header');
const hamburger = document.querySelector('#hamburger');
const fireflies = document.querySelectorAll('#fireflies *');
const firefliesContainer = document.querySelector('#fireflies');


const tl = new TimelineMax();
//gsap.registerPlugin(ScrollTrigger);

tl
.fromTo(slider, 1.3, {x: "-102%"}, {x: '0%', ease: Power2.easeIn}) // background
.fromTo(headline, 1.2, {x: 30, opacity: 0}, {x: 0, opacity: 1}, "-=0.0") // headline
.fromTo(intro, 1.2, {x: 30, opacity: 0}, {x: 0, opacity: 1, ease: Power2.easeInOut}, "-=0.5") // trailer
.fromTo(slider, 1.3, {x: "0%", opacity: 1}, {x: "120%", opacity: 0, ease: Power2.easeOut}, "-=0.5") // background
.fromTo(header, 2.0, {x: 30, opacity: 0}, {x: 0, opacity: 1}, "-=1") // header
.fromTo(hamburger, 2.0, {x:30, opacity: 0}, {x: 0, opacity: 1}, "-=1") // hamburger
.to(slider, 0, {display: 'none'}) // hide slider


fireflies.forEach((element, i) => {
    function move(x, y) {
        let newX = newPosition()[0];
        let newY = newPosition()[1];
        let halfwayX = (newX + x)/2;
        let halfwayY = (newY + y)/2;

        let speed = 60;
        let distanceHalfway = Math.sqrt(Math.pow(newX-x, 2) + Math.pow(newY-y, 2));
        let time = Math.floor(distanceHalfway/speed);

        let length = getRandomInt(3)
        let fireflyAnimation = new TimelineMax({onComplete: move, onCompleteParams: [newX, newY], yoyo: true});

        fireflyAnimation
        .to(element,0, {
            x: x,
            y: y,
            opacity: 0,
            ease: Power0.easeNone
        })
        .to(element, time, {
            opacity: 1,
            x:halfwayX,
            y:halfwayY,
            ease: Power0.easeNone
        })
        .to(element, time, {
            opacity: 0,
            x: newX,
            y: newY,
            ease: Power0.easeNone
        })
    };

    let { x, y } = element.getBBox();
    move(x, y);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function newPosition() {
    var container = intro.getBoundingClientRect();
    let nx = Math.floor(Math.random() * container.width/5);
    let ny = Math.floor(Math.random() * container.height/5);
    return [nx, ny];
}