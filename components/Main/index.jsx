"use client";
import React, { useState } from "react";
import style from "./index.module.scss";
import Operation from "./components/Operation";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function index() {
  const [file, setFile] = useState(null);
  const [isOperate, setIsOperation] = useState(true);

  return (
    <div className={style.mainContainer}>
      <h1 className="text-center text-[#000] text-[3rem]">Rotate PDF Pages</h1>
      <p className="text-center my-[20px]">
        Simply click on a page to rotate it. You can then download your <br /> modified PDF.
      </p>
      {!isOperate ? (
        <div>
          <input
            accept=".pdf"
            type="file"
            name=""
            id="upload-input"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setIsOperation(true);
            }}
          />
          <label htmlFor="upload-input" className={style.uploadBox}>
            <img src="/icons/upload.svg" className="w-[30px] h-[30px]" alt="" />
            <br />
            <span>Click to upload or drag and drop</span>
          </label>
        </div>
      ) : (
        <Operation file={file} onClose={() => setIsOperation(false)} />
      )}
    </div>
  );
}
