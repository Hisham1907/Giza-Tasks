import React from 'react'
import styles from './Input.module.css'
const Input = ({label,id,type,value,onClick,onChange,placeholder,disabled,className}) => {
  return <div className={`${styles.inputBox}`}>
  <label htmlFor={id}>{label} </label>
  <input type={type} id={id} className={className} value={value} onChange={onChange} onClick={onClick} placeholder={placeholder}   disabled={disabled} autoComplete="off" title=""/>
</div>
}

export default Input;
