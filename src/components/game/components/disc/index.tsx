import "./styles.css";
import { BASE_CLASS_NAME_GAME } from "../../../../utils/constants";
import type { TBoardColor } from "../../../../interfaces";

const BASE_CLASS_NAME = `${BASE_CLASS_NAME_GAME}-disc`;

const CLASS_NAMES = {
  WRAPPER: BASE_CLASS_NAME,
  ANIMATE: `${BASE_CLASS_NAME}-animate`,
};

interface DiscProps {
  color: TBoardColor;
  isAnimate: boolean;
}

const Disc = ({ color, isAnimate = false }: DiscProps) => (
  <div
    className={`${CLASS_NAMES.WRAPPER} ${color.toLowerCase()} ${isAnimate ? CLASS_NAMES.ANIMATE : ""}`}
  />
);

export default Disc;
