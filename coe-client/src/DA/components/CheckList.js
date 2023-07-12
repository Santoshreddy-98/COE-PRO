import React, { useState } from 'react';

import './DA.css';

import { useTable } from 'react-table';

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';




function ChecklistPage() {

  const [answers, setAnswers] = useState({

    question1: false,

    question2: false,

    question3: false,

    question4: false,

    question5: false,

    question6: false,

    question7: false,

    question8: false,

    question9: false,

    question10: false,

  });




  const handleCheckboxChange = (e) => {

    const { name, checked } = e.target;

    if (name === 'checkAll') {

      setAnswers((prevAnswers) => {

        const newAnswers = { ...prevAnswers };

        Object.keys(newAnswers).forEach((question) => {

          newAnswers[question] = checked;

        });

        return newAnswers;

      });

    } else {

      setAnswers((prevAnswers) => ({

        ...prevAnswers,

        [name]: checked,

      }));

    }

  };




  const calculatePercentage = () => {

    const totalQuestions = Object.keys(answers).length;

    const answeredQuestions = Object.values(answers).filter((value) => value).length;

    return (answeredQuestions / totalQuestions) * 100;

  };




  const data = React.useMemo(

    () => [

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question1"

              checked={answers.question1}

              onChange={handleCheckboxChange}

            />

            Are logical and physical libraries available for all the standard cells and macros?

          </label>

        ),

        status: answers.question1 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question2"

              checked={answers.question2}

              onChange={handleCheckboxChange}

            />

            Are latest version of libraries available?

          </label>

        ),

        status: answers.question2 ? 'Yes' : 'No',

      },




      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question3"

              checked={answers.question3}

              onChange={handleCheckboxChange}

            />

            Are all the std cells and macros in the library DRC, LVS clean?

          </label>

        ),

        status: answers.question3 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question4"

              checked={answers.question4}

              onChange={handleCheckboxChange}

            />

            Are Decap cell available?

          </label>

        ),

        status: answers.question4 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question5"

              checked={answers.question5}

              onChange={handleCheckboxChange}

            />

            Are Tie high/low cells available?

          </label>

        ),

        status: answers.question5 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question6"

              checked={answers.question6}

              onChange={handleCheckboxChange}

            />

            Are all tap cells and pitch available?

          </label>

        ),

        status: answers.question6 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question7"

              checked={answers.question7}

              onChange={handleCheckboxChange}

            />

            Are endcap & corner cells available?

          </label>

        ),

        status: answers.question7 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question8"

              checked={answers.question8}

              onChange={handleCheckboxChange}

            />

            Are power switches available?

          </label>

        ),

        status: answers.question8 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question9"

              checked={answers.question9}

              onChange={handleCheckboxChange}

            />

            Are all the required and PVT corners for implementation available in the library?

          </label>

        ),

        status: answers.question9 ? 'Yes' : 'No',

      },

      {

        question: (

          <label>

            <input

              type="checkbox"

              name="question10"

              checked={answers.question10}

              onChange={handleCheckboxChange}

            />

            Are multi VT cells like HVT,LVT, and SVT available?

          </label>

        ),

        status: answers.question10 ? 'Yes' : 'No',

      },

      // Add more questions and their statuses here

    ],

    [answers]

  );




  const columns = React.useMemo(

    () => [

      {

        Header: 'Question',

        accessor: 'question',

      },

      {

        Header: 'Status',

        accessor: 'status',

        Cell: ({ value }) => (

          <span style={{ color: value === 'Yes' ? 'green' : 'red' }}>

            {value}

          </span>

        ),

      },

    ],

    []

  );





  const {

    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,

  } = useTable({ columns, data });




  const handleFormSubmit = (e) => {

    e.preventDefault();

    const percentage = calculatePercentage();

    toast.success(`Submitted! Percentage: ${percentage.toFixed(2)}%`, {

      position: toast.POSITION.TOP_RIGHT,

    });

  };




  return (

    <div>

      <ToastContainer />

      <div className="checklist-left">

        <h1>Checklist</h1>

        <form onSubmit={handleFormSubmit}>

          <table className="checklist-table" {...getTableProps()}>

            <thead>

              {headerGroups.map((headerGroup) => (

                <tr {...headerGroup.getHeaderGroupProps()}>

                  {headerGroup.headers.map((column) => (

                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>

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

                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>

                    ))}

                  </tr>

                );

              })}

            </tbody>

          </table>

          <button type="submit">Submit</button>

        </form>

      </div>




    </div>

  );

}




export default ChecklistPage