import React, { useState } from 'react';
import './App.css'

function App() {

  const [tab, setTab] = useState(1);
  const [productos, setProductos] = useState([]);
  const [inventario, setInventario] = useState([]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleAgregarProducto = (producto) => {
    setProductos([...productos, producto]);
    setInventario([...inventario, { id: producto.id, nombre: producto.nombre, cantidad: 0 }]);
  };

  const handleRegistrarEntradaSalida = (entradaSalida) => {
    const nuevoInventario = [...inventario];
    const productoIndex = nuevoInventario.findIndex(item => item.id === entradaSalida.productoId);

    if (productoIndex !== -1) {
      if (entradaSalida.tipo === 'entrada') {
        nuevoInventario[productoIndex].cantidad += entradaSalida.cantidad;
      } else {
        nuevoInventario[productoIndex].cantidad -= entradaSalida.cantidad;
      }
    }

    setInventario(nuevoInventario);
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabChange(1)}>Captura de Productos</button>
        <button onClick={() => handleTabChange(2)}>Inventario</button>
        <button onClick={() => handleTabChange(3)}>Registro de Entradas/Salidas</button>
      </div>

      <div className="tab-content">
        {tab === 1 && <CapturaProductosTab productos={productos} onAgregarProducto={handleAgregarProducto} />}
        {tab === 2 && <InventarioTab inventario={inventario} />}
        {tab === 3 && <RegistroEntradasSalidasTab productos={productos} onRegistrarEntradaSalida={handleRegistrarEntradaSalida} />}
      </div>
    </div>
  );
}

function CapturaProductosTab({ productos, onAgregarProducto }) {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      id: productos.length + 1,
      nombre: nombreProducto,
      precio: precioProducto,
    };
    onAgregarProducto(nuevoProducto);
    setNombreProducto('');
    setPrecioProducto('');
  };

  return (
    <div id='captura'>
      <br/>
      <h2>Captura de Productos</h2>
      <form onSubmit={handleSubmit}>
        <div><p>Nombre del producto</p><input type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} /></div>
        <div><p>Precio del producto</p><input type="text" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} /></div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

function InventarioTab({ inventario }) {
  return (
    <div id='inventario'>
      <h2>Inventario</h2>
      <table>
        <tr>
          <th>ID de producto</th>
          <th>Producto</th>
          <th>Cantidad</th>
        </tr>
        {inventario.map((producto) => (

          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.cantidad}</td>
          </tr>

        ))}
      </table>
    </div>
  );
}

function RegistroEntradasSalidasTab({ productos, onRegistrarEntradaSalida }) {
  const [productoId, setProductoId] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const entradaSalida = {
      productoId: parseInt(productoId),
      tipo,
      cantidad: parseInt(cantidad),
    };
    onRegistrarEntradaSalida(entradaSalida);
    setProductoId('');
    setTipo('entrada');
    setCantidad('');
  };

  return (
    <div id='registro'>
      <br/>
      <h2>Registro de Entradas/Salidas</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <p>Producto </p>
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
          <option value="">Selecciona un Producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>{producto.nombre}</option>
          ))}
        </select></div>
        <div>
        <p>Tipo de movimiento </p>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select></div>
        <div>
        <p>Cantidad </p>
        <input type="number" placeholder="0" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        </div>
        <button type="submit">Registrar Entrada/Salida</button>
      </form>
    </div>
  );
}

export default App;
