import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRef } from "react";

const numericComparator = (valueA: any, valueB: any) => {
  const numA = valueA !== null && valueA !== undefined && valueA !== "" ? parseFloat(valueA) : Number.MIN_VALUE;
  const numB = valueB !== null && valueB !== undefined && valueB !== "" ? parseFloat(valueB) : Number.MIN_VALUE;
  return numA - numB;
};

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: "agTextColumnFilter" },
  { field: "discovery_date", headerName: "Discovery Date", filter: "agDateColumnFilter", cellClass: "dateUS",
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().substring(2);
      return month + "/" + day + "/" + year;
    }
  ,},
  { field: "h_mag", headerName: "H (mag)", filter: "agNumberColumnFilter", type: "numericColumn", 
    comparator: numericComparator },
  { field: "moid_au", headerName: "MOID (au)", filter: "agNumberColumnFilter", type: "numericColumn",
    comparator: numericComparator },
  { field: "q_au_1", headerName: "q (au)", filter: "agNumberColumnFilter", type: "numericColumn",
    comparator: numericComparator },
  { field: "q_au_2", headerName: "Q (au)", filter: "agNumberColumnFilter", type: "numericColumn",
    comparator: numericComparator },
  { field: "period_yr", headerName: "Period (yr)", filter: "agNumberColumnFilter", type: "numericColumn",
    comparator: numericComparator },
  { field: "i_deg", headerName: "Inclination (deg)", filter: "agNumberColumnFilter", type: "numericColumn", 
    comparator: numericComparator },
  { field: "pha", headerName: "Potentially Hazardous", filter: "agTextColumnFilter",
    valueFormatter: (params) => {
      if (params.value === "Y") return "Yes";
      if (params.value === "N") return "No";
      if (params.value === "n/a") return "";
      return params.value;
    }
  },
  { field: "orbit_class", headerName: "Orbit Class",filter: "agTextColumnFilter", enableRowGroup: true  },
];

const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<AgGridReact>(null);
  
  const clearFiltersAndSorting = () => {
    
    gridRef.current!.api.setFilterModel(null);
    
    gridRef.current!.api.applyColumnState({
      state: [],
      defaultState: { sort: null },
    });

  };

  
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "15px"}}>
        <h1>Near-Earth Object Overview</h1>
        <button style={{padding: '10px 16px'}} onClick={()=>clearFiltersAndSorting()}>Clear Filters and Sorters</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
        <AgGridReact 
          rowSelection={{ mode: "multiRow", copySelectedRows: true}}     
          rowData={data}
          columnDefs={columnDefs}
          rowGroupPanelShow={'always'}
          enableCellTextSelection={true}
          suppressClipboardPaste={true}
          cellSelection={true}
          ref={gridRef}
        />
      </div>
    </>
  );
};

export default NeoGrid;
