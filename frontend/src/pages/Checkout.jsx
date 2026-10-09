
import { useState } from 'react'
import { useCart } from '../context/useCart'
import './Checkout.css'

function Checkout({ onBack }) {
  const {
    items,
    total,
    hasUnconfirmedPrices,
    itemCount,
  } = useCart()

  const [form, setForm] = useState({
    nombres: '',
    telefono: '',
    modalidad: 'delivery',
    direccion: '',
    referencia: '',
    indicaciones: '',
  })

  const [errores, setErrores] = useState({})

  const actualizarCampo = (event) => {
    const { name, value } = event.target

    setForm((actual) => ({
      ...actual,
      [name]: value,
    }))

    setErrores((actual) => ({
      ...actual,
      [name]: '',
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!form.nombres.trim()) {
      nuevosErrores.nombres = 'Ingresa tu nombre.'
    }

    if (!/^[0-9]{9}$/.test(form.telefono)) {
      nuevosErrores.telefono = 'Ingresa un teléfono de 9 dígitos.'
    }

    if (form.modalidad === 'delivery' && !form.direccion.trim()) {
      nuevosErrores.direccion = 'Ingresa la dirección de entrega.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  const continuar = (event) => {
    event.preventDefault()

    if (!validarFormulario()) return

    if (items.length === 0 || hasUnconfirmedPrices) {
      return
    }

    window.alert(
      'Los datos son válidos. El registro definitivo del pedido se habilitará cuando conectemos el backend.'
    )
  }

  if (items.length === 0) {
    return (
      <section className="checkout-page">
        <div className="container checkout-empty">
          <h1>Tu carrito está vacío</h1>
          <p>Agrega productos antes de continuar con tu compra.</p>

          <button type="button" className="checkout-primary" onClick={onBack}>
            Volver a la carta
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <button
          type="button"
          className="checkout-back"
          onClick={onBack}
        >
          ← Volver a la tienda
        </button>

        <div className="checkout-heading">
          <span>LEÑAS Y HUMOS</span>
          <h1>Continúa tu compra</h1>
          <p>Revisa tu pedido y completa tus datos.</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <form className="checkout-form" onSubmit={continuar} noValidate>
              <section className="checkout-card">
                <h2>1. Datos del cliente</h2>

                <div className="checkout-field">
                  <label htmlFor="nombres">Nombre completo</label>
                  <input
                    id="nombres"
                    name="nombres"
                    value={form.nombres}
                    onChange={actualizarCampo}
                    autoComplete="name"
                    aria-invalid={Boolean(errores.nombres)}
                  />
                  {errores.nombres && (
                    <p className="checkout-error">{errores.nombres}</p>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="Ej. 987654321"
                    value={form.telefono}
                    onChange={actualizarCampo}
                    autoComplete="tel"
                    aria-invalid={Boolean(errores.telefono)}
                  />
                  {errores.telefono && (
                    <p className="checkout-error">{errores.telefono}</p>
                  )}
                </div>
              </section>

              <section className="checkout-card">
                <h2>2. ¿Cómo quieres recibir tu pedido?</h2>

                <div className="checkout-options">
                  <label className={`checkout-option ${form.modalidad === 'delivery' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="modalidad"
                      value="delivery"
                      checked={form.modalidad === 'delivery'}
                      onChange={actualizarCampo}
                    />
                    <span>
                      <strong>Entrega a domicilio</strong>
                      <small>Recibir en una dirección</small>
                    </span>
                  </label>

                  <label className={`checkout-option ${form.modalidad === 'pickup' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="modalidad"
                      value="pickup"
                      checked={form.modalidad === 'pickup'}
                      onChange={actualizarCampo}
                    />
                    <span>
                      <strong>Recojo</strong>
                      <small>Recoger el pedido en el local</small>
                    </span>
                  </label>
                </div>

                {form.modalidad === 'delivery' && (
                  <>
                    <div className="checkout-field">
                      <label htmlFor="direccion">Dirección de entrega</label>
                      <input
                        id="direccion"
                        name="direccion"
                        value={form.direccion}
                        onChange={actualizarCampo}
                        autoComplete="street-address"
                        aria-invalid={Boolean(errores.direccion)}
                      />
                      {errores.direccion && (
                        <p className="checkout-error">{errores.direccion}</p>
                      )}
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="referencia">Referencia (opcional)</label>
                      <input
                        id="referencia"
                        name="referencia"
                        value={form.referencia}
                        onChange={actualizarCampo}
                        placeholder="Punto de referencia"
                      />
                    </div>
                  </>
                )}

                <div className="checkout-field">
                  <label htmlFor="indicaciones">
                    Indicaciones adicionales (opcional)
                  </label>
                  <textarea
                    id="indicaciones"
                    name="indicaciones"
                    rows={3}
                    value={form.indicaciones}
                    onChange={actualizarCampo}
                    placeholder="Alguna indicación para el pedido"
                  />
                </div>
              </section>

              <button
                type="submit"
                className="checkout-primary checkout-submit"
                disabled={hasUnconfirmedPrices}
              >
                Continuar
              </button>

              {hasUnconfirmedPrices && (
                <p className="checkout-notice">
                  La compra estará disponible cuando confirmemos los precios
                  de los productos.
                </p>
              )}
            </form>
          </div>

          <div className="col-lg-5">
            <aside className="checkout-card checkout-summary">
              <h2>Resumen del pedido</h2>

              {items.map((item) => (
                <div className="checkout-product" key={item.id}>
                  <div>
                    <strong>{item.nombre}</strong>
                    <p>Cantidad: {item.cantidad}</p>
                  </div>

                  <span>
                    {Number.isFinite(item.precio) && item.precio > 0
                      ? `S/ ${(item.precio * item.cantidad).toFixed(2)}`
                      : 'Por confirmar'}
                  </span>
                </div>
              ))}

              <div className="checkout-summary-total">
                <span>Productos</span>
                <strong>{itemCount}</strong>
              </div>

              <div className="checkout-summary-total">
                <span>Entrega</span>
                <strong>Por confirmar</strong>
              </div>

              <div className="checkout-summary-total checkout-grand-total">
                <span>Total</span>
                <strong>
                  {hasUnconfirmedPrices
                    ? 'Por confirmar'
                    : `S/ ${total.toFixed(2)}`}
                </strong>
              </div>

              <p className="checkout-legal-note">
                El pedido no se registrará hasta completar la integración
                con el sistema de pedidos.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
