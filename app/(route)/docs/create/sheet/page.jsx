"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Download,
  PlusCircle,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";

const INITIAL_ROWS = 10;
const INITIAL_COLS = 8;

export default function SpreadsheetEditorComponent() {
  const [grid, setGrid] = useState(() =>
    Array(INITIAL_ROWS)
      .fill(null)
      .map(() =>
        Array(INITIAL_COLS)
          .fill(null)
          .map(() => ({
            value: "",
            isBold: false,
            isItalic: false,
            isUnderlined: false,
          }))
      )
  );

  const [activeCell, setActiveCell] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const inputRef = useRef(null);

  const handleCellChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], value };
    setGrid(newGrid);
  };

  const handleFormatChange = (format) => {
    if (!activeCell) return;
    const [row, col] = activeCell;
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      [format]: !newGrid[row][col][format],
    };
    setGrid(newGrid);
  };

  const handleKeyDown = (e, row, col) => {
    switch (e.key) {
      case "ArrowUp":
        setActiveCell(row > 0 ? [row - 1, col] : null);
        break;
      case "ArrowDown":
        setActiveCell(row < grid.length - 1 ? [row + 1, col] : null);
        break;
      case "ArrowLeft":
        setActiveCell(col > 0 ? [row, col - 1] : null);
        break;
      case "ArrowRight":
        setActiveCell(col < grid[0].length - 1 ? [row, col + 1] : null);
        break;
    }
  };

  const addRow = (index) => {
    const newRow = Array(grid[0].length)
      .fill(null)
      .map(() => ({
        value: "",
        isBold: false,
        isItalic: false,
        isUnderlined: false,
      }));
    const newGrid = [...grid.slice(0, index), newRow, ...grid.slice(index)];
    setGrid(newGrid);
  };

  const addColumn = (index) => {
    const newGrid = grid.map((row) => [
      ...row.slice(0, index),
      {
        value: "",
        isBold: false,
        isItalic: false,
        isUnderlined: false,
      },
      ...row.slice(index),
    ]);
    setGrid(newGrid);
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(
      grid.map((row) => row.map((cell) => cell.value))
    );

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
        const cell = grid[rowIndex][colIndex];
        const cellAddress = XLSX.utils.encode_cell({
          r: rowIndex,
          c: colIndex,
        });

        if (cell.isBold || cell.isItalic || cell.isUnderlined) {
          if (!worksheet[cellAddress].s) worksheet[cellAddress].s = {};

          if (cell.isBold) worksheet[cellAddress].s.font = { bold: true };
          if (cell.isItalic)
            worksheet[cellAddress].s.font = {
              ...worksheet[cellAddress].s.font,
              italic: true,
            };
          if (cell.isUnderlined)
            worksheet[cellAddress].s.font = {
              ...worksheet[cellAddress].s.font,
              underline: true,
            };
        }
      }
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "spreadsheet.xlsx");
    console.log("Work Sheet =>", worksheet);
  };

  useEffect(() => {
    if (activeCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeCell]);

  return (
    <div className="py-4 px-8">
      <div className="mb-10 flex items-center justify-between space-x-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFormatChange("isBold")}
            disabled={!activeCell}
          >
            <Bold className="h-4 w-4" />
            <span className="sr-only">Bold</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFormatChange("isItalic")}
            disabled={!activeCell}
          >
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italic</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFormatChange("isUnderlined")}
            disabled={!activeCell}
          >
            <Underline className="h-4 w-4" />
            <span className="sr-only">Underline</span>
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
      <div className="relative my-4">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${grid[0].length}, minmax(100px, 1fr))`,
            gridTemplateRows: `repeat(${grid.length}, minmax(30px, auto))`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="border border-gray-200 p-1 relative"
                onClick={() => setActiveCell([rowIndex, colIndex])}
                onMouseEnter={() => {
                  if (colIndex === 0)
                    setHoverPosition({ type: "row", index: rowIndex });
                  if (rowIndex === 0)
                    setHoverPosition({ type: "column", index: colIndex });
                }}
                onMouseLeave={() => setHoverPosition(null)}
              >
                {activeCell &&
                activeCell[0] === rowIndex &&
                activeCell[1] === colIndex ? (
                  <input
                    ref={inputRef}
                    value={cell.value}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                    className="w-full h-full outline-none"
                    style={{
                      fontWeight: cell.isBold ? "bold" : "normal",
                      fontStyle: cell.isItalic ? "italic" : "normal",
                      textDecoration: cell.isUnderlined ? "underline" : "none",
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      fontWeight: cell.isBold ? "bold" : "normal",
                      fontStyle: cell.isItalic ? "italic" : "normal",
                      textDecoration: cell.isUnderlined ? "underline" : "none",
                    }}
                  >
                    {cell.value}
                  </div>
                )}
                {hoverPosition?.type === "row" &&
                  hoverPosition.index === rowIndex &&
                  colIndex === 0 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -left-8 top-1/2 transform -translate-y-1/2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addRow(rowIndex);
                      }}
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span className="sr-only">Add Row</span>
                    </Button>
                  )}
                {hoverPosition?.type === "column" &&
                  hoverPosition.index === colIndex &&
                  rowIndex === 0 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addColumn(colIndex);
                      }}
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span className="sr-only">Add Column</span>
                    </Button>
                  )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
