import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './redux/CartSlice'

const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`

export const plants = [
  { id: 1, category: 'Indoor Plants', name: 'Monstera Deliciosa', description: 'Iconic split leaves for a bright corner.', price: 34, image: image('photo-1614594975525-e45190c55d0b') },
  { id: 2, category: 'Indoor Plants', name: 'Snake Plant', description: 'A resilient, sculptural low-light favorite.', price: 26, image: image('photo-1593482892290-f54927ae2b3c') },
  { id: 3, category: 'Indoor Plants', name: 'Fiddle Leaf Fig', description: 'Tall, architectural foliage with presence.', price: 48, image: image('photo-1509423350716-97f9360b4e09') },
  { id: 4, category: 'Indoor Plants', name: 'Calathea Orbifolia', description: 'Silvery striped leaves with a soft rhythm.', price: 32, image: image('photo-1593691509543-c55fb32e5cee') },
  { id: 5, category: 'Indoor Plants', name: 'ZZ Plant', description: 'Glossy deep-green leaves and easy care.', price: 24, image: image('photo-1614594895304-fe7116ac3b58') },
  { id: 6, category: 'Indoor Plants', name: 'Bird of Paradise', description: 'Tropical drama for sunny rooms.', price: 56, image: image('photo-1533698082343-1c5f50a569c1') },
  { id: 7, category: 'Succulents', name: 'Echeveria Pearl', description: 'A pastel rosette that loves the sun.', price: 14, image: image('photo-1520302630591-fd1c66edc19b') },
  { id: 8, category: 'Succulents', name: 'Aloe Vera', description: 'Fresh, fleshy leaves with practical charm.', price: 18, image: image('photo-1509423350716-97f9360b4e09') },
  { id: 9, category: 'Succulents', name: 'Haworthia Zebra', description: 'Compact stripes for a sunny desk.', price: 12, image: image('photo-1485955900006-10f4d324d411') },
  { id: 10, category: 'Succulents', name: 'String of Pearls', description: 'Trailing green beads for a shelf edge.', price: 22, image: image('photo-1459411621453-7b03977f4bfc') },
  { id: 11, category: 'Succulents', name: 'Jade Plant', description: 'A timeless little tree with rounded leaves.', price: 20, image: image('photo-1525490829609-d166ddb58678') },
  { id: 12, category: 'Succulents', name: 'Moon Cactus', description: 'A bright pop of color in a tiny pot.', price: 16, image: image('photo-1509423350716-97f9360b4e09') },
  { id: 13, category: 'Flowering Plants', name: 'Peace Lily', description: 'Elegant white blooms and lush foliage.', price: 29, image: image('photo-1593691509543-c55fb32e5cee') },
  { id: 14, category: 'Flowering Plants', name: 'Anthurium', description: 'Heart-shaped leaves with vivid red flowers.', price: 31, image: image('photo-1597055181300-8a7c5f7d8c99') },
  { id: 15, category: 'Flowering Plants', name: 'Orchid Mist', description: 'A graceful bloom for a quiet ritual.', price: 38, image: image('photo-1566943726-6eabef75bd72') },
  { id: 16, category: 'Flowering Plants', name: 'African Violet', description: 'Petite purple flowers for a windowsill.', price: 19, image: image('photo-1497250681960-ef046c08a56e') },
  { id: 17, category: 'Flowering Plants', name: 'Bromeliad', description: 'A tropical rosette with a coral center.', price: 35, image: image('photo-1512428813834-c702c7702f7c') },
  { id: 18, category: 'Flowering Plants', name: 'Begonia Maculata', description: 'Polka-dot leaves and delicate white blooms.', price: 33, image: image('photo-1596547609652-9cf5d8f8f5c0') },
]

const categories = ['All Plants', 'Indoor Plants', 'Succulents', 'Flowering Plants']

function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const [selectedCategory, setSelectedCategory] = useState('All Plants')
  const visiblePlants = selectedCategory === 'All Plants'
    ? plants
    : plants.filter((plant) => plant.category === selectedCategory)

  return (
    <main className="page-content">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Find your green companion</p>
          <h1>Shop the collection</h1>
        </div>
        <p>Thoughtfully selected plants for every kind of home and plant parent.</p>
      </section>
      <div className="category-bar" aria-label="Plant categories">
        {categories.map((category) => (
          <button
            className={selectedCategory === category ? 'category active' : 'category'}
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <section className="product-grid">
        {visiblePlants.map((plant) => {
          const inCart = cartItems.some((item) => item.id === plant.id)
          return (
            <article className="plant-card" key={plant.id}>
              <img src={plant.image} alt={plant.name} />
              <div className="plant-card-body">
                <p className="card-category">{plant.category}</p>
                <h2>{plant.name}</h2>
                <p className="plant-description">{plant.description}</p>
                <div className="card-footer">
                  <strong>${plant.price.toFixed(2)}</strong>
                  <button className="button button-small" disabled={inCart} onClick={() => dispatch(addToCart(plant))}>
                    {inCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default ProductList
