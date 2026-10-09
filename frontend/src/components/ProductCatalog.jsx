
import ProductCard from './ProductCard'
import './ProductCatalog.css'
import { productos } from '../data/products'

function ProductCatalog() {
  return (
    <section id="menu" className="catalog-section">
      <div className="container">
        <div className="catalog-heading">
          <span className="catalog-eyebrow">NUESTRA PROPUESTA</span>
          <h2>Nuestra carta</h2>
          <p>
            Descubre nuestras especialidades preparadas al cilindro.
          </p>
        </div>

        <div className="row g-4">
          {productos.map((producto) => (
            <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCatalog
