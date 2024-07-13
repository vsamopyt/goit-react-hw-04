import { useState, useEffect } from 'react';
// import axios from 'axios';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import BarLoader from "react-spinners/BarLoader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {fetchImagesByTopic} from "../../images-api"

function App() {

  const [topic, setTopic] = useState('');
  const handleTopic = value => {
    setTopic(value);
  };

  const [listImages, setlistImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(false)



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

  useEffect(() => {


    async function fetchImages() {
      try {
        setLoading(true);

        const data = await fetchImagesByTopic(topic);
        console.log(data);

        setlistImages(data);
        
      } catch (error) {
        
        console.log("Error",error);
        setError(true)
      } finally {
        setLoading(false);
      }
    }
    
if ( topic !== "") {
  setlistImages([])
  fetchImages();
}
else {
  return
}
  }, [topic]);


  //  Variant 3 move http in search component

  return (
    <div className={css.appWraper}>
      <SearchBar onInput={handleTopic} />
      {loading && 
      <div className={css.barLoader}> <BarLoader/></div>}
     
      {error&& <ErrorMessage />}
     
      {listImages.length > 0 && <ImageGallery array={listImages} />}
  
    </div>
  );

  
}

export default App;
