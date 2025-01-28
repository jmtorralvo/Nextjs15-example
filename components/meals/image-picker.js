'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImg, setPickedImg] = useState();
  const imageInputRef = useRef();

  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(ev) {
    const file = ev.target.files[0];
    if (!file) {
      setPickedImg(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImg(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImg && <p>No image picked yet.</p>}
          {pickedImg && (
            <Image src={pickedImg} alt="The image selected by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
