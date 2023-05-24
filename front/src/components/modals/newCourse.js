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

import { createCourse, listCourses } from '../../redux/actions/coursesActions';
import { listStudents } from '../../redux/actions/studentsActions';

const NewCourse = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.listStudents.students);

  const [newCourse, setNewCourse] = useState({
    cr_name: '',
    cr_startdate: '',
    cr_enddate: '',
    cr_description: '',
    cr_nowst: 0,
    cr_maxst: '',
    cr_status: '',
    students: [],
  });
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);

  const handleInputChange = (event) => {
    setNewCourse({
      ...newCourse,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const studentIds = selectedStudents.map((student) => student.value);
      const courseData = {
        ...newCourse,
        students: studentIds,
      };
      await dispatch(createCourse(courseData));
      setSnackbarMessage('Course created successfully');
      setSnackbarOpen(true);
      dispatch(listCourses());
      setTimeout(() => {
        onClose();
        setSelectedStudents([]); // Очистить выбранных студентов после создания курса
      }, 2000);
    } catch (error) {
      setSnackbarMessage('An error occurred while creating the course');
      setSnackbarOpen(true);
    } finally {
      setSaving(false);
    }
  };

  const studentOptions = students.map((student) => ({
    value: student.st_id,
    label: `${student.st_surname} ${student.st_name} ${student.st_patronymic}`,
  }));

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create new course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="cr_name"
            label="Course name"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="cr_startdate"
            label="Start date"
            type="date"
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="cr_enddate"
            label="End date"
            type="date"
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="cr_description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="cr_maxst"
            label="Maximum number of students"
            type="number"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField margin="dense" name="cr_status" label="Status" fullWidth onChange={handleInputChange} />
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
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>

        <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} message={snackbarMessage} />
      </Dialog>
    </div>
  );
};

NewCourse.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewCourse;
