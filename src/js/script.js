// Twój unikalny klucz API Pixabay
const API_KEY = '46058905-76d6ace161caaf887286baf22';

// Pobierz elementy DOM
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

let lightbox = new SimpleLightbox('.gallery a');

// Funkcja wysyłająca zapytanie do API Pixabay
async function fetchImages(query) {
  const endpoint = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    showLoader();
    const response = await fetch(endpoint);
    const data = await response.json();
    hideLoader();

    if (data.hits.length > 0) {
      clearGallery();
      displayImages(data.hits);
    } else {
      clearGallery();
      iziToast.error({
        title: 'Oops!',
        message:
          'Przepraszamy, nie ma obrazów zgodnych z wyszukiwaniem. Spróbuj ponownie!',
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    console.error('Błąd podczas pobierania obrazów:', error);
    iziToast.error({
      title: 'Błąd',
      message:
        'Wystąpił problem z pobieraniem obrazów. Spróbuj ponownie później.',
      position: 'topRight',
    });
  }
}

// Funkcja wyświetlająca obrazy w galerii
function displayImages(images) {
  const markup = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="card">
            <img src="${image.webformatURL}" alt="${image.tags}" />
            <div class="info">
                <p><strong>Likes:</strong> ${image.likes}</p>
                <p><strong>Views:</strong> ${image.views}</p>
                <p><strong>Comments:</strong> ${image.comments}</p>
                <p><strong>Downloads:</strong> ${image.downloads}</p>
            </div>
        </a>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// Funkcja czyszcząca galerię
function clearGallery() {
  gallery.innerHTML = '';
}

// Pokaż wskaźnik ładowania
function showLoader() {
  loader.classList.remove('hidden');
}

// Ukryj wskaźnik ładowania
function hideLoader() {
  loader.classList.add('hidden');
}

// Obsługa formularza wyszukiwania
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = document.getElementById('search-query').value.trim();

  if (query) {
    fetchImages(query);
  } else {
    iziToast.warning({
      title: 'Uwaga',
      message: 'Proszę wprowadzić słowo kluczowe do wyszukiwania.',
      position: 'topRight',
    });
  }
});
