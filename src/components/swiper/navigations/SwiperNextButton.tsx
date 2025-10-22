import SwiperNavigation from "@/components/svg/SwiperNavigation";

type Props = {
  onNext: () => void;
};

export default function Next({ onNext }: Props) {
  return (
    <button
      type="button"
      onClick={onNext}
      className="swiper-button-next-custom"
    >
      <SwiperNavigation />
    </button>
  );
}
