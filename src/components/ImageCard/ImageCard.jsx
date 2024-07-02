import css from "./ImageCard.module.css"
export default function ImageCard({ item }) {
  const { urls, alt_description } = item;
  return (
    <div className={css.imageCardWraper}>
      <a href={urls.regular}>
        <img className ={css.imageCardImg} src={urls.small} alt={alt_description} target="_blank" rel="noreferrer noopener"/>
      </a>
    </div>
  );
}
