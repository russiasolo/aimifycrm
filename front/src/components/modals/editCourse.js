import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
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
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  useEffect(() => {
    dispatch(listStudents());
    setEditedCourse(course);
    setSelectedStudentIds(course.students.map((student) => student.st_id));
  }, [course, dispatch]);

  const handleInputChange = (event) => {
    setEditedCourse({
      ...editedCourse,
      [event.target.name]: event.target.value,
    });
  };

  const handleStudentSelection = (event) => {
    setSelectedStudentIds(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const originalStudentIds = course.students.map((student) => student.st_id);
      const studentIdsToAdd = selectedStudentIds.filter((id) => !originalStudentIds.includes(id));
      const studentIdsToRemove = originalStudentIds.filter((id) => !selectedStudentIds.includes(id));

      // Dispatching both actions
      await dispatch(updateCourse(course.cr_id, editedCourse));
      await dispatch(updateCourseStudents(course.cr_id, studentIdsToAdd, studentIdsToRemove));

      setSnackbarOpen(true);
      dispatch(listCourses());
      onClose();
    } catch (error) {
      // Handle error here
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
        <FormControl fullWidth>
          <InputLabel>Выберите студентов</InputLabel>
          <Select multiple value={selectedStudentIds} onChange={handleStudentSelection} input={<Input />} fullWidth>
            {students.map((student) => (
              <MenuItem key={student.st_id} value={student.st_id}>
                {`${student.st_surname} ${student.st_name} ${student.st_patronymic}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <CircularProgress size={20} /> : 'Сохранить'}
        </Button>
      </DialogActions>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} message="Сохранено" />
    </Dialog>
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
