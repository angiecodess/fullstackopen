import React from 'react'

const Notification = ({ msg }) => {
    if (msg === null) {
        return null
    }
    return(
        <div className="notif">
            {msg}
        </div>
    )
}

export default Notification