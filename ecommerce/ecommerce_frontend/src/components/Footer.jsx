import React from 'react'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url('/images/footer-bg.jpg')`, // replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div>
        <h4>Poshpavillion Fashion Store</h4>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer