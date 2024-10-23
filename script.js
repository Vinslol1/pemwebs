let cont = document.querySelector('.about-container');
let layer = document.querySelectorAll('.about-layer');
let clouds = document.querySelectorAll('.about-cloud');
let s1 = document.querySelector('.s1'); // Get the s1 section
let s2 = document.querySelector('.s2'); 
let currentSection = 1;
const totalSections = 4;
cont.onscroll = function() {
    let X = cont.scrollTop;

    layer[0].style.left = X / 1.5 + 'px';
    layer[1].style.left = X / 2 + 'px';
    layer[2].style.left = X / 3 + 'px';
    layer[3].style.left = X / 4 + 'px';
    layer[7].style.left = X / 2 + 'px';
    layer[6].style.left = X / 3 + 'px';
    layer[5].style.left = X / 4 + 'px';
    layer[4].style.left = X / 5 + 'px';
    
    if (X > 500) { 
        s1.style.opacity = '0';
    } else {
        s1.style.opacity = '1';
    }

    if (X > 500) { 
        s2.style.backgroundColor = '#000';
    } else {
        s2.style.backgroundColor = '#242424';
    }
}


function scrollToNextSection() {
    currentSection++;
    if (currentSection > totalSections) {
      currentSection = 1; // Reset to the first section if we're at the last section
    }
    document.getElementById(`s${currentSection}`).scrollIntoView({ behavior: 'smooth' });
  }