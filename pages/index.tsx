import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";
import { useGetCities, useGetUsers } from "../util/useGetUsers";
import { groupBy, keys } from "lodash";
import { User } from "../types/user";

const Home: NextPage = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const { users, isLoading, isError } = useGetUsers();
  const { cities } = useGetCities();
  const [usersGrouped, setUsers] = useState<{ [key: string]: User[] }>();
  const [cityHover, setCityHover] = useState("");

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

  console.log("USER", usersGrouped);
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
          {/* {cities &&
              usersGrouped &&
              cities.map((city: any, idx: number) => {
                return (
                  <p
                    key={city.name}
                    onMouseEnter={() => {
                      setCityHover(city.name);
                    }}
                    onMouseLeave={() => {
                      setCityHover("");
                    }}
                  >
                    {idx + 1}. {city.name} -{" "}
                    {usersGrouped[city.name]
                      ? usersGrouped[city.name].length
                      : 0}{" "}
                    players
                  </p>
                );
              })} */}
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
                          fill={cityHover === loc.name ? "yellow" : "black"}
                        >
                          {cityHover === loc.name && (
                            <animate
                              key={loc.name}
                              attributeName="r"
                              values="0.5;1;0.5"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          )}
                        </circle>
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
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} The Temporary Plane</p>
      </footer>
    </div>
  );
};

export default Home;
