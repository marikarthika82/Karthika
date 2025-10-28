import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Checkout from './pages/Checkout.jsx'
import { useCart } from './store/CartContext.jsx'
import crown from '../public/crown.svg'

export default function App() {
  const { toggleOpen, isOpen, cartCount } = useCart()
  return (
    <div>
      <header>
        <div className="container nav">
          <Link to="/" className="brand">
            <img src={crown} alt="logo" />
            <span>CRWN Local</span>
          </Link>
          <nav className="nav-links">
            <Link to="/shop">Shop</Link>
            <Link to="/checkout">Checkout</Link>
            <button className="btn" onClick={toggleOpen}>Cart ({cartCount})</button>
          </nav>
        </div>
      </header>

      {isOpen && <CartDropdown />}

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  )
}

function CartDropdown() {
  const { items, increment, decrement, remove, close } = useCart()
  return (
    <div className="cart-dropdown">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>Your Cart</strong>
        <button className="btn" onClick={close}>Close</button>
      </div>
      {items.length === 0 ? (
        <div className="empty">Your cart is empty.</div>
      ) : (
        <div>
          {items.map(i => (
            <div key={i.id} className="cart-item">
              <img src={i.imageUrl} alt={i.name} />
              <div style={{flex:1}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div>{i.name}</div>
                    <div className="muted">${i.price.toFixed(2)}</div>
                  </div>
                  <div className="qty">
                    <button onClick={() => decrement(i.id)}>-</button>
                    <span>{i.quantity}</span>
                    <button onClick={() => increment(i.id)}>+</button>
                  </div>
                </div>
                <button className="btn" style={{marginTop:8}} onClick={() => remove(i.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{display:'flex', justifyContent:'space-between', marginTop:12}}>
            <strong>Total</strong>
            <strong>${items.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2)}</strong>
          </div>
          <Link className="btn primary" style={{display:'block', textAlign:'center', marginTop:12}} to="/checkout" onClick={close}>Go to Checkout</Link>
        </div>
      )}
    </div>
  )
}