import { FC } from "react";
import ImgLoading from "next/image";
const Loading: FC<{ loading: boolean }> = (props) => {
  return (
    <div>
      {props.loading ? (
        <ImgLoading src="/assets/loading.svg" />
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
};

export default Loading;
