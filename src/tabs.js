export default class Tabs {
  constructor(idElemento) {
    this.tabs = document.getElementById(idElemento);
    this.nav = this.tabs.querySelector('.tabs');

    // COMPROBAMOS QUE EL ELEMENTO QUE CLICKEAMOS TENGA LA CLASE DE tabs__link.
    this.nav.addEventListener('click', (e) => {
      if ([...e.target.classList].includes('tabs__button')) {
        // OBTENEMOS LA TAB QUE QUEREMOS MOSTRAR
        const tab = e.target.dataset.tab;

        // QUITAMOS LA CLASE ACTIVA DE ALGUNA OTRAS TAB QUE LA TENGAN.
        if (this.tabs.querySelector('.tab--active')) {
          this.tabs.querySelector('.tab--active').classList.remove('tab--active');
        }

        // QUITAMOS LA CLASE ACTIVA DEL BOTON
        if (this.tabs.querySelector('.tabs--button--active')) {
          this.tabs.querySelector('.tabs--button--active').classList.remove('tabs--button--active');
        }

        // AGREGAMOS LA CLASE ACTIVA AL TAB
        this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

        // AGREGAMOS LA CLASE ACTIVA AL BOTON
        e.target.classList.add('tabs__button--active')
      }
    })
  }
}