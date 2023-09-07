type CellProps = {
  id: number;
  cell: string;
  handleCellClick: (id: number) => void;
};

export const Cell = ({ id, cell, handleCellClick }: CellProps) => {
  return (
    <div className="cell" onClick={() => handleCellClick(id)}>
      {cell}
    </div>
  );
};
