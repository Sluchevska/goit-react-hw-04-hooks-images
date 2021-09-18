import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { fetchPics } from '../services/api';
import '../image-finder/styles.css';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [reqStatus, setReqStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    if (!pictureName) return;

    setReqStatus('pending');
    async function getFetchImg() {
      try {
        const pictures = await fetchPics(pictureName, page);
        if (pictureName.trim() === '' || pictures.length === 0) {
          return toast.error(
            `Sorry, but there are no pictures with  ${pictureName}`,
          );
        }

        setPictures(prevPictures => [...prevPictures, ...pictures]);
        setReqStatus('resolved');

        page > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
      } catch (error) {
        setReqStatus('rejected');
        toast.error('Something went wrong');
      }
    }

    getFetchImg();
  }, [page, pictureName]);

  const handleFormSubmit = pictureName => {
    resetSearch();
    setPictureName(pictureName);
  };
  const handleSelectedImage = (largeImageUrl, tags) => {
    setShowModal(!showModal);
    setSelectedImg(largeImageUrl);
    setAlt(tags);
  };
  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
    setSelectedImg('');
  };
  const resetSearch = () => {
    setPage(1);
    setPictureName('');
    setPictures([]);
    setSelectedImg(null);
    setReqStatus('idle');
  };

  const showButton = pictures.length >= 12;

  return (
    <div>
      <Toaster />
      <SearchBar onSearch={handleFormSubmit} />
      <ImageGallery pictures={pictures} onSelect={handleSelectedImage} />
      {reqStatus === 'pending' && <Loader />}
      {showButton && <Button onClick={loadMoreBtnClick} />}
      {showModal && (
        <Modal src={selectedImg} tags={alt} onClose={toggleModal} />
      )}
    </div>
  );
}
