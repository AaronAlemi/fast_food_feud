import * as React from "react"
import "./Chip.css"
import { useState } from "react"

export function Chip({ label = "", isActive = false, onClick = () => {}, onClose = () => {} }) {
  let buttonClassName;
  if (isActive == false) {
    buttonClassName = "chip"
  }
  else {
    buttonClassName = "chip active"
  }

  
  return (
    <button onClick={onClick} className={buttonClassName}>
      <p className="label">{label}</p>
      <span className="close" onClick={event => {onClose(); event.stopPropagation()} } role="button">{`X`}</span>
    </button>
  )
}

export default Chip
