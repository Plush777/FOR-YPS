"use client";

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
import Section from "@/components/animation/section/Section";
import TextBox from "@/components/animation/textBox/TextBox";
import SectionInner from "@/components/animation/section/SectionInner";
import SectionTitle from "@/components/animation/section/SectionTitle";
import TitleBox from "@/components/animation/titleBox/TitleBox";
import TitleBoxInTitle from "@/components/animation/titleBoxInTitle/TitleBoxInTitle";
import Description from "@/components/animation/description/Description";
import SmoothWrapper from "@/components/gsap/smooth/SmoothWrapper";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function IntroPage() {
  const tSection1 = useTranslations("IntroPage.section1");
  const tSection2 = useTranslations("IntroPage.section2");
  const tSection2Positive = useTranslations("IntroPage.section2.positive");
  const tSection2Negative = useTranslations("IntroPage.section2.negative");
  const tSection3 = useTranslations("IntroPage.section3");
  const tSection4 = useTranslations("IntroPage.section4");
  const tSection5 = useTranslations("IntroPage.section5");
  const tSection6 = useTranslations("IntroPage.section6");
  const tSection7 = useTranslations("IntroPage.section7");
  const tSection8 = useTranslations("IntroPage.section8");
  const tSection9 = useTranslations("IntroPage.section9");

  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

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
        end: "+=400",
        markers: false,
      });

      const tl = gsap.timeline();

      tl.from(".tl1", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl2", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl3", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl4", { duration: 1, opacity: 0, y: 50 });
      tl.from(".tl5", { duration: 1, opacity: 0 });

      const createTextAnimation = (
        selector: string,
        trigger: string,
        endOffset: number
      ) => {
        gsap.set(selector, { opacity: 0 });

        gsap.fromTo(
          selector,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: trigger,
              start: "center center",
              end: `+=${endOffset}`,
              scrub: 3,
              markers: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      };

      createTextAnimation(".second-text-1", ".second", 800);
      createTextAnimation(".second-text-2", ".second", 800);

      createTextAnimation(".third-text-1", ".third", 800);
      createTextAnimation(".third-text-2", ".third", 800);
      createTextAnimation(".third-text-3", ".third", 800);
      createTextAnimation(".third-text-4", ".third", 800);

      createTextAnimation(".fourth-text-1", ".fourth", 800);
      createTextAnimation(".fourth-text-2", ".fourth", 800);
      createTextAnimation(".fourth-text-3", ".fourth", 800);

      createTextAnimation(".fifth-text-1", ".fifth", 800);
      createTextAnimation(".fifth-text-2", ".fifth", 800);
      createTextAnimation(".fifth-text-3", ".fifth", 800);
      createTextAnimation(".fifth-text-4", ".fifth", 800);

      if (sectionTitleRef.current) {
        gsap.set(sectionTitleRef.current, {
          x: "-100%",
          opacity: 0,
        });

        gsap.to(sectionTitleRef.current, {
          x: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fifth",
            start: "center center",
            end: "+=400",
            scrub: 1,
            markers: false,
            toggleActions: "play none none reverse",
          },
        });
      }

      ScrollTrigger.create({
        trigger: ".second",
        pin: true,
        start: "center center",
        end: "+=600",
        markers: false,
      });

      ScrollTrigger.create({
        trigger: ".third",
        pin: true,
        start: "center center",
        end: "+=800",
        markers: false,
      });

      ScrollTrigger.create({
        trigger: ".fourth",
        pin: true,
        start: "center center",
        end: "+=1000",
        markers: false,
      });

      ScrollTrigger.create({
        trigger: ".fifth",
        pin: true,
        start: "center center",
        end: "+=1200",
        markers: false,
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

      <SmoothWrapper ref={main}>
        <Section sectionName="firstSection" gsapClassName="first">
          <div className={`${styles.introSectionLogoBox} tl1`}>
            <ColoredLogoHoriz />
          </div>

          <div className={styles.introTitleBox}>
            <Description text={tSection1("description1")} className={`tl2`} />
            <Description text={tSection1("description2")} className={`tl3`} />
            <Description text={tSection1("description3")} className={`tl4`} />
          </div>
        </Section>

        <Section sectionName="textSection" gsapClassName="second">
          <TextBox>
            <TitleBoxInTitle
              text={tSection2("text1")}
              gsapClassName={`second-text-1`}
            />
            <TitleBoxInTitle
              text={tSection2("text2")}
              gsapClassName={`second-text-2`}
            />
          </TextBox>
        </Section>

        <Section sectionName="textSection" gsapClassName="third">
          <TextBox>
            <TitleBoxInTitle
              text={tSection2Positive("text1")}
              gsapClassName={`third-text-1`}
            />

            <TitleBoxInTitle
              text={tSection2Positive("text2")}
              gsapClassName={`third-text-2`}
            />

            <TitleBoxInTitle
              text={tSection2Positive("text3")}
              gsapClassName={`third-text-3`}
            />

            <TitleBoxInTitle
              text={tSection2Positive("text4")}
              gsapClassName={`third-text-4`}
            />
          </TextBox>
        </Section>

        <Section sectionName="textSection" gsapClassName="fourth">
          <TextBox>
            <TitleBoxInTitle
              text={tSection2Negative("text1")}
              gsapClassName={`fourth-text-1`}
            />

            <TitleBoxInTitle
              text={tSection2Negative("text2")}
              gsapClassName={`fourth-text-2`}
            />

            <TitleBoxInTitle
              text={tSection2Negative("text3")}
              gsapClassName={`fourth-text-3`}
            />
          </TextBox>
        </Section>

        <Section sectionName="textSection" gsapClassName="fifth">
          <SectionInner>
            <SectionTitle
              ref={sectionTitleRef}
              text={tSection3("title")}
              className={`${styles.sectionTitle}`}
            />

            <TextBox>
              <TitleBox className="fifth-text-1">
                <TitleBoxInTitle
                  text={tSection3("text1")}
                  gradationText={true}
                />

                <TitleBoxInTitle regularText={true} text={tSection3("text2")} />
              </TitleBox>

              <TitleBoxInTitle
                text={tSection3("text3")}
                regularText={true}
                gsapClassName={`fifth-text-2`}
              />

              <TitleBox className="fifth-text-3">
                <TitleBoxInTitle
                  text={tSection3("text4")}
                  gradationText={true}
                />

                <TitleBoxInTitle regularText={true} text={tSection3("text5")} />
                <TitleBoxInTitle
                  text={tSection3("text6")}
                  gradationText={true}
                />
                <TitleBoxInTitle text={tSection3("text7")} regularText={true} />
              </TitleBox>

              <TitleBox className="fifth-text-4">
                <TitleBoxInTitle text={tSection3("text8")} regularText={true} />
              </TitleBox>
            </TextBox>
          </SectionInner>
        </Section>
      </SmoothWrapper>

      <ScrollDownArrow />
    </div>
  );
}
