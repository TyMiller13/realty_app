import React from 'react'
import Sidebar from '../../../components/nav/Sidebar';
import AdForm from '../../../components/forms/AdForm';

export default function LandForRent() {

  return (
    <div>
        <h1 className="display-1 bg-primary text-light p-1">Rent Land</h1>
        <Sidebar/>
        <div className="container mt-2">
            <AdForm action="Rent" type="Land" />
        </div>
    </div>
  )
}