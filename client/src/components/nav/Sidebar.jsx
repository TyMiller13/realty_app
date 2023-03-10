import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
  return (
  <>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        </li>
        <li class="nav-item">
            <NavLink className="nav-link" to="/ad/create">Create Ad</NavLink>
        </li>
    </ul>
  </>
  );
}
