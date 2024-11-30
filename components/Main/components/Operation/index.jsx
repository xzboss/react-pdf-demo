"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./index.module.scss";
import { Page, Document, pdfjs } from "react-pdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * 
https://file.uhsea.com/2411/5dcdad09abff1b2268aa05f758980cd0YQ.pdf

 */

export default function Operation({ file, onClose }) {
  const A4HW = 99 / 70;
  const minW = 100;
  const maxW = 500;
  const [zoomStatus, setZoomStatus] = useState(0); // 0 可缩放；负 不可缩小；正 不可增大
  const [pagesOption, setPagesOption] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setPagesOption(
      new Array(numPages).fill(0).map((_, index) => ({
        width: 500,
        rotate: 0,
        size: "A4",
      }))
    );
  }

  const rotate = (optionsIndex) => {
    // 全旋
    if (optionsIndex === undefined) {
      pagesOption.forEach((item) => {
        item.rotate += 90;
      });
    } else {
      pagesOption[optionsIndex].rotate += 90;
    }
    setPagesOption([...pagesOption]);
  };

  const zoom = (w) => {
    const newW = pagesOption[0].width + w;
    if (newW > maxW || newW < minW) return;

    pagesOption.forEach((page) => (page.width = newW));
    setZoomStatus(0);
    setPagesOption([...pagesOption]);

    if (newW + w > maxW || newW + w < minW) {
      setZoomStatus(w);
    }
  };

  const download = () => {
    const canvass = document.querySelectorAll(".react-pdf__Page__canvas");
    const canvasImages = [];
    canvass.forEach((canvas) => {
      canvasImages.push(
        html2canvas(canvas).then((canvasCopy) => {
          const imgData = canvasCopy.toDataURL("image/png");
          return imgData;
        })
      );
    });
    Promise.all(canvasImages).then((canvasImages) => {
      const doc = new jsPDF("p", "px", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const currentW = pagesOption[0].width;
      const xOffset = (pageWidth - currentW) / 2;
      const yOffset = (pageHeight - currentW) / 2;

      canvasImages.forEach((imageData) => {
        doc.addImage(imageData, "PNG", xOffset, yOffset, currentW, currentW);
        doc.addPage();
      });

      doc.save("canvas_images.pdf");
    });
  };
  return (
    <div className={style.operationContainer}>
      <div className="flex justify-center items-center gap-[10px]">
        <button className="py-[5px] px-[10px] rounded bg-[#FF6125]" onClick={() => rotate()}>
          Rotate all
        </button>
        <button className="py-[5px] px-[10px] rounded bg-[#000000]" onClick={onClose}>
          Remove PDF
        </button>
        <button className={style.buttonZoomIn + " " + (zoomStatus > 0 ? "opacity-[0.5]" : "")} onClick={() => zoom(50)}>
          <img src="/icons/zoomIn.svg" />
        </button>
        <button
          className={style.buttonZoomOut + " " + (zoomStatus < 0 ? "opacity-[0.5]" : "")}
          onClick={() => zoom(-50)}>
          <img src="/icons/zoomOut.svg" />
        </button>
      </div>
      <div className={style.pdfContainer}>
        <Document
          className="flex gap-[20px] justify-center flex-wrap"
          file={"/1.pdf"}
          onLoadSuccess={onDocumentLoadSuccess}>
          {pagesOption.map((options, index) => {
            return (
              <div className={style.pdfItem} key={index} onClick={(e) => rotate(index)}>
                <div className={style.rotateIcon}>
                  <img src="/icons/reverse.svg" />
                </div>
                <div style={{ height: options.width * A4HW }} className="flex items-center">
                  <Page {...options} pageNumber={index + 1} />
                </div>
                <i className={style.pageNum}>{index + 1}</i>
              </div>
            );
          })}
        </Document>
      </div>
      <button className="block mx-auto py-[5px] px-[10px] rounded bg-[#FF6125]" onClick={download}>
        Download
      </button>
    </div>
  );
}
