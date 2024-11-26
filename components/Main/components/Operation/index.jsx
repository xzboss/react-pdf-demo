import React from "react";
import style from "./index.module.scss";

export default function Operation({ file, onClose }) {
  return (
    <div className={style.operationContainer}>
      <div className="flex justify-center items-center gap-[10px]">
        <button className="py-[5px] px-[10px] rounded bg-[#FF6125]">Rotate all</button>
        <button className="py-[5px] px-[10px] rounded bg-[#000000]" onClick={onClose}>Remove PDF</button>
        <button className={style.buttonZoomIn}>
          <img src="/icons/zoomIn.svg" />
        </button>
        <button className={style.buttonZoomOut}>
          <img src="/icons/zoomOut.svg" />
        </button>
      </div>
      <div>
        111111
      </div>
      <button className="block mx-auto py-[5px] px-[10px] rounded bg-[#FF6125]">Download</button>
    </div>
  );
}
