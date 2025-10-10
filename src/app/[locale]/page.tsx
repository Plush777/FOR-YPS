"use client";

import React, { useCallback, useRef } from "react";
import styles from "./page.module.css";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import ColoredLogoHoriz from "@/components/svg/ColoredLogoHoriz";
import ScrollDownArrow from "@/components/animation/scrollDownArrow/ScrollDownArrow";
import Section from "@/components/animation/section/Section";
import TextBox from "@/components/animation/textBox/TextBox";
import SectionInner from "@/components/animation/section/SectionInner";
import SectionTitle from "@/components/animation/section/SectionTitle";
import TitleBox from "@/components/animation/titleBox/TitleBox";
import TitleBoxInTitle from "@/components/animation/titleBoxInTitle/TitleBoxInTitle";
import Description from "@/components/animation/description/Description";
import SmoothWrapper from "@/components/gsap/smooth/SmoothWrapper";
import DescriptionBox from "@/components/animation/description/DescriptionBox";
import ImageArea from "@/components/animation/imageArea/ImageArea";
import GlowingCard from "@/components/nurui/glowing-card/glowing-card";
import SwiperPrevButton from "@/components/swiper/navigations/SwiperPrevButton";
import SwiperNextButton from "@/components/swiper/navigations/SwiperNextButton";
import SlideNameBox from "@/components/swiper/slide/SlideNameBox";
import { VideoModal } from "@/components/nurui/video-modal/video-modal";
import { GlowCard } from "@/components/nurui/spotlight-card/spotlight-card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { MembersByKey, MemberWithImage } from "@/types/members";
import KoreaFlag from "@/components/svg/KoreaFlag";

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

  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother>(null);
  const sectionTitleRefs = useRef<HTMLHeadingElement[]>([]);

  const colorMap = {
    sunhye: "#ffc710",
    yeonjung: "#fa44a6",
    jiana: "#9807f6",
    doeun: "#61c322",
    jieun: "#4694dd",
  } as const;

  type ColorKey = keyof typeof colorMap;
  const colorList: ColorKey[] = [
    "sunhye",
    "yeonjung",
    "jiana",
    "doeun",
    "jieun",
  ];

  // section6.members를 원본(JSON) 형태로 안전하게 가져와 타입 적용
  const membersObject = tSection6.raw("members") as MembersByKey;
  const membersList: MemberWithImage[] = Object.keys(membersObject)
    .sort() // member1, member2 ... 순서 보장
    .map((key, index) => {
      const member = membersObject[key];
      return {
        id: key,
        ...member,
        imageSrc: `/members/img-member1-${index + 1}.webp`,
      };
    });

  const setSectionTitleRef = useCallback((el: HTMLHeadingElement | null) => {
    if (!el) {
      return;
    }

    if (!sectionTitleRefs.current.includes(el)) {
      sectionTitleRefs.current.push(el);
    }
  }, []);

  useGSAP(() => {
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
    createTextAnimation(".fifth-text-5", ".fifth", 1200);

    createTextAnimation(".sixth-text-1", ".sixth", 800);

    createTextAnimation(".seventh-text-1", ".seventh", 800);

    sectionTitleRefs.current.forEach((title) => {
      const triggerElement = title.closest("section");

      if (!triggerElement) {
        return;
      }

      gsap.set(title, {
        x: "-100%",
        opacity: 0,
      });

      gsap.to(title, {
        x: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerElement,
          start: "center center",
          end: "+=400",
          scrub: 1,
          markers: false,
          toggleActions: "play none none reverse",
        },
      });
    });

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

    ScrollTrigger.create({
      trigger: ".sixth",
      pin: true,
      start: "center center",
      end: "+=1400",
      markers: false,
    });

    ScrollTrigger.create({
      trigger: ".seventh",
      pin: true,
      start: "center center",
      end: "+=1600",
      markers: false,
    });

    ScrollTrigger.create({
      trigger: ".eightth",
      pin: true,
      start: "center center",
      end: "+=1800",
      markers: false,
    });
  });

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

          <TextBox
            childrenStyleClassName="fzSmall color-white"
            isRowGap="sm"
            isHeightFull={false}
          >
            <Description
              text={tSection1("description1")}
              gsapClassName={`tl2`}
            />
            <Description
              text={tSection1("description2")}
              gsapClassName={`tl3`}
            />
            <Description
              text={tSection1("description3")}
              gsapClassName={`tl4`}
            />
          </TextBox>
        </Section>

        <Section sectionName="textSection" gsapClassName="second">
          <TextBox childrenStyleClassName="fzLarge">
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
          <TextBox childrenStyleClassName="fzLarge">
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
          <TextBox childrenStyleClassName="fzLarge">
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
              ref={setSectionTitleRef}
              text={tSection3("title")}
              className={`${styles.sectionTitle}`}
            />

            <TextBox
              horizontal="center"
              childrenStyleClassName="fzLarge regularText"
            >
              <div className={styles.titleBoxWrapper}>
                <TitleBox gsapClassName="fifth-text-1">
                  <TitleBoxInTitle
                    text={tSection3("text1")}
                    gradationText={true}
                  />

                  <TitleBoxInTitle text={tSection3("text2")} />
                </TitleBox>

                <TitleBoxInTitle
                  text={tSection3("text3")}
                  gsapClassName={`fifth-text-2`}
                />

                <TitleBox gsapClassName="fifth-text-3">
                  <TitleBoxInTitle
                    text={tSection3("text4")}
                    gradationText={true}
                  />

                  <TitleBoxInTitle text={tSection3("text5")} />
                  <TitleBoxInTitle
                    text={tSection3("text6")}
                    gradationText={true}
                  />
                  <TitleBoxInTitle text={tSection3("text7")} />
                </TitleBox>

                <TitleBox gsapClassName="fifth-text-4">
                  <TitleBoxInTitle text={tSection3("text8")} />
                </TitleBox>
              </div>

              <DescriptionBox
                childrenStyleClassName="color-gray fzSmall hasDot"
                direction="column"
                gsapClassName="fifth-text-5"
              >
                <Description text={tSection3("info.text1")} />
                <Description text={tSection3("info.text2")} />
              </DescriptionBox>
            </TextBox>
          </SectionInner>
        </Section>

        <Section sectionName="textSection" gsapClassName="sixth">
          <SectionInner>
            <SectionTitle
              ref={setSectionTitleRef}
              text={tSection4("title")}
              className={`${styles.sectionTitle}`}
            />

            <TextBox
              childrenStyleClassName="wrap regularText fzMedium"
              gsapClassName="sixth-text-1"
            >
              <GlowingCard>
                <ImageArea
                  src="/icons/logo/logo-official-yougposse-white-horiz.svg"
                  alt="Young posse 화이트 버전 로고"
                />
              </GlowingCard>

              <TitleBox>
                <TitleBoxInTitle text={tSection4("text1")} />
              </TitleBox>

              <TitleBox>
                <TitleBoxInTitle
                  text={tSection4("text2")}
                  gradationText={true}
                />
                <TitleBoxInTitle text={tSection4("text3")} />
              </TitleBox>

              <TitleBox>
                <TitleBoxInTitle
                  text={tSection4("text4")}
                  gradationText={true}
                />
                <TitleBoxInTitle text={tSection4("text5")} />
              </TitleBox>

              <TitleBox>
                <TitleBoxInTitle text={tSection4("text6")} />
              </TitleBox>
            </TextBox>
          </SectionInner>
        </Section>

        <Section sectionName="textSection" gsapClassName="seventh">
          <SectionInner horizontal="center">
            <SectionTitle
              ref={setSectionTitleRef}
              text={tSection5("title")}
              className={`${styles.sectionTitle}`}
            />

            <div className={styles.hasSwiperBox}>
              <SwiperPrevButton />

              <Swiper
                modules={[Pagination, Navigation]}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                className="seventhSectionSwiper"
                slidesPerView="auto"
                threshold={2}
                spaceBetween={30}
                scrollbar
                loop={true}
              >
                <SwiperSlide>
                  <SlideNameBox
                    title="YOUNG POSSE UP (feat.Verbal Jint, NSW yoon, Token)"
                    desc="Jersey Drill (Jersey Club + Drill)"
                  />

                  <VideoModal
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/eaGsVrnH-5k?si=XMcmKrCDr9Xrm2Up"
                    thumbnailSrc="/thumbnail/img-video-thumbnail-01.jpg"
                    thumbnailAlt="Hero Video1"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <SlideNameBox title="Skyline" desc="Jersey Club + Dnb" />

                  <VideoModal
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/9hBFfI_3elA?si=PvKDR5SUomqPmwEb"
                    thumbnailSrc="/thumbnail/img-video-thumbnail-02.jpg"
                    thumbnailAlt="Hero Video2"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <SlideNameBox title="Same Shit 中 Another One" desc="Rage" />

                  <VideoModal
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/o16aOeWMGOk?si=P1cTZgCip_ID3Gl-"
                    thumbnailSrc="/thumbnail/img-video-thumbnail-03.png"
                    thumbnailAlt="Hero Video3"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <SlideNameBox title="Blue Dot" desc="Rage" />
                  <VideoModal
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/r374CxtQHpM?si=5JLD2X7x7bw7AjXE"
                    thumbnailSrc="/thumbnail/img-video-thumbnail-04.jpg"
                    thumbnailAlt="Hero Video4"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <SlideNameBox title="YSSR" desc="Rage" />
                  <VideoModal
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/DmZi8TOLN_I?si=j-L15LrMGtS7bPz_"
                    thumbnailSrc="/thumbnail/img-video-thumbnail-05.jpg"
                    thumbnailAlt="Hero Video5"
                  />
                </SwiperSlide>
              </Swiper>

              <SwiperNextButton />
            </div>

            <TextBox
              isHeightFull={false}
              childrenStyleClassName="fzXSmall wrap regularText titleBoxGapXs"
              horizontal="start"
              gsapClassName="seventh-text-1"
              isRowGap="xs"
            >
              <TitleBox>
                <TitleBoxInTitle
                  text={tSection5("text1")}
                  gradationText={true}
                />
                <TitleBoxInTitle
                  text={tSection5("text2")}
                  gradationText={true}
                />
                <TitleBoxInTitle
                  text={tSection5("text3")}
                  gradationText={true}
                />
                <TitleBoxInTitle text={tSection5("text4")} />
              </TitleBox>
              <TitleBoxInTitle text={tSection5("text5")} />

              <TitleBox>
                <TitleBoxInTitle text={tSection5("text6")} />
                <TitleBoxInTitle
                  text={tSection5("text7")}
                  gradationText={true}
                />
                <TitleBoxInTitle text={tSection5("text8")} />
              </TitleBox>

              <TitleBox>
                <TitleBoxInTitle
                  text={tSection5("text9")}
                  gradationText={true}
                />
                <TitleBoxInTitle text={tSection5("text10")} />
              </TitleBox>
            </TextBox>
          </SectionInner>
        </Section>

        <Section sectionName="textSection" gsapClassName="eightth">
          <SectionInner horizontal="center">
            <SectionTitle
              ref={setSectionTitleRef}
              text={tSection6("title")}
              className={`${styles.sectionTitle}`}
            />

            <div className="cardWrapper">
              {membersList.map((member, i) => (
                <GlowCard className={colorList[i]} key={member.id}>
                  <div className="cardTop">
                    <ImageArea
                      type="card"
                      src={member.imageSrc}
                      alt={member.name}
                    />
                  </div>

                  <div className="cardBottom">
                    <div className="cardTitleArea">
                      <KoreaFlag />
                      <strong className="cardTitle">{member.name}</strong>
                    </div>
                    <div className="cardColumn">
                      <p className="cardText">{member.dateofbirth}</p>
                    </div>

                    <div className="cardColumn list">
                      {member.position?.text1 && (
                        <p className="cardText">{member.position.text1}</p>
                      )}
                      {member.position?.text2 && (
                        <p className="cardText">{member.position.text2}</p>
                      )}
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </SectionInner>
        </Section>
      </SmoothWrapper>

      <ScrollDownArrow />
    </div>
  );
}
