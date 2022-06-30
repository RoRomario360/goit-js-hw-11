import axios from 'axios';
import Notiflix from 'notiflix';

export default async function fetchPhotos(value) {
  return await axios({
    url: ' https:pixabay.com/api/',
    params: {
      key: '28345018-0c1af10fb3ec556a31002db0e',
      q: value,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page: 1,
      per_page: 40,
    },
  }).catch(error => console.log(error));
}
