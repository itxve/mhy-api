import Image from "next/image";
import styles from "../styles/Home.module.css";
import Awards from "@/pages/components/Awards";
import Head from "next/head";
import MAudio from "@/pages/components/MAudio";
import { useState } from "react";
import { AudioContext } from "@/hooks";

export default function Home() {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AudioContext.Provider value={{ audio }}>
          <Awards />
        </AudioContext.Provider>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src="/assets/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>

        <a
          href="https://github.com/itxve/mys-ys-sign"
          target="_blank"
          rel="noopener noreferrer"
        >
          项目源码{" "}
          <span className={styles.logo}>
            <Image
              src="/assets/github.svg"
              alt="项目源码"
              width={18}
              height={18}
            />
          </span>
        </a>

        <MAudio
          ref={(audioRef) => {
            setAudio(audioRef?.audio);
          }}
        />
      </footer>
    </div>
  );
}
