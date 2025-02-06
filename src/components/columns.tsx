import { ColDef } from "ag-grid-community";
import { numericComparator } from "../utils/comparators";

export const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: "agTextColumnFilter" },
  { field: "discovery_date", headerName: "Discovery Date (MM/DD/YY)", filter: "agDateColumnFilter", cellClass: "dateUS",
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
