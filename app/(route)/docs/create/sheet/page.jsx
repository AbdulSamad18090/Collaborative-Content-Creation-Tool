"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Save } from "lucide-react";
import { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";
import * as XLSX from "xlsx";

const SpreadsheetEditor = () => {
  // Define the default number of columns
  const defaultColumnCount = 26; // Change this based on your design or calculations
  const defaultRowCount = 10;

  // Initialize the spreadsheet data
  const initializeData = (columns, rows) => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ value: "" }))
    );
  };

  // Initial state
  const [data, setData] = useState(
    initializeData(defaultColumnCount, defaultRowCount)
  );

  // Add a new row
  const addRow = () => {
    const newRow = data[0].map(() => ({ value: "" }));
    setData([...data, newRow]);
  };

  // Add a new column
  const addColumn = () => {
    const newData = data.map((row) => [...row, { value: "" }]);
    setData(newData);
  };

  // Export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(
      data.map((row) => row.map((cell) => cell.value))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "spreadsheet.xlsx");
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2 m-2">
        <div className="space-x-2">
          <Button variant="outline" onClick={addRow}>
            Add Row
          </Button>
          <Button variant="outline" onClick={addColumn}>
            Add Column
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Enter File name" />
          <Button onClick={() => {}}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button variant="outline" onClick={exportToExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto min-w-full">
        <Spreadsheet data={data} onChange={setData} />
      </div>
    </>
  );
};

export default SpreadsheetEditor;
