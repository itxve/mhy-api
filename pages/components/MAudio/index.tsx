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
    const [srcMp3, setSrcMp3] = useState("");
    useEffect(() => {
      setSrcMp3(GetObject());
    }, []);
    const ref = useRef<HTMLAudioElement>(null);
    useImperativeHandle(audioRef, () => ({
      audio: ref.current!,
    }));
    return (
      <div style={{ display: "none" }}>
        {srcMp3 && <audio ref={ref} src={srcMp3}></audio>}
      </div>
    );
  }
);
export default MAudio;
