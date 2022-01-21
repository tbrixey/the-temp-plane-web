import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";
import { useGetLocations, useGetUsers } from "../util/useGetUsers";
import { groupBy, keys } from "lodash";
import { User } from "../types/user";

const Home: NextPage = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const { users, isLoading, isError } = useGetUsers();
  const { locations } = useGetLocations();
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

  console.log("USERS", locations);

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
              {/* {locations &&
                locations.map((loc: any) => {
                  return (
                    <g key={loc.name}>
                      <circle
                        cx={x(loc.x)}
                        cy={y(loc.y)}
                        r={0.25}
                        className={styles.locationDot}
                        fill={loc.type === "city" ? "#fff" : "#000"}
                      >
                        <animate
                          attributeName="opacity"
                          values="0;1;0"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <text
                        x={x(loc.x)}
                        y={y(loc.y) - 0.5}
                        textAnchor="middle"
                        fontSize={1}
                        fontWeight={500}
                      >
                        {loc.name}
                      </text>
                    </g>
                  );
                })} */}
              {usersGrouped &&
                keys(usersGrouped).map((userKey) => {
                  console.log("TESTING", usersGrouped[userKey]);
                  return (
                    <g key={userKey}>
                      <circle
                        cx={x(usersGrouped[userKey][0].x)}
                        cy={y(usersGrouped[userKey][0].y)}
                        r={0.25}
                        className={styles.locationDot}
                      >
                        <animate
                          attributeName="opacity"
                          values="0;1;0"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <text
                        x={x(usersGrouped[userKey][0].x)}
                        y={y(usersGrouped[userKey][0].y) - 0.5}
                        textAnchor="middle"
                        fontSize={1.25}
                        fontWeight={500}
                      >
                        {userKey}
                      </text>
                      <text
                        x={x(usersGrouped[userKey][0].x)}
                        y={y(usersGrouped[userKey][0].y) + 1}
                        textAnchor="middle"
                        fontSize={1}
                      >
                        {usersGrouped[userKey].length} Players
                      </text>
                    </g>
                  );
                })}
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
