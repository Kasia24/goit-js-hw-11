// Twój unikalny klucz API Pixabay
const API_KEY = '46058905-76d6ace161caaf887286baf22';

// Pobierz elementy z DOM
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loadingSpinner = document.getElementById('loading-spinner');

// Inicjalizacja SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a');

// Funkcja pobierająca obrazy z Pixabay
async function fetchImages(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    showLoadingSpinner();
    const response = await fetch(url);
    const data = await response.json();
    hideLoadingSpinner();

    if (data.hits.length > 0) {
      displayImages(data.hits);
    } else {
      iziToast.error({
        title: 'Błąd',
        message: 'Przepraszamy, nie znaleziono wyników dla tego zapytania.',
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoadingSpinner();
    iziToast.error({
      title: 'Błąd',
      message:
        'Wystąpił problem z pobraniem obrazów. Spróbuj ponownie później.',
      position: 'topRight',
    });
    console.error(error);
  }
}

// Funkcja wyświetlająca obrazy
function displayImages(images) {
  gallery.innerHTML = '';
  images.forEach(image => {
    const markup = `
            <a href="${image.largeImageURL}" class="card">
                <img src="${image.webformatURL}" alt="${image.tags}">
                <div class="info">
                    <p><strong>Likes:</strong> ${image.likes}</p>
                    <p><strong>Views:</strong> ${image.views}</p>
                    <p><strong>Comments:</strong> ${image.comments}</p>
                    <p><strong>Downloads:</strong> ${image.downloads}</p>
                </div>
            </a>
        `;
    gallery.insertAdjacentHTML('beforeend', markup);
  });
  lightbox.refresh(); // Odśwież lightbox po dodaniu nowych elementów
}

// Funkcja pokazująca wskaźnik ładowania
function showLoadingSpinner() {
  loadingSpinner.classList.remove('hidden');
}

// Funkcja ukrywająca wskaźnik ładowania
function hideLoadingSpinner() {
  loadingSpinner.classList.add('hidden');
}

// Obsługa formularza
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const query = input.value.trim();
  if (query) {
    fetchImages(query);
  } else {
    iziToast.warning({
      title: 'Uwaga',
      message: 'Proszę wprowadzić słowo kluczowe.',
      position: 'topRight',
    });
  }
});
