let cont = document.querySelector('.about-container');
let layer = document.querySelectorAll('.about-layer');
let clouds = document.querySelectorAll('.about-cloud');
let s1 = document.querySelector('.s1'); // Get the s1 section
let s2 = document.querySelector('.s2'); 
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
let currentSection = 1;
const totalSections = 3;

// Function to scroll to the next section
function scrollToNextSection() {
    currentSection++;
    if (currentSection > totalSections) {
        currentSection = 1; // Reset to the first section if we're at the last section
    }
    document.getElementById(`s${currentSection}`).scrollIntoView({ behavior: 'smooth' });
}

// Function to scroll to the previous section
function scrollToPrevSection() {
    currentSection--;
    if (currentSection < 1) {
        currentSection = totalSections; // Reset to the last section if we're at the first section
    }
    document.getElementById(`s${currentSection}`).scrollIntoView({ behavior: 'smooth' });
}

// Observer callback to update currentSection based on the section in view
function updateCurrentSection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Check if the ID is in the expected format and extract the section number
            const sectionId = entry.target.id;
            if (sectionId && sectionId.startsWith("s")) {
                const sectionNumber = parseInt(sectionId.replace("s", ""), 10);
                
                if (!isNaN(sectionNumber)) {
                    currentSection = sectionNumber;
                    console.log(`Current Section: ${currentSection}`);
                }
            }
        }
    });
}

// Set up Intersection Observer with options
const observerOptions = {
    threshold: 0.6 // Trigger when 60% of the section is visible
};
const observer = new IntersectionObserver(updateCurrentSection, observerOptions);

// Observe all sections with IDs like "s1", "s2", etc.
document.querySelectorAll('[id^="s"]').forEach(section => observer.observe(section));




//Efect cursor
const cursor = document.querySelector('.cursor.animate'); 
let lastX = 0;
let timeout;
document.addEventListener('mousemove',(event)=>{
    cursor.style.left = `${event.pageX}px`;
    cursor.style.top = `${event.pageY}px`;
    
    cursor.classList.add('animate');
    
  if (event.pageX < lastX) {
      cursor.classList.add('flipped'); 
    } else {
        cursor.classList.remove('flipped'); 
    }    
    
    lastX = event.pageX; 
    
    clearTimeout(timeout);
    
    
    timeout = setTimeout(() => {
        cursor.classList.remove('animate');
    }, 200);    
    
})    





//slide3
const folderData = {
    'Knives': [
        'img/Knife/Knife1.jpeg', 
        'img/Knife/Knife2.jpeg', 
        'img/Knife/Knife3.jpg'
    ],    
    'Sports': [
        'img/Sport/Sport1.jpeg', 
        'img/Sport/Sport2.jpeg',
        'img/Sport/Sport3.jpeg'
    ],    
    'Technologies': [
        'img/Technology/Technology1.jpeg', 
        'img/Technology/Technology2.jpeg',
        'img/Technology/Technology3.jpeg'
    ]    
};    

let selectedFolders = []; // To store selected folder names
let selectedImages = [];  // To store all images combined from folders
let currentIndex = 0;

// Populate datalist with folder names
const folderList = document.getElementById('folderList');
for (const folder in folderData) {
    const option = document.createElement('option');
    option.value = folder;
    folderList.appendChild(option);
}    

// Function to add a folder to the selected list
function addFolder() {
    const folderName = document.getElementById('searchInput').value.trim();
    if (folderData[folderName]) {
        if (!selectedFolders.includes(folderName)) {
            selectedFolders.push(folderName);
            updateSelectedFolders();
        } else {
            alert('Folder already selected.');
        }    
    } else {
        alert('Folder not found.');
    }    
    document.getElementById('searchInput').value = ''; // Clear the input
}    

// Update the list of selected folders on the UI
function updateSelectedFolders() {
    const foldersList = document.getElementById('foldersList');
    foldersList.innerHTML = ''; // Clear existing items

    if (selectedFolders.length === 0) {
        foldersList.textContent = 'None';
    } else {
        selectedFolders.forEach(folder => {
            const folderItem = document.createElement('span');
            folderItem.className = 'folder-item';

            const folderNameSpan = document.createElement('span');
            folderNameSpan.textContent = folder;
            folderItem.appendChild(folderNameSpan);

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-btn';
            removeButton.textContent = 'X';
            removeButton.onclick = () => removeFolder(folder);
            folderItem.appendChild(removeButton);

            foldersList.appendChild(folderItem);
        });
    }
}    

// Function to remove a selected folder
function removeFolder(folderName) {
    selectedFolders = selectedFolders.filter(folder => folder !== folderName);
    updateSelectedFolders();
    searchFolders(); // Update images after removing a folder
}

// Function to search through the selected folders
function searchFolders() {
    selectedImages = []; // Reset the images array
    currentIndex = 0; // Reset index

    // Combine images from all selected folders
    selectedFolders.forEach(folder => {
        selectedImages = selectedImages.concat(folderData[folder]);
    });    

    if (selectedImages.length > 0) {
        displayImage(currentIndex); // Display the first image
    } else {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = '<p>No images found.</p>';
    }    
}    

// Function to display an image at a given index
function displayImage(index) {
    const imageContainer = document.getElementById('imageContainer');
    if (index >= 0 && index < selectedImages.length) {
        const imgElement = document.createElement('img');
        imgElement.src = selectedImages[index];
        
        // Clear the container and display the new image
        imageContainer.innerHTML = '';
        imageContainer.appendChild(imgElement);
    }    
}    

// Navigation functions
function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        displayImage(currentIndex);
    } else {
        alert('This is the first image.');
    }
}

function nextImage() {
    if (currentIndex < selectedImages.length - 1) {
        currentIndex++;
        displayImage(currentIndex);
    } else {
        alert('This is the last image.');
    }
} 



















  function flashScreen() {
    const screen = document.getElementById("Hderid");

    // Tambahkan kelas 'animate' untuk memulai flashing
    screen.classList.add("animate");

    // Hapus kelas 'animate' setelah 500ms agar layar kembali normal
    setTimeout(() => {
        screen.classList.remove("animate");
    }, 1000);
}

// Set interval setiap 5 detik
setInterval(flashScreen, 5000);





function toggleGif() {
    const gif = document.getElementById('thunderGif');
    gif.style.display = 'block';
    // Hide the GIF after 1 second
    setTimeout(() => {
      gif.style.display = 'none';
    }, 1000); // Display for 1 second
  }

  // Run toggleGif every 5 seconds
  setInterval(toggleGif, 5000);
