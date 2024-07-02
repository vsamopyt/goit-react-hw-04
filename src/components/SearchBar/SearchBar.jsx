// import { CiSearch } from "react-icons/ci";
import { IoSearchOutline } from 'react-icons/io5';
import css from './SearchBar.module.css';
import {useState} from "react"
// import {useState} from "react"

export default function SearchBar({ onInput }) {
  const[toast, setToast] = useState(false)
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    onInput(form.elements.topic.value);
    if(form.elements.topic.value === "") {
        setToast(true)
    }
    form.reset();
  };

  return (
    <header className={css.searchBarHeader}>
      <div className={css.searchBarWraper}>
        <form className={css.searchBarForm} onSubmit={handleSubmit}>
          <input className={css.searchBarInput} type="text" name="topic" placeholder="Search images and photos" autoFocus/>
          <button className={css.searchBarButton}>
            <IoSearchOutline className={css.searchBarButtonIcon} />
          </button>
        </form>

      </div>
      {toast && <p>Toast</p>} 
    </header>
  );
}
