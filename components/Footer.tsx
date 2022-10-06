import React from "react";
import { NextPage } from "next";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const List = ({ items, mt }: { items: string[]; mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
    {items.map((item: string) => (
      <p
        key={item}
        className="text-gray-400 text-sm  hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  <div className="hidden xl:block px-2">
    <List items={footerList3} mt />
    <p className="text-gray-400 text-sm mt-5">© 2022 Streamy</p>
  </div>
);

export default Footer;
