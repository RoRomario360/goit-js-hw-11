import axios from 'axios';
import Notiflix from 'notiflix';

export default async function fetchPhotos(value, page) {
  const response = await axios({
    url: 'https:pixabay.com/api/',
    params: {
      key: '28345018-0c1af10fb3ec556a31002db0e',
      q: value,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page: page,
      per_page: 200,
    },
  });
  return response;
}
//test
