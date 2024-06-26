import React from 'react';
import SingInForm from '../SingInForm/SingInForm';
import styles from './ModalWindow.module.scss';


export default function Modal({ show, handleClose, form}) {
    console.log(form);
    return (
        <>
            {show && (
                <div className={styles.overlay} onClick={handleClose}></div>
            )}
            {show && (
                <div className={styles.modal} >
                        {/* <span className={styles.closeButton} onClick={handleClose}>&times;</span> */}
                        {form}
                </div>
            )}
        </>
    );
};

