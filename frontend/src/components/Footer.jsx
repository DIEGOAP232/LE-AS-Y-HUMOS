
import './Footer.css'

function Footer() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <a className="footer-brand" href="#inicio">
              🔥 LEÑAS Y HUMOS
            </a>

            <p className="footer-description">
              El sabor del cilindro, preparado para compartir.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h3>Explora</h3>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#menu">Nuestra carta</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h3>Atención</h3>
            <ul>
              <li>Pedidos por confirmar</li>
              <li>Horarios por confirmar</li>
              <li>Zona de reparto por confirmar</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Leñas y Humos.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
