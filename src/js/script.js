// Twój unikalny klucz API Pixabay
const API_KEY = '46058905-76d6ace161caaf887286baf22';

// Inicjalizacja SimpleLightbox
let lightbox = new SimpleLightbox('#image-gallery a');

// Element wskaźnika ładowania
const loadingIndicator = document.getElementById('loading-indicator');

// Nasłuchiwanie na formularz wyszukiwania
document
  .getElementById('search-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Pobranie wartości z pola wyszukiwania
    const query = document.getElementById('search-query').value;

    // Włączenie wskaźnika ładowania
    showLoadingIndicator();

    // Wysyłanie zapytania do API Pixabay
    searchImages(query);
  });

function searchImages(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      hideLoadingIndicator(); // Wyłączenie wskaźnika ładowania

      if (data.hits.length > 0) {
        displayImages(data.hits);
      } else {
        showNoResultsMessage();
      }
    })
    .catch(error => {
      hideLoadingIndicator(); // Wyłączenie wskaźnika w przypadku błędu
      console.error('Błąd:', error);
    });
}

function displayImages(images) {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = ''; // Wyczyszczenie galerii

  images.forEach(image => {
    const anchorElement = document.createElement('a');
    anchorElement.href = image.largeImageURL; // Odnośnik do dużej wersji obrazu
    anchorElement.dataset.lightbox = 'gallery'; // Atrybut dla SimpleLightbox

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL; // Mniejsza wersja obrazu dla galerii
    imgElement.alt = image.tags;

    anchorElement.appendChild(imgElement);
    gallery.appendChild(anchorElement);
  });

  lightbox.refresh(); // Odśwież lightbox po dodaniu nowych elementów
}

function showNoResultsMessage() {
  iziToast.info({
    title: 'Brak wyników',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}

// Funkcja do włączenia wskaźnika ładowania
function showLoadingIndicator() {
  loadingIndicator.style.display = 'block';
}

// Funkcja do wyłączenia wskaźnika ładowania
function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}
