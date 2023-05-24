import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Container } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import Iconify from '../components/iconify/Iconify';
import { listCourses } from '../redux/actions/coursesActions';
import EditCourse from '../components/modals/editCourse';
import NewCourse from '../components/modals/newCourse';
import Paginate from '../components/Paginate';

const Courses = () => {
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses } = courseList;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  const [editCourseOpen, setEditCourseOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const handleEditCourseOpen = (course) => {
    setCurrentCourse(course);
    setEditCourseOpen(true);
  };

  const handleEditCourseClose = () => {
    setCurrentCourse(null);
    setEditCourseOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const getDeclensionOfMonth = (num) => {
    const lastDigit = num % 10;
    if (num > 4 && num < 21) return 'месяцев';
    if (lastDigit === 1) return 'месяц';
    if (lastDigit > 1 && lastDigit < 5) return 'месяца';
    return 'месяцев';
  };

  const getCourseDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    const monthDeclension = getDeclensionOfMonth(months);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()} (${months} ${monthDeclension})`;
  };

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
      <Helmet>
        <title> Курсы | AimifyCRM </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Курсы
        </Typography>
        <NewCourse open={open} onClose={handleCloseModal} />

        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
          Новый курс
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Название курса</StyledTableCell>
              <StyledTableCell align="center">Длительность курса</StyledTableCell>
              <StyledTableCell align="center">Статус</StyledTableCell>
              <StyledTableCell align="center">Студенты</StyledTableCell>
              <StyledTableCell align="center">Описание</StyledTableCell>
              <StyledTableCell align="center">Действия</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((courseCRM) => (
              <StyledTableRow key={courseCRM.cr_id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {courseCRM.cr_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getCourseDuration(courseCRM.cr_startdate, courseCRM.cr_enddate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Chip label={courseCRM.cr_status} variant="outlined" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {courseCRM.students ? courseCRM.students.length : 0}/{courseCRM.cr_maxst} -
                  {courseCRM.students && courseCRM.students.length > 0 ? (
                    <>
                      {courseCRM.students.slice(0, 2).map((student, index) => (
                        <span key={index}>
                          {student.st_surname} {student.st_name} {student.st_patronymic}
                          {index < courseCRM.students.length - 1 && ', '}
                        </span>
                      ))}
                      {courseCRM.students.length > 2 && (
                        <Tooltip
                          title={
                            <List>
                              {courseCRM.students.slice(2).map((student, index) => (
                                <ListItem key={index}>
                                  {student.st_surname} {student.st_name} {student.st_patronymic}
                                </ListItem>
                              ))}
                            </List>
                          }
                        >
                          <a href="#" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                            и еще {courseCRM.students.length - 2}...
                          </a>
                        </Tooltip>
                      )}
                    </>
                  ) : (
                    'нет студентов'
                  )}
                </StyledTableCell>

                <StyledTableCell align="center">{courseCRM.cr_description}</StyledTableCell>
                <StyledTableCell align="center">
                  <Stack direction="row" spacing={0}>
                    <IconButton onClick={console.log}>
                      <InfoOutlinedIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleEditCourseOpen(courseCRM)}>
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
      {editCourseOpen && <EditCourse open={editCourseOpen} onClose={handleEditCourseClose} course={currentCourse} />}
      <Paginate />
    </Container>
  );
};

export default Courses;
