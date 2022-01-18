import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";
import { useGetUsers } from "../util/useGetUsers";

const Home: NextPage = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const { users, isLoading, isError } = useGetUsers();
  const [transform, setTransform] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const width = 2042 / 4;
  const height = 2042 / 4;

  const zoomBehavior: any = d3.zoom().scaleExtent([0, 10]);

  useEffect(() => {
    const svg = d3.select(ref.current);

    zoomBehavior.on("zoom", (e: any) => {
      setTransform({
        scale: e.transform.k,
        x: e.transform.x,
        y: e.transform.y,
      });
    });

    svg.call(zoomBehavior);

    const group = d3.select(".mapGroup");

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain([-110, 110]);
    y.domain([-110, 110]);

    if (users) {
      var gdots = group.selectAll("g.dot").data(users).enter().append("g");

      gdots
        .append("circle")
        .attr("class", "dot")
        .attr("r", (d: any) => {
          return d.r;
        })
        .attr("cx", (d: any) => {
          return x(d.x);
        })
        .attr("cy", (d: any) => {
          return y(d.y);
        })
        .style("fill", (d: any) => {
          return d.c;
        })
        .append("animate")
        .attr("attributeName", "opacity")
        .attr("values", "0;1;0")
        .attr("dur", "2s")
        .attr("repeatCount", "indefinite");
    }
  }, [users]);

  console.log("USERS", users, isLoading, isError);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Temporary Plane</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <svg
          ref={ref}
          width="100%"
          height="100%"
          viewBox="0 0 500 500"
          version="1.1"
          className={styles.svg}
        >
          <g
            className="mapGroup"
            transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}
          >
            <image href="map.jpg" width={width} height={height}></image>
          </g>
        </svg>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to The Temporary Plane</h1>

        <p className={styles.description}>
          {users && users.map((user: any) => user.playerName)}
        </p>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} The Temporary Plane</p>
      </footer>
    </div>
  );
};

export default Home;
