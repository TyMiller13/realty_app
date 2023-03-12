import React from 'react'
import Sidebar from '../../../components/nav/Sidebar';
import AdForm from '../../../components/forms/AdForm';

export default function HouseForSale() {

  return (
    <div>
        <h1 className="display-1 bg-primary text-light p-1">Sell House</h1>
        <Sidebar/>
        <div className="container mt-2">
            <AdForm action="Sell" type="House" />
        </div>
    </div>
  )
}