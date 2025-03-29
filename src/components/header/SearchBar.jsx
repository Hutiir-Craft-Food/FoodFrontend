import { useState, useEffect } from 'react'
import styles from './SearchBar.module.scss'

export default function SearchBar({ isScrolled, handleSearch }) {
  const [searchText, setSearchItem] = useState('')

  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setSearchItem(searchItem)
  }

  return (
    <div className={`${styles.searchContainer}  ${isScrolled && styles.stickySearchContainer}`}>
      <input type='search' placeholder='Я шукаю . . .' value={searchText} onChange={handleInputChange} />
      <button className={styles.magnifyingGlass} onClick={() => handleSearch()}>
        <img className={styles.magnifyingGlass} src='/images/magnifying-glass.svg' alt='magnifyingGlass' />
      </button>
    </div>
  )
}
