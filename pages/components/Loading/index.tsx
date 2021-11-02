import { FC } from "react";
import LoadingComponent from "@/public/assets/loading.svg";
import LoadingStyle from "./Loading.module.css";
const Loading: FC<MH.C.LoadingProps> = ({
  loading,
  width,
  height,
  children,
}) => {
  const style = { width, height };
  return loading ? (
    <LoadingComponent className={LoadingStyle.img} style={style} />
  ) : (
    <>{children}</>
  );
};

export default Loading;
