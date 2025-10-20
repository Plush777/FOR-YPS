"use client";

import React, { useCallback, useRef, useMemo } from "react";
import styles from "@/app/[locale]/page.module.css";

import { useTranslations } from "next-intl";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import ColoredLogoHoriz from "@/components/svg/ColoredLogoHoriz";
import Section from "@/components/animation/section/Section";
import TextBox from "@/components/animation/textBox/TextBox";
import SectionInner from "@/components/animation/section/SectionInner";
import SectionTitle from "@/components/animation/section/SectionTitle";
import TitleBox from "@/components/animation/titleBox/TitleBox";
import TitleBoxInTitle from "@/components/animation/titleBoxInTitle/TitleBoxInTitle";
import Description from "@/components/animation/description/Description";
import DescriptionBox from "@/components/animation/description/DescriptionBox";
import ImageArea from "@/components/animation/imageArea/ImageArea";
import GlowingCard from "@/components/nurui/glowing-card/glowing-card";
import SwiperPrevButton from "@/components/swiper/navigations/SwiperPrevButton";
import SwiperNextButton from "@/components/swiper/navigations/SwiperNextButton";
import SlideNameBox from "@/components/swiper/slide/SlideNameBox";
import { VideoModal } from "@/components/nurui/video-modal/video-modal";
import { GlowCard } from "@/components/nurui/spotlight-card/spotlight-card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { MembersByKey, MemberWithImage } from "@/types/members";
import type { AlbumsByKey, AlbumWithImage } from "@/types/albums";
import KoreaFlag from "@/components/svg/KoreaFlag";
import SwiperWrapper from "@/components/swiper/wrapper/SwiperWrapper";
import CardWrapper from "@/components/card/CardWrapper";
import TitleBoxWrapper from "@/components/animation/titleBoxWrapper/TitleBoxWrapper";
import TopDownButton from "@/components/topDownButton/TopDownButton";
import ErrorSection from "@/components/error/ErrorSection";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
}

