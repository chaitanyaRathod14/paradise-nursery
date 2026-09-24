import { useSelector } from 'react-redux'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import AboutUs from './AboutUs'
import ProductList from './ProductList'
import CartItem from './CartItem'

function Navbar() {
  const itemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  )

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark">✳</span>
        <span>Paradise Nursery</span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink className="cart-link" to="/cart">
          Cart <span className="cart-count">{itemCount}</span>
        </NavLink>
      </nav>
    </header>
  )
}

function Home() {
  const navigate = useNavigate()

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">A little more life, every day</p>
          <h1>Paradise Nursery</h1>
          <p className="hero-copy">
            Bring home beautiful plants and create a space that grows with you.
          </p>
          <button className="button button-light" onClick={() => navigate('/plants')}>
            Get Started <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="hero-note">Curated houseplants · Thoughtful care · Delivered happy</div>
      </section>
      <AboutUs />
    </main>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
      <footer className="site-footer">Paradise Nursery <span>·</span> Grown with care</footer>
    </div>
  )
}

export default App
