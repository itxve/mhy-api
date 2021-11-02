import Loading from "@/public/assets/loading.svg";
import ButttonStyle from "./Buttton.module.css";
import { MultipleClass } from "@/util";
import { useState } from "react";

export default function Button({ onClick, children }: MH.C.ButtonProps) {
  const [load, setLoad] = useState(false);
  const handelClick = () => {
    if (onClick) {
      setLoad(true);
      onClick().finally(() => {
        setLoad(false);
      });
    }
  };

  return (
    <button
      className={MultipleClass([ButttonStyle.main, ButttonStyle["main-c"]])}
      onClick={handelClick}
    >
      {load && <Loading className={ButttonStyle.loading} />}
      {children}
    </button>
  );
}
