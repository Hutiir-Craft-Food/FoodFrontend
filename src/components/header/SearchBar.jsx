import { useState } from 'react'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  const [searchText, setSearchItem] = useState('')

  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setSearchItem(searchItem)
  }

  const handleSearch = () => {}

  return (
    <div className={styles.searchContainer}>
      <input
        type="search"
        placeholder="Я шукаю . . ."
        value={searchText}
        onChange={handleInputChange}
      />
      <button className={styles.magnifyingGlass} onClick={() => handleSearch()}>
        <img
          className={styles.magnifyingGlass}
          src="/images/magnifying-glass.svg"
          alt="magnifyingGlass"
        />
      </button>
    </div>
  )
}
