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

function App() {
 


  // const hanleLoadMore = () => {
  //   setCurrentPage(currentPage+1)
  // }

  const [listImages, setlistImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] =useState(false)

  const handleTopic = async (newTopic) => {
    setTopic(newTopic);
    setlistImages([]);
    setCurrentPage(1)
    setTotalPage(false)

  };

    const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
   
  }

  //   useEffect(() => {

  //     async function fetchImages() {
  //       try {
  //         setLoading(true);

  //         const accesKey = 'cZ-MFVyM7oimReB-5_cwTBy1PuN0gxZ0UbQfuk-h5hY';
  //         const perPage = 5;
  //         axios.defaults.headers.common[
  //           'Authorization'
  //         ] = `Client-ID ${accesKey}`;
  //         axios.defaults.headers.common['Accept-Version'] = `1`;

  //         const response = await axios.get(
  //           `https://api.unsplash.com/search/photos`,
  //           {
  //             params: {
  //               query: topic,
  //               per_page: perPage,
  //               orientation: 'landscape',
  //             },
  //           }
  //         );

  //         setlistImages(response.data.results);

  //       } catch (error) {

  //         console.log("Error",error);
  //         setError(true)
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  // if ( topic !== "") {
  //   setlistImages([])
  //   fetchImages();
  // }
  // else {
  //   return
  // }
  //   }, [topic]);

  // VARIANT 2 HTTP request on useEffeect mont. un click

  // useEffect(() => {
  //   async function fetchImages() {
  //     try {
  //       setLoading(true);

  //       const data = await fetchImagesByTopic(topic);
  //       console.log(data);

  //       setlistImages(data);
  //     } catch (error) {
  //       console.log('Error', error);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (topic !== '') {
  //     setlistImages([]);
  //     fetchImages();
  //   } else {
  //     return;
  //   }
  // }, [topic]);

  //  Variant 3 move http in search component
  // const handleTopic = async topic => {
  //   try {
  //     setLoading(true);
  //     setlistImages([]);
  //     setError(false)

  //     const data = await fetchImagesByTopic(topic);
  //     console.log(data);

  //     setlistImages(data);
  //   } catch (error) {
     
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }

    // setTopic(value);
  // };

useEffect (()=>{
  if(topic === "") {
    return
  }
  const getImages = async () => {
    try {
          setLoading(true);
          setError(false)
    
          const response = await fetchImagesByTopic(topic, currentPage);
          console.log(response);
          const data = response.results;
        console.log(response.total_pages);


        // if(currentPage === response.total_pages) {
          console.log(currentPage);
          console.log(response.total_pages);
          console.log(response.total_pages === currentPage );
          if(currentPage === response.total_pages) {
            console.log("aaaaaa");
            setTotalPage(true)
            console.log(totalPage);
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
      {/* {loading && (
        <div className={css.barLoader}>
          {' '}
          <BarLoader />
        </div>
      )} */}

      {error && <ErrorMessage />}

      {listImages.length > 0 && <ImageGallery array={listImages} />}
      {loading && (
        <div className={css.barLoader}>
          {' '}
          <BarLoader />
        </div>
      )}

{/* <button onClick = {handleLoadMore}>Load more</button> */}
{listImages.length > 0 && !loading  && !totalPage && <LoadMoreBtn onHandle = {handleLoadMore}/>}
<Toaster/>
    </div>
  );
}

export default App;
