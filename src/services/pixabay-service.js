import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '34142408-3f34271d8b77d4eea7c8c3026';

export const getImgCollection = async (query, page) => {
  const options = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const { data } = await axios.get('/api/', { params: options });

  return data;
};
