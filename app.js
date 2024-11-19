const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "productos_db",
  connectionLimit: 5,
});
const app = express();
const port = 3000;
app.use(express.json());


  app.get('/productos', async (req, res) => {
      let conn;
      try {
        conn = await pool.getConnection();
        const rows = await conn.query(
          "SELECT * FROM productos"
        );
    
        res.json(rows);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      } finally {
        if (conn) conn.release(); //libera la conexión de la base de datos
      }
    });
    
    app.get('/productos/:id', async (req, res) => {
      let conn;
      try {
        conn = await pool.getConnection();
        const rows = await conn.query(
          "SELECT * FROM productos WHERE id=?",  // Consulta SQL con un parámetro de búsqueda
          [req.params.id] // El valor del id que se pasa en la URL
        );
    
        res.json(rows[0]);
      } catch (error) {
        res.status(500).json({ message: error.message});
      } finally {
        if (conn) conn.release(); 
      }
    });
    
  
    //Realizar altas con metodo POST
    app.post('/productos', async (req, res) => {
      let conn;
      try {
        conn = await pool.getConnection();
        const response = await conn.query(
          `INSERT INTO productos (nombre, precio) VALUES (?, ?)`,
          [req.body.nombre, req.body.precio]
        );
    
        res.json({ id: parseInt(response.insertId), ...req.body });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      } finally {
        if (conn) conn.release(); //release to pool
      }
    });
    
  
  
    
    
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});