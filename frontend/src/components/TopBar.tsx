import React, { FC } from "react";
import { Link } from "react-router-dom";

export const TopBar: FC = () => {
  return (
    <div className={"bg-white w-full p-2 "}>
      <Link to={"/"} className={"flex items-center space-x-4"}>
        <img src={"/avelios_logo.svg"} alt={"logo"} height={40} width={40} />
        <span className={"text-blue-40"}>Avelios Medical</span>
      </Link>
    </div>
  );
};
