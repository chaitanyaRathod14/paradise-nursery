import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { decreaseQuantity, increaseQuantity, removeFromCart } from './redux/CartSlice'

function CartItem() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!items.length) {
    return (
      <main className="page-content empty-cart">
        <p className="eyebrow">Your basket is waiting</p>
        <h1>Your cart is empty.</h1>
        <p>Choose a plant and bring a little more life home.</p>
        <Link className="button" to="/plants">Continue Shopping</Link>
      </main>
    )
  }

  return (
    <main className="page-content cart-page">
      <section className="page-heading cart-heading">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h1>Your cart</h1>
        </div>
        <Link className="text-link" to="/plants">← Continue Shopping</Link>
      </section>
      <section className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-product-info">
                <p className="card-category">{item.category}</p>
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)} each</p>
              </div>
              <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button onClick={() => dispatch(decreaseQuantity(item.id))} aria-label={`Decrease ${item.name}`}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))} aria-label={`Increase ${item.name}`}>+</button>
              </div>
              <strong className="item-total">${(item.price * item.quantity).toFixed(2)}</strong>
              <button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <p className="eyebrow">Order summary</p>
          <div className="summary-line"><span>Plants</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-line"><span>Delivery</span><span>Free</span></div>
          <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="button checkout-button" onClick={() => setCheckoutMessage('Coming Soon')}>Checkout</button>
          {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
        </aside>
      </section>
    </main>
  )
}

export default CartItem
