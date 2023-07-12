import React, { useState, useEffect } from "react";

import { useTable } from "react-table";

import ReactPaginate from "react-paginate";

import axios from "axios";

import columns from "./Columns";

import "../AppDD.css";

import { FaAngleDoubleRight } from "react-icons/fa";

export const TableComponents = () => {
  const [colVal, setColVal] = useState([]);

  const maxRowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * maxRowsPerPage;

  const slicedData = colVal.slice(startIndex, startIndex + maxRowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/landingrun");

        setColVal(res.data);
      } catch (error) {
        console.error(error);

        // Handle errors
      }
    };

    fetchData();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSetUpButtonClick = (row) => {
    const dirFormUrl = "/dirform"; // Replace with the actual URL of the dirform page

    // Pass any necessary data to the dirform page through query parameters or state

    const dataToPass = {
      // Define the data to pass here
    };

    // Construct the URL with query parameters or state data

    const urlWithParams = `${dirFormUrl}?param1=value1&param2=value2`; // Replace with the actual query parameters

    // Navigate to the dirform page

    window.location.href = urlWithParams;
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: slicedData });

  return (
    <React.Fragment>
      <div className="TableContainer">
        <table {...getTableProps()} className="TableBody">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === "FM" && cell.value ? (
                        <button className="TableCustomButton">View</button>
                      ) : cell.column.Header === "FM" && !cell.value ? (
                        <button
                          className="TableCustomButton"
                          onClick={() => handleSetUpButtonClick(row)}
                        >
                          Set_up
                        </button>
                      ) : cell.column.Header === "DD" ||
                        cell.column.Header === "DA" ? (
                        <button
                          className={`TableCustomButton ${
                            cell.value ? "active" : "disabled"
                          }`}
                          disabled={!cell.value}
                        >
                          Go <FaAngleDoubleRight />
                        </button>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(colVal.length / maxRowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"TablePagination"}
          activeClassName={"active"}
        />
      </div>
    </React.Fragment>
  );
};
