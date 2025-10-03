"use client";

import "../../styles/gsap.css";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./intro.module.css";
import ColoredLogoHoriz from "@/components/svg/ColoredLogoHoriz";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import ScrollDownArrow from "@/components/animation/scrollDownArrow/ScrollDownArrow";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function IntroPage() {
  const tSection1 = useTranslations("IntroPage.section1");
  const tSection2 = useTranslations("IntroPage.section2");

  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother>(null);

  useGSAP(
    () => {
      smoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });
      ScrollTrigger.create({
        trigger: ".first",
        pin: true,
        start: "center center",
        end: "+=600",
        markers: false,
      });

      const tl = gsap.timeline();

      tl.from(".tl1", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl2", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl3", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl4", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl5", { duration: 1, opacity: 0 });

      gsap.to(main.current, {
        autoAlpha: 1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: ".second",
          pin: true,
          scrub: true,
        },
      });
    },
    {
      scope: main,
    }
  );

  return (
    <div className={styles.introBackground}>
      <video
        src="/video/intro-video.mp4"
        autoPlay
        muted
        loop
        className={styles.introVideo}
      />

      <div id="smooth-wrapper" ref={main}>
        <div id="smooth-content">
          <section
            data-speed="1.5"
            className={`${styles.introSection} ${styles.firstSection} first introSection`}
          >
            <div className={`${styles.introSectionLogoBox} tl1`}>
              <ColoredLogoHoriz />
            </div>

            <div className={styles.introTitleBox}>
              <p className={`${styles.introDescription} tl2`}>
                {tSection1("description1")}
              </p>
              <p className={`${styles.introDescription} tl3`}>
                {tSection1("description2")}
              </p>
              <p className={`${styles.introDescription} tl4`}>
                {tSection1("description3")}
              </p>
            </div>

            <div className={`${styles.introScrollDownArrow} tl5`}>
              <p className={styles.introDescription}>
                {tSection1("description4")}
              </p>
              <ScrollDownArrow />
            </div>
          </section>

          <section
            data-speed="1.5"
            className={`${styles.introSection} ${styles.secondSection} second introSection`}
          >
            <div className={styles.secondTextBox}>
              <p className={`${styles.introDescription}`}>
                {tSection2("text1")}
              </p>
              <p className={`${styles.introDescription}`}>
                {tSection2("text2")}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
