
import { useState } from 'react'
import { CartProvider } from './context/CartContext.jsx'
import CartDrawer from './components/CartDrawer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCatalog from './components/ProductCatalog'
import Footer from './components/Footer'
import Checkout from './pages/Checkout'

function AppContent() {
  const [vista, setVista] = useState('tienda')

  return (
    <>
      <Header />

      {vista === 'tienda' ? (
        <main>
          <Hero />
          <ProductCatalog />

          <section id="nosotros" className="container py-5">
            <h2>Nosotros</h2>
            <p>
              Tradición, sabor y preparación al cilindro.
            </p>
          </section>
        </main>
      ) : (
        <main>
          <Checkout onBack={() => setVista('tienda')} />
        </main>
      )}

      <Footer />

      {vista === 'tienda' && (
        <CartDrawer
          onContinue={() => setVista('checkout')}
        />
      )}
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