export default function HomePage({
  initialItems,
  children,
}: React.PropsWithChildren<{
  initialItems: RssItem[];
}>) {
  console.log(initialItems);

  const rssDate = initialItems && initialItems.map((item) => item.pubDate);

  const parsingDate =
    rssDate &&
    rssDate.map((dateString) => {
      const dateParts = dateString.split(" ");
      return dateParts[0]; // 날짜 부분만 추출
    });

  const rssLink = initialItems && initialItems.map((item) => item.link);
  const parsingLink =
    rssLink &&
    rssLink.map((link) => {
      return link;
    });

  function parsingLinkCondition(i: number) {
    if (parsingLink[i].includes("/shorts")) return "Shorts";
    if (parsingLink[i].includes("/watch")) return "Video";
  }

  const tSection1 = useTranslations("mainPage.section1");
  const tSection2 = useTranslations("mainPage.section2");
  const tSection2Positive = useTranslations("mainPage.section2.positive");
  const tSection2Negative = useTranslations("mainPage.section2.negative");
  const tSection3 = useTranslations("mainPage.section3");
  const tSection4 = useTranslations("mainPage.section4");
  const tSection5 = useTranslations("mainPage.section5");
  const tSection6 = useTranslations("mainPage.section6");
  const tSection7 = useTranslations("mainPage.section7");
  const tSection8 = useTranslations("mainPage.section8");
  const tSection9 = useTranslations("mainPage.section9");

  const sectionTitleRefs = useRef<HTMLHeadingElement[]>([]);

  const memberCardColorMap = {
    sunhye: "var(--sunhye)",
    yeonjung: "var(--yeonjung)",
    jiana: "var(--jiana)",
    doeun: "var(--doeun)",
    jieun: "var(--jieun)",
  } as const;

  type memberCardColorKey = keyof typeof memberCardColorMap;
  const memberCardColorList: memberCardColorKey[] = [
    "sunhye",
    "yeonjung",
    "jiana",
    "doeun",
    "jieun",
  ];

  const getMemberClasses = useMemo(() => {
    const memberClasses = ["sunhye", "yeonjung", "jiana", "doeun", "jieun"];
    return (
      initialItems &&
      initialItems.map(
        (_, index) => memberClasses[index % memberClasses.length]
      )
    );
  }, [initialItems]);

  const albumCardColorMap = {
    macaroniCheeze: "var(--macaroni-cheeze-album)",
    youngPosseUp: "var(--young-posse-up-album)",
    xxl: "var(--xxl-album)",
    onMyScars: "var(--on-my-scars-album)",
    ateThat: "var(--ate-that-album)",
    weStillLoading: "var(--we-still-loading-album)",
    streetCarol: "var(--street-carol-album)",
    cold: "var(--cold-album)",
    growingPain: "var(--growing-pain-album)",
  } as const;

  type albumCardColorKey = keyof typeof albumCardColorMap;
  const albumCardColorList: albumCardColorKey[] = [
    "macaroniCheeze",
    "youngPosseUp",
    "xxl",
    "onMyScars",
    "ateThat",
    "weStillLoading",
    "streetCarol",
    "cold",
    "growingPain",
  ];

  const membersObject = tSection6.raw("members") as MembersByKey;
  const membersList: MemberWithImage[] = Object.keys(membersObject)
    .sort()
    .map((key, index) => {
      const member = membersObject[key];
      return {
        id: key,
        ...member,
        imageSrc: `/members/img-member1-${index + 1}.webp`,
      };
    });

  const albumObject = tSection7.raw("albums") as AlbumsByKey;
  const albumList: AlbumWithImage[] = Object.keys(albumObject)
    .sort()
    .map((key, index) => {
      const album = albumObject[key];
      return {
        id: key,
        ...album,
        imageSrc: `/albums/img-album${index + 1}.webp`,
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

  const cardSwiperParams = {
    slidesPerView: "auto" as const,
    grabCursor: true,
    threshold: 2,
    spaceBetween: 16,
    loop: false,
    navigation: false,
  };

  useGSAP(() => {
    function createTextAnimation(
      selector: string,
      trigger: string,
      endOffset: number
    ) {
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
    }

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

    const sections = [
      ".second",
      ".third",
      ".fourth",
      ".fifth",
      ".sixth",
      ".seventh",
      ".eighth",
      ".nineth",
      ".ten",
    ];

    sections.forEach((selector, index) => {
      ScrollTrigger.create({
        trigger: selector,
        pin: true,
        start: "center center",
        end: "+=600",
        markers: false,
      });
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".eleven",
        start: "center center",
        scrub: 1,
        pin: true,
      },
    });

    // GlowCard 컴포넌트들에 순차적 애니메이션 적용
    gsap.set(".glow-card", { opacity: 0, y: 50 });

    const cardAnimations = [
      { section: ".eighth", start: "center 90%" },
      { section: ".nineth", start: "center 70%" },
      { section: ".ten", start: "center 70%" },
    ];

    cardAnimations.forEach(({ section, start }) => {
      gsap.to(`${section} .glow-card`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start,
          end: "+=800",
          scrub: false,
          markers: false,
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.fromTo(
      ".eleven .backgroundBlackInner", // ← 셀렉터 문자열 그대로 사용
      {
        clipPath: "inset(50% round 0px)", // 초기값
      },
      {
        clipPath: "inset(0% round 20px)", // 최종값
        scrollTrigger: {
          trigger: ".eleven", // 해당 섹션 기준으로 트리거
          start: "center center",
          end: "bottom center", // 섹션이 화면 위로 사라질 때 끝
          scrub: true, // 스크롤에 따라 자연스럽게 변화
          markers: false,
        },
      }
    );

    const topDownButtonWrapper = document.querySelector(
      ".topDownButtonWrapper"
    ) as HTMLElement | null;
    const footer = document.querySelector(".footer") as HTMLElement | null;

    if (!topDownButtonWrapper || !footer) return;

    gsap.set(topDownButtonWrapper, { opacity: 0 });

    gsap.to(topDownButtonWrapper, {
      opacity: 1,
      visibility: "visible",
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".second", // 두 번째 섹션 클래스
        start: "top center", // 2번째 섹션이 중앙쯤 오면 등장
        toggleActions: "play none none reverse",
        markers: false,
      },
    });
  });

  return (
    <div className={styles.pageBackground}>
      <video
        src="/video/intro-video.mp4"
        autoPlay
        muted
        loop
        className={styles.introVideo}
      />

      <TopDownButton />

      <Section sectionName="firstSection" gsapClassName="first">
        <div className={`${styles.sectionLogoBox} fadeIn`}>
          <ColoredLogoHoriz />
        </div>

        <TextBox
          childrenStyleClassName="fzSmall color-white"
          isRowGap="sm"
          isHeightFull={false}
        >
          <Description
            text={tSection1("description1")}
            fadeClassName="fadeIn delay1"
          />
          <Description
            text={tSection1("description2")}
            fadeClassName="fadeIn delay2"
          />
          <Description
            text={tSection1("description3")}
            fadeClassName="fadeIn delay3"
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
          <TextBox
            horizontal="center"
            isRowGap="none"
            childrenStyleClassName="fzLarge regularText"
          >
            <SectionTitle
              ref={setSectionTitleRef}
              text={tSection3("title")}
              className={`${styles.sectionTitle}`}
            />
            <TitleBoxWrapper sectionName="fifth">
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
            </TitleBoxWrapper>

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
          <TextBox
            isRowGap="none"
            childrenStyleClassName="wrap regularText fzMedium"
            gsapClassName="sixth-text-1"
          >
            <SectionTitle
              ref={setSectionTitleRef}
              text={tSection4("title")}
              className={`${styles.sectionTitle}`}
            />

            <TitleBoxWrapper sectionName="sixth">
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
            </TitleBoxWrapper>
          </TextBox>
        </SectionInner>
      </Section>

      {/* <Section sectionName="textSection" gsapClassName="seventh">
          <SectionInner horizontal="center">
            <SectionTitle
              ref={setSectionTitleRef}
              text={tSection5("title")}
              className={`${styles.sectionTitle}`}
            />

            <SwiperWrapper className="seventh-text-1">
              <SwiperPrevButton />

              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
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
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
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
            </SwiperWrapper>

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
        </Section> */}

      <Section sectionName="textSection" gsapClassName="eighth">
        <SectionInner horizontal="center">
          <SectionTitle
            ref={setSectionTitleRef}
            text={tSection6("title")}
            className={`${styles.sectionTitle}`}
          />

          <CardWrapper>
            <SwiperWrapper className="swiper3">
              <Swiper className="eighthSectionSwiper" {...cardSwiperParams}>
                {membersList.map((member, i) => (
                  <SwiperSlide>
                    <GlowCard
                      className={`glow-card ${memberCardColorList[i]}`}
                      key={member.id}
                      topContents={
                        <ImageArea
                          type="card"
                          src={member.imageSrc}
                          alt={member.name}
                        />
                      }
                      bottomContents={
                        <>
                          <div className="cardColumn">
                            <p className="cardText">{member.dateofbirth}</p>
                          </div>

                          <div className="cardColumn list">
                            {member.position?.text1 && (
                              <p className="cardText">
                                {member.position.text1}
                              </p>
                            )}
                            {member.position?.text2 && (
                              <p className="cardText">
                                {member.position.text2}
                              </p>
                            )}
                          </div>
                        </>
                      }
                      cardTitle={member.name}
                      titleContents={<KoreaFlag />}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperWrapper>
          </CardWrapper>
        </SectionInner>
      </Section>

      <Section sectionName="textSection" gsapClassName="nineth">
        <SectionInner horizontal="center">
          <SectionTitle
            ref={setSectionTitleRef}
            text={tSection7("title")}
            className={`${styles.sectionTitle}`}
          />

          <CardWrapper>
            <SwiperWrapper className="swiper2">
              <Swiper className="ninethSectionSwiper" {...cardSwiperParams}>
                {albumList.map((album, i) => (
                  <SwiperSlide>
                    <GlowCard
                      className={`glow-card album ${albumCardColorList[i]}`}
                      key={album.id}
                      topContents={
                        <ImageArea
                          type="card"
                          src={album.imageSrc}
                          alt={album.name}
                        />
                      }
                      bottomContents={
                        <>
                          <div className="cardColumn">
                            <p className="cardText">{album.type}</p>
                          </div>
                          <div className="cardColumn list">
                            <p className="cardText">{album.date}</p>
                          </div>
                        </>
                      }
                      cardTitle={album.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperWrapper>
          </CardWrapper>
        </SectionInner>
      </Section>

      <Section sectionName="textSection" gsapClassName="ten">
        <SectionInner horizontal="center">
          <SectionTitle
            ref={setSectionTitleRef}
            text={tSection8("title")}
            className={styles.sectionTitle}
          />

          <CardWrapper>
            <SwiperWrapper className="swiper4">
              <Swiper className="tenSectionSwiper" {...cardSwiperParams}>
                {initialItems ? (
                  initialItems.map((item, i) => (
                    <SwiperSlide>
                      <a href={item.link} title={item.title} target="_blank">
                        <GlowCard
                          className={`glow-card media ${getMemberClasses[i]}`}
                          key={i}
                          topContents={
                            <>
                              <span className="cardLabel">
                                {parsingLinkCondition(i) ?? "Unknown"}
                              </span>
                              <ImageArea
                                type="card"
                                src={
                                  item.thumbnail ||
                                  "/card/default-thumbnail.jpg"
                                }
                                alt={item.title || ""}
                              />
                            </>
                          }
                          bottomContents={
                            <div className="cardColumn">
                              <p className="cardText date">
                                {parsingDate[i] || "날짜를 불러오지 못함"}
                              </p>
                            </div>
                          }
                          cardTitle={item.title || "제목을 불러오지 못함"}
                        />
                      </a>
                    </SwiperSlide>
                  ))
                ) : (
                  <ErrorSection />
                )}
              </Swiper>
            </SwiperWrapper>
          </CardWrapper>
        </SectionInner>
      </Section>

      {/* <Section sectionName="textSection" gsapClassName="eleven">
          <SectionInner horizontal="center">
            <div className={styles.backgroundBlack}>
              <div
                className={`${styles.backgroundBlackInner} backgroundBlackInner`}
              >
                <img
                  src="/bg/bg-last-young-posse.webp"
                  className={styles.scaleBg}
                  alt=""
                />

                <div className={styles.backgroundBlackInnerContents}>
                  <div className={`${styles.endingTextBox} eleven-text`}>
                    <p className={styles.endingText}>{tSection9("text1")}</p>
                    <p className={styles.endingText}>{tSection9("text2")}</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionInner>
        </Section> */}

      {children}
    </div>
  );
}
