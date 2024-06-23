import React, { useState } from 'react';
import "./notice.css"

function Notice(props) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const toggleCollapse = () => {setIsCollapsed(!isCollapsed)}

  return (
    <div className="notice" onClick={toggleCollapse}>
      <h3>{props.title} {isCollapsed ? "↓" : "↑"}</h3>
      {!isCollapsed && <p>{props.body}</p>}
      {!isCollapsed && props.extra}
    </div>
  )
}

export default Notice