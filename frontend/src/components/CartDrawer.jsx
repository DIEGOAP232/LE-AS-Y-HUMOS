
import { useCart } from '../context/useCart'
import './CartDrawer.css'

function CartDrawer({ onContinue }) {
  const {
    items,
    total,
    hasUnconfirmedPrices,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart()

  if (!cartOpen) return null

  function continuarCompra() {
  setCartOpen(false)
  onContinue()
}

  return (
    <div className="cart-overlay" onMouseDown={() => setCartOpen(false)}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <h2 id="cart-title">Tu carrito</h2>
            <p>{items.length} tipo(s) de producto</p>
          </div>

          <button
            type="button"
            className="cart-close"
            aria-label="Cerrar carrito"
            onClick={() => setCartOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span>🛒</span>
              <h3>Tu carrito está vacío</h3>
              <p>Explora nuestra carta y elige tus platos favoritos.</p>
              <button
                type="button"
                className="cart-continue-shopping"
                onClick={() => setCartOpen(false)}
              >
                Seguir viendo la carta
              </button>
            </div>
          ) : (
            items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />

                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>

                  {Number.isFinite(item.precio) && item.precio > 0 ? (
                    <p>S/ {item.precio.toFixed(2)}</p>
                  ) : (
                    <p className="cart-price-pending">
                      Precio por confirmar
                    </p>
                  )}

                  <div className="cart-quantity">
                    <button
                      type="button"
                      aria-label={`Disminuir cantidad de ${item.nombre}`}
                      onClick={() =>
                        updateQuantity(item.id, item.cantidad - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.cantidad}</span>

                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${item.nombre}`}
                      onClick={() =>
                        updateQuantity(item.id, item.cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="cart-remove"
                  aria-label={`Eliminar ${item.nombre}`}
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </article>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total de productos</span>
              <strong>{items.reduce((sum, item) => sum + item.cantidad, 0)}</strong>
            </div>

            <div className="cart-total">
              <span>Total del pedido</span>
              <strong>
                {hasUnconfirmedPrices
                  ? 'Por confirmar'
                  : `S/ ${total.toFixed(2)}`}
              </strong>
            </div>

            {hasUnconfirmedPrices && (
              <p className="cart-notice">
                Confirma los precios antes de continuar con la compra.
              </p>
            )}

            <button
              type="button"
              className="cart-checkout-button"
              disabled={hasUnconfirmedPrices}
              onClick={continuarCompra}
            >
              Continuar con la compra
            </button>

            <button
              type="button"
              className="cart-continue-shopping"
              onClick={() => setCartOpen(false)}
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
