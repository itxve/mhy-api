import { MH } from "@/types";
import {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
  useEffect,
} from "react";

const list = [1, 2, 3].map((e) => `/media/ht/${e}.mp3`);
const GetObject = () => {
  return list[Math.floor(Math.random() * list.length)];
};
type MAudioProps = {};
const MAudio = forwardRef<MH.Context.AudioContext, MAudioProps>(
  (props, audioRef) => {
    //audioRef当前组件的引用
    const [srcMp3, setSrcMp3] = useState("");
    useEffect(() => {
      setSrcMp3(GetObject());
    }, []);
    const mp3Ref = useRef<HTMLAudioElement>(null);
    //暴露属性
    useImperativeHandle(audioRef, () => ({
      audio: mp3Ref.current!,
    }));
    return (
      <div style={{ display: "none" }}>
        {srcMp3 && <audio ref={mp3Ref} src={srcMp3}></audio>}
      </div>
    );
  }
);
MAudio.displayName = "MAudio";

export default MAudio;
