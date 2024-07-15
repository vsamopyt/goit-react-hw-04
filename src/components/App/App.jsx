import { useState, useEffect } from 'react';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import BarLoader from 'react-spinners/BarLoader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchImagesByTopic } from '../../images-api';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import toast, { Toaster } from 'react-hot-toast';
import ImageModal from '../ImageModal/ImageModal';

function App() {
  const [listImages, setlistImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [schowBtn, setSchowBtn] = useState(false);


  const handleTopic = async newTopic => {
    if (topic === newTopic) {
      toast.error(
        'You set the same search request. If you want to see more pictures on your request, click the button "Load more" or set new search request.',
        { duration: 10000 }
      );
      return;
    }
    setTopic(newTopic);
    setlistImages([]);
    setCurrentPage(1);
    setSchowBtn(false);
  };


  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };


  //  modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedAlt, setSelectedAlt] = useState('');
  const [selectedImgLikes, setSelectedImgLikes] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');


  const openModal = (image, alt, likes, userName) => {
    setSelectedImage(image);
    setIsOpen(true);
    setSelectedAlt(alt);
    setSelectedImgLikes(likes);
    setSelectedUserName(userName);
  };


  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage('');
    setSelectedAlt('');
    setSelectedImgLikes('');
    setSelectedUserName('');
  };


  useEffect(() => {
    if (topic === '') {
      return;
    }
    const getImages = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetchImagesByTopic(topic, currentPage);

        const data = response.results;

        if (currentPage >= response.total_pages) {
          setSchowBtn(true);

          toast.success('We can find  no more pictures for this search request', {
            duration: 1600,
          });
        }

        setlistImages(previousData => {
          return [...previousData, ...data];
        });

      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [topic, currentPage]);

  return (
    <div className={css.appWraper}>
      <SearchBar onInput={handleTopic} />

      {error && <ErrorMessage />}

      {listImages.length > 0 && (
        <ImageGallery array={listImages} onImageClick={openModal} />
      )}
      {loading && (
        <div className={css.barLoader}>
          {' '}
          <BarLoader />
        </div>
      )}

      {listImages.length > 0 && !loading && !schowBtn && (
        <LoadMoreBtn onHandle={handleLoadMore} />
      )}

      <ImageModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage}
        alt={selectedAlt}
        likes={selectedImgLikes}
        userName={selectedUserName}
      />
      <Toaster />
    </div>
  );
}

export default App;
