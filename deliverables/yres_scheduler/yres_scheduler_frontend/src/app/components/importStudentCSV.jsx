import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import * as XLSX from "xlsx";
import { Form } from 'react-bootstrap';
import { fetchDataPOST } from '../helper';

/** 
 * Function that allows the mass import of students from a CSV:
 * class Student {
   *student_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    age (int) 			// <UI>
    sex (string) 		// <UI>
}
*class Counselor {
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
}
 * Props: 
        students - a list of student or counselor objects depending on type attribute below
**/
async function AddStudents(students){
  const mappedStudents = students.map(student => ({
    student_ui_id: student.student_id,
    firstname: student.firstname,
    lastname: student.lastname,
    age: student.age,
    sex: student.sex,
    friend_ids: "", 
    enemy_ids: ""
  }));
  await fetchDataPOST('/student/create/fromlist/', mappedStudents);
}
/**
 * Form to generates students from CSV
* Props: 
    handleClose - function to run when the import is successful
    setError - function setter to display any error messages that occur
**/
function StudentCSV({handleClose, setError}) {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState();
  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, {
              type: "buffer"
          });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
      };
      fileReader.onerror = (error) => {
          reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (file) {
        const fileData = await readExcel(file);
        await AddStudents(fileData)
        setLoading(false);
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <Form className="form-inline" onSubmit={handleSubmit}>
        <Form.Group className="inline-div">
          <Form.Control
              type="file"
              accept=".csv"
              id="csvFileInput"
              onChange={handleOnChange}
          />
        </Form.Group> 
        <div className='inline-div'>
        <Button type='submit' disabled={loading}>
          {loading ? 
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Importing...
          </> : "Import Students"}
        </Button>
        </div>
      </Form>
    </div>
  );
}

export default StudentCSV;