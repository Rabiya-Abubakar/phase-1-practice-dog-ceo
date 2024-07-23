// URL for fetching dog images
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

// URL for fetching dog breeds
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Variable to store all breeds
let allBreeds = {};

// Function to fetch and display images
function fetchAndDisplayImages() {
  fetch(imgUrl)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      const imageContainer = document.getElementById('dog-image-container');
      if (imageContainer) {
        data.message.forEach(imgSrc => {
          const imgElement = document.createElement('img');
          imgElement.src = imgSrc;
          imgElement.alt = 'A random dog';
          imgElement.style.width = '200px';
          imgElement.style.height = 'auto';
          imageContainer.appendChild(imgElement);
        });
      } else {
        console.error('Image container not found');
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}

// Function to fetch and display dog breeds
function fetchAndDisplayBreeds() {
  fetch(breedUrl)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      const breedsList = document.getElementById('dog-breeds');
      if (breedsList) {
        breedsList.innerHTML = '';
        allBreeds = data.message;

        for (const breed in allBreeds) {
          const listItem = document.createElement('li');
          listItem.textContent = breed;
          listItem.addEventListener('click', () => {
            listItem.style.color = 'blue'; // Change color on click
          });
          breedsList.appendChild(listItem);
        }
      } else {
        console.error('Breeds list not found');
      }
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
}

// Function to filter breeds based on selected letter
function filterBreeds() {
  const dropdown = document.getElementById('breed-dropdown');
  const breedsList = document.getElementById('dog-breeds');
  
  if (dropdown && breedsList) {
    dropdown.addEventListener('change', () => {
      const selectedLetter = dropdown.value;
      breedsList.innerHTML = ''; // Clear the existing list

      for (const breed in allBreeds) {
        if (breed.startsWith(selectedLetter)) {
          const listItem = document.createElement('li');
          listItem.textContent = breed;
          listItem.addEventListener('click', () => {
            listItem.style.color = 'blue'; // Change color on click
          });
          breedsList.appendChild(listItem);
        }
      }
    });
  } else {
    console.error('Dropdown or breeds list not found');
  }
}

// Run the functions when the page has fully loaded
window.addEventListener('load', () => {
  fetchAndDisplayImages();
  fetchAndDisplayBreeds();
  filterBreeds(); // Set up the filter functionality
});
