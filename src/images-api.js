import axios from 'axios';

const accesKey = 'cZ-MFVyM7oimReB-5_cwTBy1PuN0gxZ0UbQfuk-h5hY';

const perPage = 12;

axios.defaults.headers.common['Authorization'] = `Client-ID ${accesKey}`;
axios.defaults.headers.common['Accept-Version'] = `1`;
axios.defaults.baseURL = `https://api.unsplash.com`;

export async function fetchImagesByTopic(topic, currentPage) {
  const response = await axios.get('/search/photos', {
    params: {
      query: topic,
      page: currentPage,
      per_page: perPage,
      orientation: 'landscape',
    },
  });

  return response.data;
}
