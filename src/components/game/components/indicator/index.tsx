import "./styles.css";
import { BASE_CLASS_NAME_GAME } from "../../../../utils/constants";
import type { IMatrix } from "../../../../interfaces";

const BASE_CLASS_NAME = `${BASE_CLASS_NAME_GAME}-indicator`;

const CLASS_NAMES = {
  WRAPPER: BASE_CLASS_NAME,
};

interface IndicatorProps {
  position: IMatrix;
  onClick: (position: IMatrix) => void;
}

// TODO: Validar si se le agrega una animación a la celda...
const Indicator = ({ position, onClick }: IndicatorProps) => (
  <button className={CLASS_NAMES.WRAPPER} onClick={() => onClick(position)} />
);

export default Indicator;
