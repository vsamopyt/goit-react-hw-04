import { useState, useEffect } from 'react';
// import axios from 'axios';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import BarLoader from 'react-spinners/BarLoader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchImagesByTopic } from '../../images-api';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import toast, { Toaster } from 'react-hot-toast';

import ImageModal from '../ImageModal/ImageModal';
import ReactDOM from 'react-dom';


// import { SiTruenas } from 'react-icons/si';
// import styled from 'styled-components';



function App() {
 


  // const hanleLoadMore = () => {
  //   setCurrentPage(currentPage+1)
  // }

  const [listImages, setlistImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] =useState(false)
  const [schowBtn, setSchowBtn] =useState(false)

  
  const handleTopic = async (newTopic) => {
    if (topic === newTopic) {
      toast.error("You fill the same search request. If you want to see more pictures on your request, click the button Load more or set new search request",{duration: 10000})
      return
    }
   
    setTopic(newTopic);

    setlistImages([]);
    setCurrentPage(1)
    // setTotalPage(false)
    setSchowBtn(false)

  };

    const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
   
  }

  //  modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedAlt, setSelectedAlt] = useState('');
  const [selectedImgLikes, setSelectedImgLikes] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  

  const openModal = (image, alt, likes, userName) => {
    setSelectedImage(image);
    setIsOpen(true);

    setSelectedAlt(alt)
    setSelectedImgLikes(likes)
    setSelectedUserName(userName)
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage('');

    setSelectedAlt("")
    setSelectedImgLikes("")
    setSelectedUserName("")
  };

  

useEffect (()=>{
  if(topic === "") {
    return
  }
  const getImages = async () => {
    try {
          setLoading(true);
          setError(false)
    console.log(topic);
          const response = await fetchImagesByTopic(topic, currentPage);
          console.log(response);
          const data = response.results;
        console.log(response.total_pages);


        // if(currentPage === response.total_pages) {
          // console.log(currentPage);
          // console.log(response.total_pages);
          // console.log(response.total_pages === currentPage );
          console.log(response.total_pages);
          console.log(response);
          console.log(data.length);
      
          // if(currentPage >= response.total_pages) {
            if(currentPage >= response.total_pages) {
            // console.log(response.page);
          
            setSchowBtn(true)
            console.log();
            console.log(response.total_pages);
            toast.success("There are no more pictures for this request", {duration: 1600})
          }
        //   setTotalPage(true)
        //   console.log(totalPage);
        // }
        // console.log();

          console.log(data);
          // console.log(data.results);
    
          setlistImages((previousData)=>{
            return [...previousData, ...data]
          });


       

        console.log(data);

        } catch (error) {
         
          setError(true);
        } finally {
          setLoading(false);
        }
  }
  getImages()
}, [topic, currentPage])





  return (
    <div className={css.appWraper}>
      <SearchBar onInput={handleTopic} />
    

      {error && <ErrorMessage />}

      {listImages.length > 0 && <ImageGallery array={listImages} onImageClick ={openModal} />}
      {loading && (
        <div className={css.barLoader}>
          {' '}
          <BarLoader />
        </div>
      )}

{/* <button onClick = {handleLoadMore}>Load more</button> */}
{listImages.length > 0 && !loading  && !schowBtn && <LoadMoreBtn onHandle = {handleLoadMore}/>}

<ImageModal 
        isOpen={isOpen}
        onRequestClose={closeModal} 
        imageUrl={selectedImage}
        alt = {selectedAlt}
        likes = {selectedImgLikes}
        userName= {selectedUserName}
      />

<Toaster/>
    </div>
  );
}

export default App;
