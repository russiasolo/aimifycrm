import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listStudents } from '../actions/studentActions';

const Students = () => {
  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.listStudents);
  const { loading, error, students } = studentList;

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);

  return (
    <div>
      <h1>Students</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {students &&
            students.map((student) => (
              <div key={student.id}>
                <h3>{student.full_name}</h3>
                <p>Birth Date: {student.birth_date}</p>
                <p>Gender: {student.gender}</p>
                <p>Parent Contact 1: {student.parent_contact_1}</p>
                <p>Parent Contact 2: {student.parent_contact_2}</p>
                <p>Parent Email: {student.parent_email}</p>
                <p>Student Comment: {student.student_comment}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Students;
