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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: slicedData });

  return (
    <React.Fragment>
      <div className="container">
        <table {...getTableProps()} className="table">
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
                        <button className="table-custom-button">View</button>
                      ) : cell.column.Header === "FM" && !cell.value ? (
                        <button className="table-custom-button">Set_up</button>
                      ) : cell.column.Header === "DD" ||
                        cell.column.Header === "DA" ? (
                        <button
                          className={`table-custom-button ${
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

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(colVal.length / maxRowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </React.Fragment>
  );
};
