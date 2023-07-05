const producto = document.getElementById('producto');
const productoImagen = producto.querySelector('.producto__imagen');
const thumbs = document.querySelector('.producto__thumbs');

//COLOR
const propiedadColor = producto.querySelector('#propiedad-color');

//CANTIDAD
const btnDisminuir = producto.querySelector('#disminuir-cantidad');
const btnIncrementar = producto.querySelector('#incrementar-cantidad');
const inputCantidad = producto.querySelector('#cantidad');

//FUNCIONABILIDAD DE LAS THUMBNAILS
thumbs.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const imagenSrc = e.target.src;
    const lastIndex = imagenSrc.lastIndexOf('/'); //OBTENEMOS LA POSICION DEL ULTIMO /
    const nombreImagen = imagenSrc.substring(lastIndex + 1);  //CORTAMOS LA CADENA DE TEXTO PARA OBTENER SOLAMENTE UNA PARTE
    productoImagen.src = `./img//tennis/${nombreImagen}`; //CAMBIAMOS LA RUTA DE LA IMAGEN DEL PRODUCTO
  };
});

//FUNCIONABILIDAD DE LA PROPIEDAD COLOR
propiedadColor.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT') {
    productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
  }
})

//FUNCIONABILIDAD DE LA CANTIDAD DE PRODUCTOS
btnIncrementar.addEventListener('click', (e) => {
  inputCantidad.value = parseInt(inputCantidad.value) + 1;
})

btnDisminuir.addEventListener('click', (e) => {
  if (parseInt(inputCantidad.value) > 1) {
    inputCantidad.value = parseInt(inputCantidad.value) - 1;
  }
})