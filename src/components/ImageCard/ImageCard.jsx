import css from './ImageCard.module.css';
export default function ImageCard({ item, onImageClick }) {
  const { urls, alt_description, likes, user } = item;
  return (
    <div className={css.imageCardWraper}>
      <img
        className={css.imageCardImg}
        src={urls.regular}
        alt={alt_description}
        data-likes={likes}
        data-name={user.name}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() =>
          onImageClick(urls.regular, alt_description, likes, user.name)
        }
      />
    </div>
  );
}
