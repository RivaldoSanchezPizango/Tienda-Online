import data from './data/productos.js';
const btnAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const btnCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const ventanaCarrito = document.getElementById('carrito');
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
const producto = document.getElementById('producto');
let carrito = [];
const formatearMoneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
const notificaion = document.getElementById('notificacion');

const renderCarrito = () => {
  ventanaCarrito.classList.add('carrito--active');

  // ELIMINAMOS TODOS LOS PRODUCTOS ANTERIORES PARA CONSTRUIR EL CARRITO DESDE CERO
  const productosAnteriores = ventanaCarrito.querySelectorAll('.carrito__producto');
  productosAnteriores.forEach((producto) => producto.remove())

  let total = 0;

  // COMPROBAMOS SI HAY PRODUCTOS
  if (carrito.length < 1) {
    // PONEMOS LA CLASE DE CARRITO VACIO
    ventanaCarrito.classList.add('carrito--vacio');
  } else {
    // ELIMINAMOS LA CLASE CARRITO VACIO
    ventanaCarrito.classList.remove('carrito--vacio');

    //  ITERAMOS SOBRE CADA PRODUCTO DEL CARRITO Y LO MOSTRAMOS
    carrito.forEach((productoCarrito) => {
      // OBTENEMOS EL PRECIO DEL ARCHIVO PRODUCTO.JS
      // CUANDO EL ID DEL ITEM DEL CARRITO SEA EL MISMO QUE ALGUNO DE LA LISTA
      data.productos.forEach((productoBaseDatos) => {
        if (productoBaseDatos.id === productoCarrito.id) {
          productoCarrito.precio = productoBaseDatos.precio;

          total += productoBaseDatos.precio * productoCarrito.cantidad
        }
      });

      // ESTABLECEMOS LA RUTA DE LA IMAGEN QUE VAMOS A QUERER MOSTRAR
      let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
      if (productoCarrito.color === 'rojo') {
        thumbSrc = './img/thumbs/rojo.jpg'
      } else if (productoCarrito.color === 'amarillo') {
        thumbSrc = './img/thumbs/amarillo.jpg'
      }

      //CREAMOS UNA PLANTILLA DEL CODIGO HTML
      const plantillaProductos = `
  <div class="carrito__producto-info">
    <img src="${thumbSrc}" alt="" class="carrito__thumb" />
    <div>
        <p class="carrito__producto-nombre">
          <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
        </p>
        <p class="carrito__producto-propiedades">
          Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${productoCarrito.color}</span>
        </p>
    </div>
    </div>
          <div class="carrito__producto-contenedor-precio">
            <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
              />
              </svg>
              </button>
              <p class="carrito__producto-precio">${formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
    </div>
  `;
      // CREAMOS UN DIV
      const itemCarrito = document.createElement('div');

      // LE AGREGAMOS LA CLASE DE carrito__producto
      itemCarrito.classList.add('carrito__producto');

      // LE INSERTAMOS LA PLANTILLA DENTRO DEL ELEMENTO
      itemCarrito.innerHTML = plantillaProductos;

      // AGREGAMOS EL PRODUCTO A LA VENTANA DEL CARRITO
      ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
    })
  }
  ventanaCarrito.querySelector('.carrito__total').innerText = formatearMoneda.format(total);
}

//ABRIR CARRITO
btnAbrirCarrito.forEach((boton) => {
  boton.addEventListener('click', (e) => {
    renderCarrito();
  })
})

// CERRAR CARRITO
btnCerrarCarrito.forEach((boton) => {
  boton.addEventListener('click', (e) => {
    ventanaCarrito.classList.remove('carrito--active');
  })
})

// BOTON AGREGAR CARRITO
btnAgregarCarrito.addEventListener('click', (e) => {
  const id = producto.dataset.productoId;
  const nombre = producto.querySelector('.producto__nombre').innerText;
  const cantidad = parseInt(producto.querySelector('#cantidad').value);
  const color = producto.querySelector('#propiedad-color  input:checked').value;
  const tamaño = producto.querySelector('#propiedad-tamaño  input:checked').value;

  if (carrito.length > 0) {
    let productoEnCarrito = false;
    carrito.forEach((item) => {
      if (item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño) {
        item.cantidad += cantidad;
        productoEnCarrito = true;
      }
    })
    if (!productoEnCarrito) {
      carrito.push({
        id: id,
        nombre: nombre,
        cantidad: cantidad,
        color: color,
        tamaño: tamaño
      });
    }
  } else {
    carrito.push({
      id: id,
      nombre: nombre,
      cantidad: cantidad,
      color: color,
      tamaño: tamaño
    });
  }

  // ESTABLECEMOS LA RUTA DE LA IMAGEN QUE VAMOS A QUERER MOSTRAR
  let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
  if (color === 'rojo') {
    thumbSrc = './img/thumbs/rojo.jpg'
  } else if (color === 'amarillo') {
    thumbSrc = './img/thumbs/amarillo.jpg'
  }

  notificaion.querySelector('img').src = thumbSrc;
  // MOSTRAR LA NOTIFICACION
  notificaion.classList.add('notificacion--active');

  // DESPUES DE 5 SEGUNDOS LO OCULTAMOS
  setTimeout(() => {
    notificaion.classList.remove('notificacion--active');
  }, 5000);

})

// BOTONES ELIMINAR EL CARRITO
ventanaCarrito.addEventListener('click', (e) => {
  if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {
    const producto = e.target.closest('.carrito__producto');
    const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);

    carrito = carrito.filter((item, index) => {
      if (index != indexProducto) {
        return item;
      }
    });
    renderCarrito();
  }
});
