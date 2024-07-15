import ImageCard from '../ImageCard/ImageCard';
import css from "./ImageGallery.module.css"
export default function ImageGallery({ array, onImageClick }) {
  return (
    <section className={css.imageGallery}>
      <div className={css.imageGalleryWraper}>
        <ul className={css.imageGalleryList}>
          {array.map(item => {
            return (
              <li key={item.id}>
                <ImageCard item={item}
                onImageClick ={onImageClick}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
