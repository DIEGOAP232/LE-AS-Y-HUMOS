
import './Hero.css'

function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="hero-tag">
              SABOR AUTÉNTICO AL CILINDRO
            </span>

            <h1 className="hero-title">
              El sabor del fuego,
              <span> directo a tu mesa.</span>
            </h1>

            <p className="hero-description">
              Disfruta de nuestro pollo y chancho al cilindro,
              preparados para compartir momentos inolvidables.
            </p>

            <div className="hero-actions">
              <a href="#menu" className="hero-button">
                Descubrir nuestra carta
              </a>

              <a href="#nosotros" className="hero-secondary-button">
                Conócenos
              </a>
            </div>

            <div className="hero-note">
              Preparado con sabor y tradición
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image-wrapper">
              <img
                src="/images/pollo-cilindro.jpg"
                alt="Pollo dorado preparado al cilindro"
                className="hero-image"
              />

              <div className="hero-image-label">
                <span>Especialidad de la casa</span>
                <strong>Hecho al cilindro</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
