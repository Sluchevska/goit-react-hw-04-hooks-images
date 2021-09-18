import axios from 'axios';

const getImageByAxios = axios.create({
  baseURL: 'https://pixabay.com',

  method: 'GET',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    key: '22597300-51a9bfff07e627635843c3062',
  },
});

export const fetchPics = async (pictureName, page) => {
  const {
    data: { hits },
  } = await getImageByAxios(`/api/?q=${pictureName}&page=${page}&per_page=12`);
  return hits;
};
