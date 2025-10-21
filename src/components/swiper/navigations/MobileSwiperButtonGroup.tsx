import SwiperPrevButton from "@/components/swiper/navigations/SwiperPrevButton";
import SwiperNextButton from "@/components/swiper/navigations/SwiperNextButton";

export default function MobileSwiperButtonGroup() {
  return (
    <div className="mobileSwiperButtonGroup">
      <SwiperPrevButton />
      <SwiperNextButton />
    </div>
  );
}
