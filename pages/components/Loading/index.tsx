import { FC } from "react";
import LoadingComponent from "@/public/assets/loading.svg";
import LoadingStyle from "./Loading.module.css";
import { MH } from "@/types";
const Loading: FC<MH.C.LoadingProps> = ({
  loading,
  width,
  height,
  children,
}) => {
  const style = { width, height };
  return loading ? (
    <LoadingComponent
      alt="图片不见了"
      className={LoadingStyle.img}
      style={style}
    />
  ) : (
    <>{children}</>
  );
};

export default Loading;
