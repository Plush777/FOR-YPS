type Props = {
  href?: string;
  target?: string;
  styleClassName?: string;
  iconName?: string;
  text: string;
};

export default function Anchor({
  href = "",
  target = "_blank",
  styleClassName = "",
  iconName = "",
  text,
}: Props) {
  return (
    <a href={href} target={target} className={`${styleClassName} ${iconName}`}>
      {text}
    </a>
  );
}
