import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import * as d3 from "d3";
import { useGetCities, useGetUsers } from "../util/useGetUsers";
import { groupBy } from "lodash";
import { User } from "../types/user";
import { isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";
import { btnClass } from "../styles/buttonClasses";

const Home = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const { users, isError } = useGetUsers();
  const { cities } = useGetCities();
  const [usersGrouped, setUsers] = useState<{ [key: string]: User[] }>();

  // Match viewBox "0 0 135 100" so points align with the map image
  const x = d3.scaleLinear().range([0, 135]);
  const y = d3.scaleLinear().range([100, 0]);

  x.domain([-100, 100]);
  y.domain([-100, 100]);

  useEffect(() => {
    if (users) {
      const userCounts = groupBy(users, "location.name");

      setUsers(userCounts);
    }
  }, [users]);

  return (
    <div className="p-0 block">
      <Helmet>
        <title>The Temporary Plane</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A silly personal project that became a game. Updates may or may not happen. Play at your own risk."
        />
        <meta itemProp="name" content="The Temporary Plane" />
        <meta
          itemProp="description"
          content="A silly personal project that became a game. Updates may or may not happen. Play at your own risk."
        />
        <meta
          itemProp="image"
          content="https://thetemporaryplane.com/map.jpg"
        />
        <meta property="og:url" content="https://thetemporaryplane.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Temporary Plane" />
        <meta
          property="og:description"
          content="A silly personal project that became a game. Updates may or may not happen. Play at your own risk."
        />
        <meta
          property="og:image"
          content="https://thetemporaryplane.com/map.jpg"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="The Temporary Plane" />
        <meta
          name="twitter:description"
          content="A silly personal project that became a game. Updates may or may not happen. Play at your own risk."
        />
        <meta
          name="twitter:image"
          content="https://thetemporaryplane.com/map.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="250" />
        <meta
          property="og:image:alt"
          content="The map of The Temporary Plane"
        />
        <meta name="og:locale" content="en_US" />
      </Helmet>

      <header
        className="text-center py-[20em] bg-[#202124] bg-cover bg-blend-overlay bg-fixed bg-no-repeat bg-center max-sm:py-[12em] max-sm:flex max-sm:justify-center"
        style={{ backgroundImage: "url('/space-background.jpg')" }}
      >
        <div className="z-30 max-sm:max-w-[90%]">
          <h1 className="m-0 leading-[1.15] text-[4rem] font-extrabold text-center max-sm:text-[2.5rem]">
            Welcome to The Temporary Plane
          </h1>
          <p className="mt-4 mb-0 text-[1rem] opacity-60 text-center tracking-widest uppercase">
            A game. Sort of.
          </p>

          <p className="my-16 leading-[1.5] text-[1.5rem] text-center max-sm:text-[1.25rem]">
            A silly personal project that got out of hand. A game space that may
            or may not grow depending on my whims.
          </p>

          <div className="flex w-[60%] justify-center max-sm:w-full">
            <a
              href="https://discord.gg/6YAyH86TAa"
              className={btnClass}
              target={"_blank"}
              rel="noreferrer"
            >
              Discord
            </a>
            <a
              href="https://www.patreon.com/TheTemporaryPlane"
              className={btnClass}
              target={"_blank"}
              rel="noreferrer"
            >
              Support me
            </a>
          </div>
        </div>
      </header>

      <main className="min-h-screen px-8 py-8 flex-1 flex flex-col justify-center items-center max-sm:p-0">
        <div className="w-full max-w-[50%] max-sm:max-w-[90%] mt-8 mb-4 border border-white/20 rounded-lg p-6 text-center">
          <p className="text-[1rem] font-bold mb-2 tracking-wide uppercase opacity-60">
            Heads up
          </p>
          <p className="text-base opacity-80 leading-relaxed">
            This is a hobby project with zero obligations and zero promises.
            Updates drop when they drop or they don't. There are no ETAs, no
            quarterly commitments, and no guarantee that whatever is on the
            roadmap will ever ship. If that sounds fine to you, welcome. If
            not, also fine.
          </p>
        </div>

        {isBrowser ? (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-[2rem] font-bold m-[0.5em] text-center max-sm:text-[1.5rem]">
              Live player map
            </p>
            <p className="m-[0.5em] max-w-[40%] max-sm:text-sm max-sm:max-w-[90%] max-sm:text-center">
              See who else wandered in. The map may become more interactable
              someday. Or not. We'll see.
            </p>
            {isError && (
              <p className="text-xs font-normal">*error loading data</p>
            )}
            <div className="w-[70%] max-sm:w-full max-sm:text-center">
              <svg
                ref={ref}
                width="100%"
                height="100%"
                viewBox="0 0 135 100"
                version="1.1"
                className="top-0 left-0"
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
                          ></circle>
                          <text
                            x={x(loc.x)}
                            y={y(loc.y) - 1.25}
                            textAnchor="middle"
                            fontSize={1.75}
                            fontWeight={700}
                            className="[text-shadow:0px_0px_6px_white] max-sm:[text-shadow:none] max-sm:text-[1.25rem]"
                          >
                            {loc.name}
                          </text>
                          <text
                            x={x(loc.x)}
                            y={y(loc.y) + 2}
                            textAnchor="middle"
                            fontWeight={500}
                            fontSize={1.25}
                            className="[text-shadow:0px_0px_6px_white] max-sm:[text-shadow:none] max-sm:text-[1.25rem]"
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
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-[2rem] font-bold m-[0.5em] text-center max-sm:text-[1.5rem]">
              Live player locations
            </p>
            <p className="m-[0.5em] max-w-[40%] max-sm:text-sm max-sm:max-w-[90%] max-sm:text-center">
              See who else wandered in.
            </p>
            {isError && (
              <p className="text-xs font-normal">*error loading data</p>
            )}
            <div className="[text-shadow:0px_0px_6px_white] max-sm:[text-shadow:none] max-sm:text-[1.25rem]">
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
        <div className="pt-[10em] pb-[5em] relative flex flex-col items-center max-w-[50%] text-[1.115rem] text-center max-sm:max-w-[90%]">
          <div>
            <p className="text-[2rem] font-bold pb-[1em]">How do I play?</p>
            <p className="opacity-80">
              You can get started by playing through the basic web portal. No
              promises on what you'll find, but feel free to poke around.
            </p>
            <Link to="/game">
              <div className={btnClass}>Play now</div>
            </Link>
            <p className="text-[0.9rem] opacity-80">
              Sign in or register to start playing. *ALPHA stage - things will
              break.
            </p>
          </div>
          <div>
            <p className="my-[1em] opacity-80">
              The Temporary Plane runs purely on a web api so you can build your
              very own web portal or mobile application to play. You can even
              write an automation script to play your character!
            </p>
          </div>
        </div>
        <div className="pb-[5em] flex flex-col items-center max-w-[50%] text-[1.115rem] text-center max-sm:max-w-[90%]">
          <div>
            <p className="text-[2rem] font-bold pb-[1em]">FAQ</p>
          </div>
          <div>
            <p className="font-bold text-[1.25rem] py-[1em]">
              Is there a roadmap in place?
            </p>
            <p className="text-base opacity-80">
              Kind of. Ideas and maybes live on the public{" "}
              <a
                href="https://trello.com/b/tIEjLUYM/the-temporary-plane"
                target="_blank"
                rel="noreferrer"
                className="underline text-[#b49461]"
              >
                Trello board
              </a>
              , but nothing there is a promise - just a maybe-list. Updates happen
              when they happen, or they don't. If you think of something I'm
              missing, let me know and I'll add it to the pile of things I may
              or may not get to.
            </p>
            <p className="font-bold text-[1.25rem] py-[1em]">
              Do you have documentation?
            </p>
            <p className="text-base opacity-80">
              Not yet 😞 Docs will exist when the stars align, or when I get
              around to it - whichever comes first.
            </p>
            <p className="font-bold text-[1.25rem] py-[1em]">
              I have a question
            </p>
            <p className="text-base opacity-80">
              Oh cool! Reach out on Discord or Twitter. I'll do my best to
              answer it, though response time is subject to the same "when I get
              to it" policy as everything else here.
            </p>
          </div>
        </div>
      </main>

      <footer className="flex flex-1 flex-col py-8 border-t border-[#eaeaea] justify-center items-center">
        <a
          href="https://twitter.com/TheTempPlane"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://discord.gg/6YAyH86TAa"
          target={"_blank"}
          rel="noreferrer"
        >
          Discord
        </a>
        <a href="https://trevorbrixey.com" target={"_blank"} rel="noreferrer">
          Made with ❤️
        </a>
        <p>© {new Date().getFullYear()} The Temporary Plane</p>
      </footer>
    </div>
  );
};

export default Home;
