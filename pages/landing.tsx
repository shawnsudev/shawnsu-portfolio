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
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import DecorativeTag from "../components/DecorativeTag";
import Continue from "../components/Continue";
import { FadeInContainer, FadeInItem } from "../components/FadeInTransition";

const title = ["Hello", "I'm Shawn,", "new web developer"];

const Landing: NextPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const rubberbandContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: isInView ? 1 : 0,
      transition: isInView
        ? {
            delayChildren: 0.5,
            staggerChildren: 0.08,
          }
        : {},
    },
  };
  const rubberbandItem = {
    hidden: { opacity: 0 },
    show: {
      opacity: isInView ? 1 : 0,
      scale: isInView ? 1 : 1.2,
      // scale: isInView ? 1.2 : 1,
      display: "inline-block",
      transition: {
        type: "spring",
        damping: 5,
        stiffness: 600,
      },
    },
  };

  return (
    <Box id="landing" className={styles.landing}>
      <Box>
        <motion.div
          ref={ref}
          variants={rubberbandContainer}
          initial="hidden"
          animate="show"
        >
          <DecorativeTag content="h1" right="1.5rem">
            <Heading as="h1" size={{ base: "3xl", sm: "3xl", md: "4xl" }}>
              {title.map((line, idx) => (
                <p key={"line" + idx}>
                  {line.split("").map((L, i) =>
                    L === " " ? (
                      " "
                    ) : L === "S" ? (
                      <motion.span key={"hello" + i} variants={rubberbandItem}>
                        <span
                          className={styles.logo2}
                          onMouseEnter={rubberband}
                        >
                          {L}
                        </span>
                      </motion.span>
                    ) : (
                      <motion.span key={"hello" + i} variants={rubberbandItem}>
                        <span onMouseEnter={rubberband}>{L}</span>
                      </motion.span>
                    )
                  )}
                </p>
              ))}
            </Heading>
          </DecorativeTag>
        </motion.div>

        <FadeInContainer once={false}>
          <DecorativeTag content="p">
            <FadeInItem>
              <Text as="p" color="slate" size="2xl">
                New Frontend / React.JS Developer
              </Text>
            </FadeInItem>
          </DecorativeTag>

          <DecorativeTag content="button">
            <FadeInItem>
              <Box>
                <Button>Check Out My Portfolio</Button>
              </Box>
            </FadeInItem>
          </DecorativeTag>
        </FadeInContainer>
      </Box>

      <Continue />
    </Box>
  );
};

export default Landing;
