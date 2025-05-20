import React from 'react'

const Logout = ({showNotification}) => {
    const handleLogout = async () => {
        const confirmed = window.confirm('Are you sure about logging out?');
        if(confirmed) {
            localStorage.removeItem("token");
            showNotification('Logged Out Successfully', 'success')
            await navigation.reload();
        }
    }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout