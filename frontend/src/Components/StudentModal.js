import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

const StudentModal = ({ open, handleClose, student }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{student.full_name}</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>Дата рождения: {student.birth_date}</Typography>
        <Typography variant='body1'>
          Пол: {student.gender === 'М' ? 'Мужской' : 'Женский'}
        </Typography>
        <Typography variant='body1'>Контакт родителя 1: {student.parent_contact_1}</Typography>
        <Typography variant='body1'>Контакт родителя 2: {student.parent_contact_2}</Typography>
        <Typography variant='body1'>Почта родителя: {student.parent_email}</Typography>
        <Typography variant='body1'>Комментарий к ученику: {student.student_comment}</Typography>
        {/* Добавьте дополнительную информацию о студенте по вашему усмотрению */}
      </DialogContent>
    </Dialog>
  );
};

export default StudentModal;
