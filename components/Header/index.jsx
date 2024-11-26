"use client";
import React, { useState } from "react";
import style from "./index.module.scss";

export default function Header() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className={style.headerContainer}>
      <div className="flex items-center">
        <img src="/icons/logo.svg" className="w-[30px] h-[30px]" />
        <span className="font-bold">PDF.ai</span>
      </div>
      <div className={style.menuLarge + " " + style.menu}>
        <span className={style.menuItem}>Pricing</span>
        <span className={style.menuItem}>Chrome extension</span>
        <span className={style.menuItem}>Use cases</span>
        <span className={style.menuItem}>Get started →</span>
      </div>
      <div className={style.menuSmall + " " + style.menu}>
        <img
          src={isShow ? "/icons/close.svg" : "/icons/menu.svg"}
          className="w-[20px] h-[20px]"
          onClick={() => setIsShow(!isShow)}
        />
        {isShow ? (
          <div className={style.menuItems}>
            <span className={style.menuItem}>Pricing</span>
            <span className={style.menuItem}>Chrome extension</span>
            <span className={style.menuItem}>Use cases</span>
            <span className={style.menuItem}>Get started →</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
