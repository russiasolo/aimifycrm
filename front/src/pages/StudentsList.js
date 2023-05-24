import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import moment from 'moment';
import { Container } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { listStudents } from '../redux/actions/studentsActions';
import Paginate from '../components/Paginate';

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const handleEditClick = (student) => {
    console.log('Edit student:', student);
  };
  const handleCompleteClick = (student) => {
    console.log('Complete information for student:', student);
  };
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
    return `${ageString}, ${moment().diff(moment(birthdate).add(years, 'years'), 'months')} месяцев`;
  };
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.listStudents);
  const { loading, error, students } = studentList;
  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ФИО ученика</StyledTableCell>
              <StyledTableCell align="center">Курсы</StyledTableCell>
              <StyledTableCell align="center">Баланс</StyledTableCell>
              <StyledTableCell align="center">Статус обучения</StyledTableCell>
              <StyledTableCell align="center">Контакты</StyledTableCell>
              <StyledTableCell align="center">Комментарий</StyledTableCell>
              <StyledTableCell align="center">Абонементы</StyledTableCell>
              <StyledTableCell align="center">Доп поле</StyledTableCell>
              <StyledTableCell align="center">Действия</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((studentCRM) => (
              <StyledTableRow key={studentCRM.st_id} onClick={() => handleRowClick(studentCRM)}>
                <StyledTableCell component="th" scope="row">
                  {studentCRM.st_surname} {studentCRM.st_name} {studentCRM.st_patronymic}
                  <div className="birthdate">({getAgeString(studentCRM.st_birthdate)})</div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {studentCRM.courses && studentCRM.courses.length > 0
                    ? studentCRM.courses.map((course, index) => <div key={index}>{course.cr_name}</div>)
                    : 'Не определено'}
                </StyledTableCell>

                <StyledTableCell align="right">10</StyledTableCell>
                <StyledTableCell align="right">10</StyledTableCell>
                <StyledTableCell align="right">
                  {studentCRM.contacts?.map((contact) => (
                    <div key={contact.ct_id}>
                      {contact.ct_name}: {contact.ct_person}, {contact.ct_number}, {contact.ct_email}
                    </div>
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right">{studentCRM.st_description}</StyledTableCell>
                <StyledTableCell align="right">{studentCRM.st_createdAt}</StyledTableCell>

                <StyledTableCell align="right">10</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="row" spacing={0}>
                    <IconButton onClick={console.log}>
                      <InfoOutlinedIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick()}>
                      <EditOutlinedIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={console.log}>
                      <DeleteOutlinedIcon color="error" />
                    </IconButton>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginate />
    </Container>
  );
};
export default Students;
