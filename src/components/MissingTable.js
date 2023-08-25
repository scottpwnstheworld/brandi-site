import React, { useMemo, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MissingPerson } from "../models/MissingPerson";
import { useNavigate } from "react-router-dom";

import "./MissingTable.css";

export const MissingTable = ({ data }) => {
  const navigate = useNavigate();
  const mpObjects = useMemo(() => {
    const objs = [];
    for (const jsonPerson of data) {
      objs.push(new MissingPerson(jsonPerson));
    }
    return objs;
  }, [data]);

  const [showName, setShowName] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [showCity, setShowCity] = useState(true);

  const helper = createColumnHelper();
  const possibleColumns = [
    helper.accessor("fullName", {
      header: () => <span>Full Name</span>,
      cell: (info) => info.getValue(),
    }),
    helper.accessor("missingAge", {
      header: () => <span>Missing Age</span>,
      cell: (info) => info.getValue(),
    }),
    helper.accessor("location", {
      header: () => <span>Location</span>,
      cell: (info) => info.getValue(),
    }),
  ];

  const columns = useMemo(() => {
    const results = [];
    if (showName) {
      results.push(possibleColumns[0]);
    }
    if (showAge) {
      results.push(possibleColumns[1]);
    }
    if (showCity) {
      results.push(possibleColumns[2]);
    }
    return results;
  }, [showName, showAge, showCity]);

  const [filter, setFilter] = useState("");
  const setFilterText = (event) => {
    setFilter(event.target.value);
  };
  const filteredResults = useMemo(() => {
    if (filter) {
      console.log("filtering ", showName, showAge, showCity);
      console.log("filter ", filter);
      const filtered = mpObjects.filter((result) => {
        if (showName && result.fullName?.includes(filter)) {
          console.log("name match");
          return true;
        }
        if (showAge && result.missingAge === filter) {
          return true;
        }
        if (showCity && result.location?.includes(filter)) {
          return true;
        }
        return false;
      });
      return filtered;
    } else {
      return mpObjects;
    }
  }, [filter, mpObjects, showAge, showCity, showName]);

  console.log("mpObj ", filteredResults);

  const table = useReactTable({
    data: filteredResults,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div>
        <input
          className="search-bar"
          placeholder="Search..."
          type="text"
          onChange={setFilterText}
        />
      </div>
      <div className="column-selectors">
        <div>
          <label>Name</label>
          <input
            type="checkbox"
            value={showName}
            defaultChecked={showName}
            onClick={(event) => {
              setShowName(!showName);
            }}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="checkbox"
            value={showAge}
            defaultChecked={showAge}
            onChange={(event) => {
              setShowAge(!showAge);
            }}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="checkbox"
            value={showCity}
            defaultChecked={showCity}
            onChange={(event) => {
              setShowCity(!showCity);
            }}
          />
        </div>
      </div>
      <table className="people-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="person-row"
              key={row.id}
              onClick={() => {
                navigate(`/browse/missing/${row.original.raw["Case Number"]}`);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
