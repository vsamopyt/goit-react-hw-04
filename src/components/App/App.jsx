import { useState, useEffect } from 'react';
import axios from 'axios';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import BarLoader from "react-spinners/BarLoader";

function App() {

  const [topic, setTopic] = useState('');
  const handleTopic = value => {
    setTopic(value);
  };

  const [listImages, setlistImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(false)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);

        const accesKey = 'cZ-MFVyM7oimReB-5_cwTBy1PuN0gxZ0UbQfuk-h5hY';
        const perPage = 5;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Client-ID ${accesKey}`;
        axios.defaults.headers.common['Accept-Version'] = `1`;

        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: topic,
              per_page: perPage,
              orientation: 'landscape',
            },
          }
        );
        console.log(topic);

        console.log(response.data.results);
        console.log(response);

        setlistImages(response.data.results);
        console.log('sssss', response.data.results);
      } catch (error) {
        
        console.log("Error",error);
        setError(true)
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [topic]);

  return (
    <div className={css.appWraper}>
      <SearchBar onInput={handleTopic} />
     
      {error&& <p>Whoops, something went wrong! Please try reloading this page!</p>}
     
      {listImages.length > 0 && <ImageGallery array={listImages} />}
      {loading && 
      <div className={css.barLoader}> <BarLoader/></div>}

      {/* <p>{topic}</p> */}
    </div>
  );

  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App;
