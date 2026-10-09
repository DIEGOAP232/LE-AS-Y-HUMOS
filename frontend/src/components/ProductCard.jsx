
import { useCart } from '../context/useCart'
import './ProductCard.css'

function ProductCard({ producto }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card h-100">
      <img
        className="product-card-image"
        src={producto.imagen}
        alt={producto.nombre}
        loading="lazy"
      />

      <div className="product-card-body">
        <span className="product-category">
          {producto.categoria}
        </span>

        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>

        <div className="product-card-footer">
          <div className="product-price">
            {Number.isFinite(producto.precio) && producto.precio > 0 ? (
              <strong>S/ {producto.precio.toFixed(2)}</strong>
            ) : (
              <span className="price-pending">
                Precio por confirmar
              </span>
            )}
          </div>

          <button
            type="button"
            className="product-card-button"
            onClick={() => addToCart(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
