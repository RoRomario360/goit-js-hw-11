import axios from 'axios';
import Notiflix from 'notiflix';

export default async function fetchPhotos(value, page = 1) {
  return await axios({
    url: ' https:pixabay.com/api/',
    params: {
      key: '28345018-0c1af10fb3ec556a31002db0e',
      q: value,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page: 10,
      per_page: 40,
    },
  });
}
//   const BASE_URL = 'https://pixabay.com/api/';
//   const key = '28345018-0c1af10fb3ec556a31002db0e';
//
//   const searchUrl =
//     '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

//   const search = fetch(
//     `${BASE_URL}?key=${key}&q=${value}${searchUrl}&page=${page}`
//   )
//     .then(data => {
//       if (!data.ok) {
//         throw new Error(data.status);
//       }
//       return data.json();
//     })
//     .catch(error => {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//     });
//   return search;
