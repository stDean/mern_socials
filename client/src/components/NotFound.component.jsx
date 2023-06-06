function NotFound() {

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh'
  }

  return (

    <div style={styles}>
      <p style={{
        fontWeight: 500,
        fontSize: '2rem'
      }}>
        <a href="/">Go Home</a>
      </p>
      <p style={{
        marginTop: 200,
        fontWeight: 900,
        fontSize: '5rem'
      }}>404 | Not Found</p>
    </div>
  )
}

export default NotFound