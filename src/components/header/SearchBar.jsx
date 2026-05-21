import { useState } from 'react'
import styles from './SearchBar.module.scss'
import MagnifyingGlass from '~/icons/MagnifyingGlass'

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
        <MagnifyingGlass />
      </button>
    </div>
  )
}
