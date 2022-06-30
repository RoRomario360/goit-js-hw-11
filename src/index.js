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

//scroll
let query = '';
let page = 0;
const target = document.querySelector('.target');
const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(updatePhotos, options);
//
const searchForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');
//addlistners
searchForm.addEventListener('submit', onFormSubmit);

//form
function onFormSubmit(e) {
  e.preventDefault();
  galleryBox.innerHTML = '';
  observer.unobserve(target);
  page = 0;
  query = e.target.elements.searchQuery.value;

  fetchPhotos(query).then(response => {
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    //
    if (response.data.hits.length) {
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }
    renderCards(response.data.hits);
    observer.observe(target);
  });
}
//render

function renderCards(images) {
  const listOfPhotos = images
    .map(image => {
      return `<div class="photo-card">
  <a class="card-link" href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
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
  //FIXME:
  galleryBox.insertAdjacentHTML('beforeend', listOfPhotos);
  const lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });
  lightbox.refresh();
}

//scroll
function updatePhotos(entries) {
  // console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      fetchPhotos(query, page).then(response => {
        //FIXME:
        if (data.hits.length === 0) {
          Notiflix.Notify.failure(
            `We're sorry, but you've reached the end of search results.`
          );
        }
        renderCards(response.data.hits);
      });
    }
  });
}
//
