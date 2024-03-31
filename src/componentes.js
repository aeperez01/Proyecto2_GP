// Input.jsx
import React from 'react';

const IngresarData = ({etiqueta,nombre,type = 'text', value, onChange,className}) => {
  return (
    <div className={className}>
    <label>{etiqueta}</label>
      <input
      name={nombre}
      type={type}
      value={value}
      onChange={onChange}/>
    </div>
  );
};

export default IngresarData;
