
import { useMemo, useState } from 'react'
import { CartContext } from './CartContext'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(producto) {
    setItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.id === producto.id
      )

      if (existing) {
        return currentItems.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...currentItems, { ...producto, cantidad: 1 }]
    })

    setCartOpen(true)
  }

  function updateQuantity(id, cantidad) {
    if (cantidad < 1) {
      removeFromCart(id)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    )
  }

  function removeFromCart(id) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    )
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.cantidad, 0),
    [items]
  )

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (Number(item.precio) || 0) * item.cantidad,
        0
      ),
    [items]
  )

  const hasUnconfirmedPrices = items.some(
    (item) => !Number.isFinite(item.precio) || item.precio <= 0
  )

  const value = {
    items,
    itemCount,
    total,
    hasUnconfirmedPrices,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

