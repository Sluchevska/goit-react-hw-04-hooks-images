import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
const keyApi = '22597300-51a9bfff07e627635843c3062';

export const fetchPics = async (pictureName, page) => {
  const {data} = await axios.get(
    `/api/?q=${pictureName}&page=${page}&key=${keyApi}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return data.hits;
};