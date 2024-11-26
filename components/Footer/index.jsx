import React from "react";
import style from "./index.module.scss";

export default function Footer() {
  const list = [
    {
      title: "Product",
      list: ["Use cases", "Chrome extension", "API docs", "Pricing", "Video tutorials", "Resources", "Blog", "FAQ"],
    },
    {
      title: "We also built",
      list: [
        "Resume AI Scanner",
        "Invoice AI Scanner",
        "AI Quiz Generator",
        "QuickyAI",
        "Docsium",
        "PDF GPTs",
        "PDF AI generator",
        "Other PDF tools",
      ],
    },
    {
      title: "Company",
      list: ["PDF.ai vs ChatPDF", "PDF.ai vs Acrobat Reader", "Legal", "Affiliate program 💵", "Investor"],
    },
  ];
  return (
    <div className={style.footerContainer}>
      <img src="/logo.png" className="w-[50px] h-[50px] block mb-[80px]" />
      <span>Chat with any PDF: ask questions, get summaries, find information, and more.</span>
      <div className="flex gap-[20px]">
        <img src="/icons/douyin.svg" alt="" className={style.icon} />
        <img src="/icons/ins.svg" alt="" className={style.icon} />
        <img src="/icons/twitter.svg" alt="" className={style.icon} />
        <img src="/icons/youtube.svg" alt="" className={style.icon} />
      </div>
      <div className={style.introduce}>
        {list.map((item) => {
          return (
            <div key={item.title} className="mb-[40px]">
              <h3 className="font-bold text-[#000]">{item.title}</h3>
              {item.list.map((text) => {
                return <div key={text} className={style.text}>{text}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
