import SwiperNavigation from "@/components/svg/SwiperNavigation";

type Props = {
  onPrev: () => void;
};

export default function Prev({ onPrev }: Props) {
  return (
    <button
      type="button"
      onClick={onPrev}
      className="swiper-button-prev-custom"
    >
      <SwiperNavigation />
    </button>
  );
}
