import ReactModal from 'react-modal';
import css from "./ImageModal.module.css"

// import React from 'react';

// import styled from 'styled-components';

// ReactModal.setAppElement('#root');

// const modalStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     background: 'black',
//     padding: '0',
//     border: 'none',
//     borderRadius: '10px',
//     overflow: 'hidden',
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.75)',
//   },
// };

// const CloseButton = styled.span`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   font-size: 24px;
//   cursor: pointer;
//   color: white;
//   z-index: 1;
// `;

// export default function ImageModal ({ isOpen, onRequestClose, imageUrl }) (
//   <ReactModal
//     isOpen={isOpen}
//     onRequestClose={onRequestClose}
//     style={modalStyles}
//     contentLabel="Image Modal"

//   >
//      <button onClick={onRequestClose}>&times;</button>
//     {/* <CloseButton onClick={onRequestClose}>&times;</CloseButton> */}
//     <img src={imageUrl} alt="Selected" style={{ width: '100%' }} />
//   </ReactModal>
// )


const ImageModal = ({ isOpen, onRequestClose, imageUrl,alt, likes, userName }) => (
    <ReactModal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      contentLabel="Image Modal"
      ariaHideApp={false}
    >
       
        <button className= {css.imageModalBtn} onClick={onRequestClose}>&times;</button>
        <h3>{alt}</h3>
      {/* <CloseButton onClick={onRequestClose}>&times;</CloseButton> */}
      <img src={imageUrl} alt="Selected" style={{ width: '100%' }} />
      <div className={css.imageModalDesc}>
      <div> <span>Author: </span><span>{userName }</span></div>
      <div> <span>Likes: </span><span>{likes}</span></div>
      </div>
      
    </ReactModal>
  );
  
//   const CloseButton = styled.span`
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     font-size: 24px;
//     cursor: pointer;
//     color: white;
//     z-index: 1;
//   `;
  
  const modalStyles = {
    content: {
    // maxWidth:"100%",
    // height:"100%",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'black',
      padding: '0',
      border: 'none',
      borderRadius: '10px',
      overflow: 'hidden',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };
  
  export default ImageModal;
  
