import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import IngresarData from './componentes.js';

function App() {
  const [ProductoActual,SetProductoActual]=useState({
    fecha:'',
    producto:'',
    precio:'',
    categoria:''
  });

  const [productos,setProductos]=useState([]);

  const mantenerCambio = (event) => {
    const {name,value} = event.target;
    SetProductoActual(prev => ({
      ...prev,
      [name]:value
    }));
  };

  const agregarProducto = () => {
    var nvafecha=new Date().toLocaleDateString();

    const productoActualFecha = {
      ...ProductoActual,fecha: nvafecha
    };

    setProductos(prev => [...prev, productoActualFecha]);

    SetProductoActual({
      fecha:'',
      producto:'',
      precio:'',
      categoria:''
    });
  }

  return (

    <>
<body>
  <div className='menu'>
    <button>Captura de productos</button>
    <button>Inventario</button>
  </div>
  <div className='form'>
  <h1>Formulario de ingreso</h1>
  <p>Por favor, ingrese los siguientes datos para poder actualizar el inventario.</p>
  <IngresarData className='inputPersonalizado' etiqueta='Nombre de producto' nombre='producto' value={ProductoActual.producto} onChange={mantenerCambio} type='text'></IngresarData>
  <IngresarData className='inputPersonalizado' etiqueta='Precio unitario' nombre='precio' value={ProductoActual.precio} onChange={mantenerCambio} type='text'></IngresarData>
  <IngresarData className='inputPersonalizado' etiqueta='Categoria' nombre='categoria' value={ProductoActual.categoria} onChange={mantenerCambio} type='text'></IngresarData>
  <button className='btnGuardar' onClick={agregarProducto}>Guardar</button>
  </div>
  <ul className='lista'>
  {productos.map((producto, index) => (
    <li key={index}>{`Fecha de captura: ${producto.fecha} | Producto: ${producto.producto} | Precio: \$${producto.precio} | Categoria: ${producto.categoria}`}</li>
      ))}
  </ul>

  <div className='Existencias'>
    <h1>Control de inventario</h1>

  </div>
</body>
</>

  );
}

export default App;
