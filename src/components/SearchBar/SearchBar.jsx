import { IoSearchOutline } from 'react-icons/io5';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

export default function SearchBar({ onInput }) {

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (form.elements.topic.value.trim() === '') {
     
      toast.error('Please fill the search field.', {duration: 1600});

      return;
    } else {
      onInput(form.elements.topic.value);
    }
    form.reset();
  };

 
  return (
    <header className={css.searchBarHeader}>
      <div className={css.searchBarWraper}>
        <form className={css.searchBarForm} onSubmit={handleSubmit}>
          <input
            className={css.searchBarInput}
            type="text"
            name="topic"
            placeholder="Search images and photos"
            autoFocus
          />
          <button className={css.searchBarButton}>
            <IoSearchOutline className={css.searchBarButtonIcon} />
          </button>
        </form>
      </div>
      <Toaster />
    </header>
  );
}
