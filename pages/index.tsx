import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Skills from "./skills";
import animation from "../styles/animation.module.scss";
import { createRef, MouseEvent, useEffect, useRef } from "react";
import { rubberband, runRubberbandIn } from "../utils/animation";
import Projects from "./projects";
import Contact from "./contact";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import About from "./about";
import PageTitle from "../components/PageTitle";
import Landing from "./landing";
import { Grid, GridItem } from "@chakra-ui/react";
import BoxWithTags from "../components/BoxWithTags";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
        h="100%"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(10, 1fr)"
        gap={0}
      >
        <GridItem
          minWidth="8rem"
          maxWidth="12rem"
          rowSpan={10}
          colSpan={2}
          bg="gray"
        >
          <Navbar />
        </GridItem>
        <GridItem colSpan={8} bg="mintcream">
          <Landing />
        </GridItem>
        <GridItem colSpan={8} bg="mintcream">
          <About />
        </GridItem>
        <GridItem colSpan={8} bg="mintcream">
          <Projects />
        </GridItem>
        <GridItem colSpan={8} bg="mintcream">
          <Skills />
        </GridItem>
        <GridItem colSpan={8} bg="mintcream">
          <Contact />
        </GridItem>
        <GridItem colSpan={8} bg="mintcream">
          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Home;
