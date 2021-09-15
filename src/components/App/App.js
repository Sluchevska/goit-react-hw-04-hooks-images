import { Component } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { fetchPics } from '../services/api';
import '../image-finder/styles.css';
import './App.module.css';

export default class App extends Component {
  state = {
    pictureName: '',
    pictures: [],
    selectedImg: null,
    reqStatus: 'idle',
    page: 1,
    showModal: false,
  };

  

  async componentDidUpdate(prevProps, prevState) {
    const nextSearch = this.state.pictureName;
    const nextPage = this.state.page;
    if (prevState.pictureName !== nextSearch || prevState.page !== nextPage) {
      try {
        this.setState({ reqStatus: 'pending' });
        const pictures = await fetchPics(nextSearch, nextPage);
         this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures],
        reqStatus: 'resolved'
        }))
        if (nextSearch.trim() === '' || pictures.length === 0) {
          return toast.error(
            `Sorry, but there are no pictures with  ${nextSearch}`,
          );
        }
      } catch (error) {
        this.setState({ reqStatus: 'rejected' });
        toast.error('Something went wrong');
      }

      this.state.page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    }
  }

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  loadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSelectedImage = largeImageUrl => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImg: largeImageUrl,
    }));
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
       selectedImg: '',
    }));
     };

  render() {
    const { pictures, reqStatus, selectedImg, showModal } = this.state;

    const showButton = pictures.length >= 12;

    return (
      <div>
        <Toaster />
        <SearchBar onSearch={this.handleFormSubmit} />
        <ImageGallery pictures={pictures} onSelect={this.handleSelectedImage} />
          {reqStatus === 'pending' && <Loader />}
        {showButton && <Button onClick={this.loadMoreBtnClick} />}
        {showModal && (
          <Modal
            src={selectedImg.largeImageURL}
            alt={selectedImg.tags}
            onClose={this.toggleModal}
          />
        )}
       
      </div>
    );
  }
}
