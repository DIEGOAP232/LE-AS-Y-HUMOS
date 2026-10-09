
import { useState } from 'react'
import { useCart } from '../context/useCart'
import './Header.css'

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { itemCount, setCartOpen } = useCart()

  const cerrarMenu = () => setMenuAbierto(false)

  const abrirCarrito = () => {
    cerrarMenu()
    setCartOpen(true)
  }

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg container">
        <a
          className="brand-logo"
          href="#inicio"
          onClick={cerrarMenu}
          aria-label="Leñas y Humos - Inicio"
        >
          <span className="brand-icon">🔥</span>
          <span className="brand-text">
            LEÑAS <span>Y HUMOS</span>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú de navegación"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${
            menuAbierto ? 'show' : ''
          }`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <a className="nav-link" href="#inicio" onClick={cerrarMenu}>
                Inicio
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#menu" onClick={cerrarMenu}>
                Nuestra carta
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#nosotros" onClick={cerrarMenu}>
                Nosotros
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#contacto" onClick={cerrarMenu}>
                Contacto
              </a>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="header-cart-button"
                onClick={abrirCarrito}
                aria-label={`Abrir carrito, ${itemCount} productos`}
              >
                <span aria-hidden="true">🛒</span>
                Carrito
                <span className="cart-count" aria-live="polite">
                  {itemCount}
                </span>
              </button>
            </li>

            <li className="nav-item">
              <a
                className="header-order-button"
                href="#menu"
                onClick={cerrarMenu}
              >
                Ver carta
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
