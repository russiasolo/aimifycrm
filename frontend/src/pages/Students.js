import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';

import Home from '../components/Layout/Home';
import StudentModal from '../components/StudentModal';
import './students.css';

import { listStudents } from '../actions/studentActions';

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  //года
  const getAgeString = (birthdate) => {
    const years = moment().diff(birthdate, 'years');
    let ageString = '';
    if (years % 10 === 1 && years % 100 !== 11) {
      ageString = `${years} год`;
    } else if (years % 10 >= 2 && years % 10 <= 4 && !(years % 100 >= 12 && years % 100 <= 14)) {
      ageString = `${years} года`;
    } else {
      ageString = `${years} лет`;
    }
    return `${ageString}, ${moment().diff(
      moment(birthdate).add(years, 'years'),
      'months',
    )} месяцев`;
  };

  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.listStudents);
  const { loading, error, students } = studentList;

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <Home>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>ФИО ученика</StyledTableCell>
              <StyledTableCell align='right'>Группы</StyledTableCell>
              <StyledTableCell align='right'>Баланс</StyledTableCell>
              <StyledTableCell align='right'>Статус обучения</StyledTableCell>
              <StyledTableCell align='right'>Контакты</StyledTableCell>
              <StyledTableCell align='right'>Комментарий</StyledTableCell>
              <StyledTableCell align='right'>Абонементы</StyledTableCell>
              <StyledTableCell align='right'>Ближайший урок</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => (
              <StyledTableRow key={student.id} onClick={() => handleRowClick(student)}>
                <StyledTableCell component='th' scope='row'>
                  {student.full_name}{' '}
                  <div className='birthdate'>({getAgeString(student.birth_date)})</div>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {student.enrollments &&
                    student.enrollments.map((enrollment) => (
                      <div key={index}>
                        {course.name} ({student.courses.count()}/{course.max_students})
                      </div>
                    ))}
                </StyledTableCell>
                <StyledTableCell align='right'>10</StyledTableCell>
                <StyledTableCell align='right'>
                  {student.enrollments?.map((enrollment) => (
                    <div key={enrollment.id}>{enrollment.training_status}</div>
                  ))}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {student.parent_contact_1}, {student.parent_contact_2}
                </StyledTableCell>
                <StyledTableCell align='right'>{student.student_comment}</StyledTableCell>
                <StyledTableCell align='right'>
                  {student.user_subscriptions
                    ? student.user_subscriptions.map((subscription, index) => (
                        <div key={index}>{subscription.plan.name}</div>
                      ))
                    : 'Не определено'}
                </StyledTableCell>
                <StyledTableCell align='right'>10</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StudentModal open={isModalOpen} handleClose={handleClose} student={selectedStudent || {}} />
    </Home>
  );
}
