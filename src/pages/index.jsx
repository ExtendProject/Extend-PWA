import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Fade } from "react-reveal";
import logo from "../../public/assets/images/extend.png";
import Part1 from "@/components/part1";

export default function Home() {
  const [page, setPage] = useState(2);

  useEffect(() => {
    setTimeout(() => {
      // setPage(2);
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>Extend</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/extend.ico" />
      </Head>
      <main className={styles.main}>
        {page === 1 ? (
          <div className={styles.home}>
            <Fade top cascade>
              <div className={styles.content}>
                <Image src={logo} className={styles.logo} alt="" />
                <div className={styles.title}>One place to do it all</div>
              </div>
            </Fade>
          </div>
        ) : (
          // <div style={{ height: "100%", flex: 1, backgroundColor: "blue" }}>
             <Part1 />
          // </div>
        )}
      </main>
    </>
  );
}
