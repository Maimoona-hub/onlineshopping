import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!name || !email) return alert('Enter name and email')

    // Check if email already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      return alert(fetchError.message)
    }

    if (existingUser) {
      return alert('This email is already registered!')
    }

    // Insert new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }])

    if (error) {
      alert(error.message)
    } else {
      navigate('/home')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '350px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Welcome</h1>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: '#667eea',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={e => e.target.style.background = '#556cd6'}
          onMouseOut={e => e.target.style.background = '#667eea'}
        >
          Enter
        </button>
      </div>
    </div>
  )
}

export default Login
