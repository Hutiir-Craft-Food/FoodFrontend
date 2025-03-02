import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
    return (
        <div className={styles.notFoundPage}>
            <i className="fa-solid fa-robot"></i>
            <p>Oops, something went wrong...</p>
        </div>
    )
}