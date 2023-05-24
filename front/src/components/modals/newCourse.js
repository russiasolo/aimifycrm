import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material/';

import { createCourse, listCourses } from '../../redux/actions/coursesActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: '-1.2px',
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function NewCourse({ open, onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date().toISOString().slice(0, 10),
    description: '',
    max_students: '',
    status: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const requiredFields = ['name', 'start_date', 'end_date', 'max_students', 'status'];
    const formErrors = {};

    requiredFields.forEach((field) => {
      if (formData[field] === '') {
        formErrors[field] = 'Это поле обязательно для заполнения';
      }
    });

    setErrors(formErrors);

    // Если есть ошибки, возвращаем false
    if (Object.keys(formErrors).length > 0) {
      return false;
    }

    return true;
  };

  const handleCreate = () => {
    if (validateForm()) {
      dispatch(createCourse(formData)).then(() => {
        setSaved(true);
        dispatch(listCourses());
        setTimeout(() => {
          setSaved(false);
          handleCloseModal();
        }, 1000);
      });
    }
  };

  const handleCloseModal = () => {
    if (validateForm()) {
      onClose();
      setErrors({});
      setFormData({
        name: '',
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
        description: '',
        max_students: '',
        status: '',
      });
    } else {
      setConfirmClose(true);
    }
  };

  const handleConfirmClose = () => {
    setConfirmClose(false);
    onClose();
    setErrors({});
    setFormData({
      name: '',
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      description: '',
      max_students: '',
      status: '',
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleCloseModal}>
        <Box className={classes.paper}>
          <IconButton className={classes.closeBtn} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
          <h2>Создание нового курса</h2>
          <TextField
            name="name"
            label="Имя курса"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            margin="normal"
          />
          <TextField
            name="start_date"
            label="Начало обучения"
            type="date"
            value={formData.start_date}
            onChange={handleInputChange}
            error={!!errors.start_date}
            helperText={errors.start_date}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="end_date"
            label="Конец обучения"
            type="date"
            value={formData.end_date}
            onChange={handleInputChange}
            error={!!errors.end_date}
            helperText={errors.end_date}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="description"
            label="Описание курса"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="max_students"
            label="Максимальное количество студентов"
            type="number"
            value={formData.max_students}
            onChange={handleInputChange}
            error={!!errors.max_students}
            helperText={errors.max_students}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal" className={classes.formControl}>
            <InputLabel id="status-label">Статус</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Идет набор">Идет набор</MenuItem>
              <MenuItem value="Обучается">Обучается</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Создать
          </Button>
          {saved && <p style={{ textAlign: 'center' }}>Сохранено успешно!</p>}
        </Box>
      </Modal>
      <Modal open={confirmClose} onClose={() => setConfirmClose(false)}>
        <Box className={classes.paper}>
          <p>Вы действительно хотите закрыть? Все несохраненные данные будут потеряны.</p>
          <Button variant="outlined" onClick={handleConfirmClose}>
            Да, закрыть
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setConfirmClose(false)}>
            Нет, продолжить редактирование
          </Button>
        </Box>
      </Modal>
    </>
  );
}
