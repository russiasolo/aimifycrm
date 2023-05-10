import React from 'react';
import './LoginStyle.css';
import CodeIcon from '@mui/icons-material/Code';
function Leftsect() {
  return (
    <div className='bg-color'>
      <div>
        <p className='welcome-txt'>Добро пожаловать</p>
        <h1 className='welcome-txt'> на AimifyCRM</h1>
        <p className='sections'>
          <CodeIcon />
          CRM для учебных центров
        </p>
      </div>
    </div>
  );
}

export default Leftsect;
