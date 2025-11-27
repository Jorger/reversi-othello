import "./styles.css";
import {
  BASE_CLASS_NAME_GAME,
  BORDER_SIZE_GRID,
  SIZE_CELL,
} from "../../../../utils/constants";
import type { IMatrix } from "../../../../interfaces";

const BASE_CLASS_NAME = `${BASE_CLASS_NAME_GAME}-grid-cell`;

const CLASS_NAMES = {
  WRAPPER: BASE_CLASS_NAME,
};

interface GridCellProps {
  position: IMatrix;
  children: React.ReactNode;
}

const GridCell = ({ position, children }: GridCellProps) => {
  const style: React.CSSProperties = {
    left: SIZE_CELL * position.col + BORDER_SIZE_GRID,
    top: SIZE_CELL * position.row + BORDER_SIZE_GRID,
  };

  return (
    <div className={CLASS_NAMES.WRAPPER} style={style}>
      {children}
    </div>
  );
};

export default GridCell;
