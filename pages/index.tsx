import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";
import { useGetCities, useGetUsers } from "../util/useGetUsers";
import { groupBy, keys } from "lodash";
import { User } from "../types/user";
import { isBrowser } from "react-device-detect";

const Home: NextPage = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const { users, isError } = useGetUsers();
  const { cities } = useGetCities();
  const [usersGrouped, setUsers] = useState<{ [key: string]: User[] }>();

  const x = d3.scaleLinear().range([0, 100]);
  const y = d3.scaleLinear().range([100, 0]);

  x.domain([-120, 120]);
  y.domain([-110, 110]);

  useEffect(() => {
    if (users) {
      const userCounts = groupBy(users, "location");

      setUsers(userCounts);
    }
  }, [users]);

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
        {isBrowser ? (
          <div className={styles.mapContent}>
            <p className={styles.mapTitle}>Live player map</p>
            {isError && <p className={styles.errorText}>*error loading data</p>}
            <div className={styles.map}>
              <svg
                ref={ref}
                width="100%"
                height="100%"
                viewBox="0 0 135 100"
                version="1.1"
                className={styles.svg}
              >
                <g className="mapGroup">
                  <image
                    href="map.jpg"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMinYMin slice"
                  ></image>
                  {cities &&
                    usersGrouped &&
                    cities.map((loc: any) => {
                      return (
                        <g key={loc.name}>
                          <circle
                            cx={x(loc.x)}
                            cy={y(loc.y)}
                            r={0.5}
                            className={styles.locationDot}
                          ></circle>
                          <text
                            x={x(loc.x)}
                            y={y(loc.y) - 1.25}
                            textAnchor="middle"
                            fontSize={1.75}
                            fontWeight={700}
                            className={styles.mapText}
                          >
                            {loc.name}
                          </text>
                          <text
                            x={x(loc.x)}
                            y={y(loc.y) + 2}
                            textAnchor="middle"
                            fontWeight={500}
                            fontSize={1.25}
                            className={styles.mapText}
                          >
                            {usersGrouped[loc.name]
                              ? usersGrouped[loc.name].length
                              : 0}{" "}
                            Players
                          </text>
                        </g>
                      );
                    })}
                </g>
              </svg>
            </div>
          </div>
        ) : (
          <div className={styles.mapContent}>
            <p className={styles.mapTitle}>Live player locations</p>
            {isError && <p className={styles.errorText}>*error loading data</p>}
            <div className={styles.mapText}>
              {cities &&
                usersGrouped &&
                cities.map((loc: any) => {
                  return (
                    <p key={loc.name}>
                      • <b>{loc.name}</b> -{" "}
                      {usersGrouped[loc.name]
                        ? usersGrouped[loc.name].length
                        : 0}{" "}
                      players
                    </p>
                  );
                })}
            </div>
          </div>
        )}
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
              write a python script to automate your character!
            </p>
          </div>
        </div>
        <div className={styles.faq}>
          <div className={styles.howToTitle}>
            <p>FAQ</p>
          </div>
          <div className={styles.faqMain}>
            <p className={styles.faqQ}>Is there a roadmap in place?</p>
            <p className={styles.faqA}>
              Currently we do not have a roadmap as we are very early in
              development and am only working on this in our spare time. You can
              follow progress and see what is coming up next at our public{" "}
              <a
                href="https://trello.com/b/tIEjLUYM/the-temporary-plane"
                target="_blank"
                rel="noreferrer"
              >
                Trello board
              </a>
              .
            </p>
            <p className={styles.faqQ}>Do you have documentation?</p>
            <p className={styles.faqA}>
              Not yet 😞 Documentation will be available at the time of release.
            </p>
            <p className={styles.faqQ}>I have a question</p>
            <p className={styles.faqA}>
              Oh cool! Please reach out to me on discord and I will do my best
              to answer it.
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
