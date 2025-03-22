// Add JavaScript code for your web site here and call it from index.html.
// Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// The toggleDarkMode function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

// Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);

// Query for the sign now button
const signNowButton = document.getElementById("sign-now-button");

let count = 3;
const addSignature = function(person) {
    // event.preventDefault();
    let name = document.getElementById('name').value;
    let hometown = document.getElementById('hometown').value;
    let email = document.getElementById('email').value;
    const signatureDiv = document.querySelector('.signatures');
    const p = document.createElement('p');
    p.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`
    signatureDiv.appendChild(p);

    const oldCounter = document.getElementById('counter');
    oldCounter.remove();

    count += 1;

    const newCounter = document.createElement('p');
    newCounter.id = 'counter';
    newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
    signatureDiv.appendChild(newCounter);
};

const validateForm = () => {
    let containsErrors = false;
    var petitionInputs = document.getElementById("sign-petition").elements;
    let person = {
        name: petitionInputs[0].value,
        hometown: petitionInputs[1].value,
        email: petitionInputs[2].value
    }

    // Validate the value of each input
    for (let i = 0; i < petitionInputs.length; i++) {
        if (petitionInputs[i].value.length < 2) {
            petitionInputs[i].classList.add('error');
            containsErrors = true;
        } else {
            petitionInputs[i].classList.remove('error');
        }
    }

    const email = document.getElementById('email');
    if (!email.value.includes('.com')) {
        containsErrors = true;
        email.classList.add('error');
    } else {
        email.classList.remove('error');
    }

    // Call addSignature() and clear fields if no errors
    if (containsErrors == false) {
        addSignature(person);
        toggleModal(person);
        for (let i = 0; i < petitionInputs.length; i++) {
            petitionInputs[i].value = "";
            containsErrors = false;
        }
    }
}
// Validate form after clicking the sign button
signNowButton.addEventListener('click', validateForm);

let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add("active");
        } else {
            revealableContainers[i].classList.remove("active");
        }
    }
}

window.addEventListener('scroll', reveal)

let motionButton = document.getElementById("reduce-motion");

const reduceMotion = () => {

    animation.transitionDuration = '0s';  // Remove any transition duration
    animation.transitionTimingFunction = 'none'; // No easing
    animation.revealDistance = 50;  // Shorten the distance needed to trigger the animation
    animation.initialOpacity = 1;   // Keep opacity fully visible for reduced motion

    // Loop through each revealable container and update the inline styles
    for (let i = 0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transitionDelay = animation.transitionDelay;
        revealableContainers[i].style.transitionDuration = animation.transitionDuration;
        revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
        revealableContainers[i].style.opacity = animation.initialOpacity;  // Make sure opacity is 1
        revealableContainers[i].style.transform = 'translateY(0)'; // Set initial transform state
        }

     reveal();
}

motionButton.addEventListener('click', reduceMotion);
const modal = document.getElementById("thanks-modal")
const modalContent = document.getElementById("thanks-modal-content")

const toggleModal = (person) => {
    modal.style.display = "flex";
    modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;
    let intervalId = setInterval(scaleImage, 500);
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId)
    }, 4000)
}

let scaleFactor = 1;
const modalImage = document.getElementById("cat");
const scaleImage = () => {
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`;
}

const closeModalButton = document.getElementById("close-modal");
const closeModal = () => {
    modal.style.display = "none";
}

closeModalButton.addEventListener('click', closeModal);