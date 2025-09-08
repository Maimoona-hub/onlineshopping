import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Order() {
  const location = useLocation()
  const { product, quantity } = location.state // Get product and quantity from Home page

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')

  const handleOrder = async () => {
    if (!name || !contact || !email) return alert('Please fill all fields')

    // Insert order into Supabase
    const { data, error } = await supabase.from('Order').insert([
      {
        name,
        contact,
        email,
        product: product.name,
        quantity: quantity, // Selected quantity
        total_price: product.price * quantity // Total price calculation
      }
    ])

    if (error) {
      alert('Error placing order: ' + error.message)
    } else {
      alert('Order placed successfully!')
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Order: {product.name}</h1>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Price: ${product.price}</p>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Quantity: {quantity}</p>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Total: ${product.price * quantity}</p>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contact}
        onChange={e => setContact(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc' }}
      />

      <button
        onClick={handleOrder}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#667eea',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#556cd6'}
        onMouseOut={e => e.target.style.backgroundColor = '#667eea'}
      >
        Place Order
      </button>
    </div>
  )
}

export default Order
