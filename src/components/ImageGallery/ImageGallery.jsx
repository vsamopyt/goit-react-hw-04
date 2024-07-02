import ImageCard from '../ImageCard/ImageCard';
import css from "./ImageGallery.module.css"
export default function ImageGallery({ array }) {
  return (
    <section className={css.imageGallery}>
      <div className={css.imageGalleryWraper}>
        <ul>
          {array.map(item => {
            return (
              <li key={item.id}>
                <ImageCard item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
