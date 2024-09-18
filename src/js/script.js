// Twój unikalny klucz dostępu do Pixabay
const API_KEY = '46058905-76d6ace161caaf887286baf22';

// Nasłuchiwanie na formularz wyszukiwania
document
  .getElementById('search-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Pobranie wartości z pola wyszukiwania
    const query = document.getElementById('search-query').value;

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
      if (data.hits.length > 0) {
        displayImages(data.hits);
      } else {
        showNoResultsMessage();
      }
    })
    .catch(error => {
      console.error('Błąd:', error);
    });
}

function displayImages(images) {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = ''; // Wyczyszczenie galerii

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    gallery.appendChild(imgElement);
  });
}

function showNoResultsMessage() {
  iziToast.info({
    title: 'Brak wyników',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}
