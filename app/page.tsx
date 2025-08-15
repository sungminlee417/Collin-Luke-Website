export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      color: '#111827',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        fontWeight: 'bold',
        color: '#EE2E31'
      }}>
        The Muse Duo
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', textAlign: 'center', maxWidth: '600px' }}>
        Classical Music Ensemble - Testing deployment without providers and complex components
      </p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#ffffff', 
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p><strong>✅ Next.js is working!</strong></p>
        <p>If you see this, the basic setup is correct.</p>
      </div>
    </div>
  )
}
