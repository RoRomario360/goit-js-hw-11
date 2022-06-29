import fetchPhotos from './js/api/fetchPhoto';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './css/styles.css';
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  closeButton: false,
});

//refs

const searchForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');
//addlistners
searchForm.addEventListener('submit', onFormSubmit);

//form
function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;

  fetchPhotos(query).then(response => {
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure('Oops');
    }
    renderCards(response.data.hits);
  });
}
//render

function renderCards(images) {
  const listOfPhotos = images
    .map(image => {
      return `<div class="photo-card">
  <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  galleryBox.insertAdjacentHTML('afterbegin', listOfPhotos);
  const lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });
}
