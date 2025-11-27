import "./styles.css";
import { BASE_CLASS_NAME_GAME } from "../../../../utils/constants";
import type { TBoardColor } from "../../../../interfaces";

const BASE_CLASS_NAME = `${BASE_CLASS_NAME_GAME}-disc`;

const CLASS_NAMES = {
  WRAPPER: BASE_CLASS_NAME,
};

interface DiscProps {
  color: TBoardColor;
}

const Disc = ({ color }: DiscProps) => (
  <div className={`${CLASS_NAMES.WRAPPER} ${color.toLowerCase()}`} />
);

export default Disc;
