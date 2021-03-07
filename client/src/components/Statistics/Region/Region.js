import React from 'react'

const Region = (props) => {
 const listItems = props.names.map((name, index) =>
    <li className="dropdown-item" key={index}>
      {name}
    </li>
  );
    return (
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {listItems}
        </ul>
    )
}  

export default Region