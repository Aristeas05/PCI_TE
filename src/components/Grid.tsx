// NeoGrid.tsx
import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import data from "../near-earth-asteroids.json";
import { columnDefs } from "./columns";

const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<AgGridReact>(null);

  const clearFiltersAndSorting = () => {
    gridRef.current?.api.setFilterModel(null);
    gridRef.current?.api.applyColumnState({
      state: [],
      defaultState: { sort: null },
    });
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <h1>Near-Earth Object Overview</h1>
        <button style={{ padding: "10px 16px" }} onClick={clearFiltersAndSorting}>Clear Filters and Sorters</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 900, width: "100%" }}>
        <AgGridReact
          rowSelection="multiple"
          rowData={data}
          columnDefs={columnDefs}
          rowGroupPanelShow="always"
          enableCellTextSelection={true}
          suppressClipboardPaste={true}
          ref={gridRef}
        />
      </div>
    </>
  );
};

export default NeoGrid;
