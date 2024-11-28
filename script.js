
document.addEventListener("DOMContentLoaded", () => {
    const productosLista = document.getElementById("productos-lista");

   async function cargarProductos() {

    const response = await fetch('/productos');
    const productos = await response.json();
            productos.forEach(producto => {
               // let lista = '';
            
                    lista += `
                <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                </tr> 
                `;
   }); // >:D
                productosLista.innerHTML = lista;
            }

        });
        
    cargarProductos();
    
