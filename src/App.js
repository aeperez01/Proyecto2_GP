import React, { useState } from 'react';

function App() {
  const [tab, setTab] = useState(1);
  const [productos, setProductos] = useState([]);
  const [inventario, setInventario] = useState([]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleAgregarProducto = (producto) => {
    setProductos([...productos, producto]);
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
    <div>
      <h2>Captura de Productos</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre del Producto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
        <input type="text" placeholder="Precio del Producto" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

function InventarioTab({ inventario }) {
  return (
    <div>
      <h2>Inventario</h2>
      <ul>
        {inventario.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Cantidad: {producto.cantidad}
          </li>
        ))}
      </ul>
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
    <div>
      <h2>Registro de Entradas/Salidas</h2>
      <form onSubmit={handleSubmit}>
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
          <option value="">Selecciona un Producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>{producto.nombre}</option>
          ))}
        </select>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        <button type="submit">Registrar Entrada/Salida</button>
      </form>
    </div>
  );
}

export default App;

