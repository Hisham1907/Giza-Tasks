import React from 'react'
import styles from './CustomButton.module.css'
const CustomButton = ({onClick , children,className}) => {
  return <button className={`${styles.customBtn} ${className}`} onClick={onClick}>
  {children}
 </button>
}

export default CustomButton;
