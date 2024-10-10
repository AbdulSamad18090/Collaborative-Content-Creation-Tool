"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Pen, Save } from "lucide-react";
import Link from "next/link";
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

  // Log the spreadsheet data whenever it changes
  useEffect(() => {
    console.log("Spreadsheet Data =>", data);
  }, [data]); // Run effect when 'data' changes

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

    console.log("WorkSheet =>", worksheet);
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2 p-3 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Pen className="h-8 w-6 text-black" />
          <span className="text-xl font-bold">ContentCollab</span>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Enter File name"
            className="sm:w-[200px] w-full"
          />
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
      <div className="space-x-2 m-3 flex">
        <Button  onClick={addRow}>
          Add Row
        </Button>
        <Button  onClick={addColumn}>
          Add Column
        </Button>
      </div>
      <div className="overflow-x-auto min-w-full mb-2">
        <Spreadsheet data={data} onChange={setData} />
      </div>
    </>
  );
};

export default SpreadsheetEditor;
