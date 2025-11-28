import { convertKeyToNumber } from "../../../../utils/convertKeyToNumber";
import { Disc, GridCell, Indicator } from "..";
import { ETypeCell } from "../../../../utils/constants";
import React from "react";
import type { TDataCell, IMatrix, Ikeycell } from "../../../../interfaces";

interface GridCellsProps {
  cells: TDataCell;
  showIndicators: boolean;
  onClick: (position: IMatrix) => void;
}

const GridCells = ({ cells, showIndicators, onClick }: GridCellsProps) => (
  <React.Fragment>
    {Object.keys(cells).map((key) => {
      const keyCell = key as Ikeycell;
      const [col, row] = convertKeyToNumber(keyCell);
      const { type, color, isAnimate } = cells[keyCell];

      return (
        <GridCell position={{ col, row }} key={`${col}-${row}`}>
          {type === ETypeCell.DISC ? (
            <Disc
              color={color}
              isAnimate={isAnimate}
              key={`${color}-${col}-${row}`}
            />
          ) : (
            showIndicators && (
              <Indicator
                position={{ col, row }}
                onClick={onClick}
                key={`${Math.random()}-${col}-${row}`}
              />
            )
          )}
        </GridCell>
      );
    })}
  </React.Fragment>
);

export default GridCells;
