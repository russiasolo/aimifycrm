import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  CircularProgress,
  Snackbar,
} from '@mui/material';

import { updateCourse, listCourses, updateCourseStudents } from '../../redux/actions/coursesActions';
import { listStudents } from '../../redux/actions/studentsActions';

const EditCourse = ({ open, onClose, course }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.listStudents.students);

  const [editedCourse, setEditedCourse] = useState(course);
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmClose, setConfirmClose] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    dispatch(listStudents());
    setEditedCourse(course);
    setSelectedStudents(
      course.students.map((student) => ({
        value: student.st_id,
        label: `${student.st_surname} ${student.st_name} ${student.st_patronymic}`,
      }))
    );
  }, [course, dispatch]);

  const handleInputChange = (event) => {
    setEditedCourse({
      ...editedCourse,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    if (selectedStudents.length > course.cr_maxst) {
      // Check if student number is exceeded
      setSnackbarMessage(
        'Превышено число студентов на курсе. Удалите студентов или увеличьте численность студентов на курсе.'
      );
      setSnackbarOpen(true);
      return;
    }

    setSaving(true);
    try {
      const originalStudentIds = course.students.map((student) => student.st_id);
      const currentStudentIds = selectedStudents.map((student) => student.value);

      const studentIdsToAdd = currentStudentIds.filter((id) => !originalStudentIds.includes(id));
      const studentIdsToRemove = originalStudentIds.filter((id) => !currentStudentIds.includes(id));

      await dispatch(updateCourse(course.cr_id, editedCourse));
      await dispatch(updateCourseStudents(course.cr_id, studentIdsToAdd, studentIdsToRemove));

      setSnackbarMessage('Сохранено');
      setSnackbarOpen(true);
      dispatch(listCourses());
      setTimeout(onClose, 2000);
    } catch (error) {
      setSnackbarMessage('Произошла ошибка при сохранении');
      setSnackbarOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmClose = () => {
    setConfirmClose(true);
  };

  const handleCloseConfirmDialog = (confirm) => {
    if (confirm) {
      onClose();
    }
    setConfirmClose(false);
  };

  const studentOptions = students.map((student) => ({
    value: student.st_id,
    label: `${student.st_surname} ${student.st_name} ${student.st_patronymic}`,
  }));

  return (
    <div>
      <Dialog open={open} onClose={handleConfirmClose}>
        <DialogTitle>Редактировать курс</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="cr_name"
            label="Название курса"
            fullWidth
            value={editedCourse.cr_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="cr_startdate"
            label="Дата начала"
            type="date"
            fullWidth
            value={editedCourse.cr_startdate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="cr_enddate"
            label="Дата окончания"
            type="date"
            fullWidth
            value={editedCourse.cr_enddate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="cr_description"
            label="Описание"
            multiline
            rows={4}
            fullWidth
            value={editedCourse.cr_description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="cr_maxst"
            label="Максимальное количество студентов"
            type="number"
            fullWidth
            value={editedCourse.cr_maxst}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <ReactSelect
              isMulti
              options={studentOptions}
              value={selectedStudents}
              onChange={setSelectedStudents}
              maxMenuHeight={500}
              menuPlacement="top"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={20} /> : 'Сохранить'}
          </Button>
        </DialogActions>

        <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} message={snackbarMessage} />
      </Dialog>
      <Dialog open={confirmClose} onClose={() => handleCloseConfirmDialog(false)}>
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>Изменения не были сохранены. Вы уверены, что хотите закрыть без сохранения?</DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseConfirmDialog(false)}>Нет</Button>
          <Button onClick={() => handleCloseConfirmDialog(true)}>Да</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditCourse.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  course: PropTypes.shape({
    cr_id: PropTypes.number.isRequired,
    cr_name: PropTypes.string.isRequired,
    cr_startdate: PropTypes.string.isRequired,
    cr_enddate: PropTypes.string.isRequired,
    cr_description: PropTypes.string.isRequired,
    students: PropTypes.arrayOf(
      PropTypes.shape({
        st_id: PropTypes.number.isRequired,
        st_name: PropTypes.string.isRequired,
        st_surname: PropTypes.string.isRequired,
        st_patronymic: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default EditCourse;
