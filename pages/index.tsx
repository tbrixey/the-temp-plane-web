import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";
import { useGetUsers } from "../util/useGetUsers";

const Home: NextPage = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const { users, isLoading, isError } = useGetUsers();

  useEffect(() => {
    const group = d3.select(".mapGroup");

    const x = d3.scaleLinear().range([0, 100]);
    const y = d3.scaleLinear().range([100, 0]);

    x.domain([-110, 110]);
    y.domain([-110, 110]);
    console.log("USERS", users);
    if (users) {
      var gdots = group.selectAll("g.dot").data(users).enter().append("g");

      const dot = gdots
        .append("circle")
        .attr("class", "dot")
        .attr("r", (d: any) => {
          return 0.25;
        })
        .attr("cx", (d: any) => {
          return x(d.x);
        })
        .attr("cy", (d: any) => {
          return y(d.y);
        })
        .style("fill", (d: any) => {
          return d.c;
        });
      dot
        .append("animate")
        .attr("attributeName", "opacity")
        .attr("values", "0;1;0")
        .attr("dur", "2s")
        .attr("repeatCount", "indefinite");

      gdots
        .append("text")
        .attr("x", (d: any) => {
          return x(d.x);
        })
        .attr("y", (d: any) => {
          return y(d.y) - 0.5;
        })
        .attr("text-anchor", "middle")
        .style("font-size", 1)
        .style("font-weight", 500)
        .text((d: any) => d.location);
    }
  }, [users]);

  console.log("USERS", users, isLoading, isError);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Temporary Plane</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>Welcome to The Temporary Plane</h1>

          <p className={styles.description}>
            Immerse yourself in an ever-changing and ever-growing game space
            catered and created by you.
          </p>
          <div className={styles.heroButtonGroup}>
            <a
              href="https://discord.gg/6YAyH86TAa"
              className={styles.btn}
              target={"_blank"}
              rel="noreferrer"
            >
              Discord
            </a>
            <a
              href="https://www.patreon.com/TheTemporaryPlane"
              className={styles.btn}
              target={"_blank"}
              rel="noreferrer"
            >
              Support us
            </a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mapContent}>
          <p className={styles.mapTitle}>Live player map</p>
          <svg
            ref={ref}
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            version="1.1"
            className={styles.svg}
          >
            <g className="mapGroup">
              <image
                href="map.jpg"
                x="0"
                y="0"
                width="100%"
                height="75%"
                preserveAspectRatio="xMinYMin slice"
              ></image>
            </g>
          </svg>
        </div>
        <div className={styles.howToContent}>
          <div className={styles.howToTitle}>
            <p>How do I play?</p>
            <p>
              You can get started now by playing through our basic web portal.
            </p>
            <a href="#" className={`${styles.btn} ${styles.playBtn}`}>
              Play now
            </a>
            <p className={styles.playSubText}>
              *Still in development. Please join discord to learn more
            </p>
          </div>
          <div className={styles.howToMain}>
            <p>
              The Temporary Plane runs purely on a web api so you can build your
              very own web portal or mobile application to play. You can even
              write a python script to automate yourself!
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} The Temporary Plane</p>
      </footer>
    </div>
  );
};

export default Home;
