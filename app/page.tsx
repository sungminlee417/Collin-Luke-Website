export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      color: 'black',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The Muse Duo</h1>
      <p>Simple test version - if you see this, the basic Next.js setup works!</p>
    </div>
  )
}