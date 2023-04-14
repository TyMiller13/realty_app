import React from 'react';
import {IoBedOutline} from 'react-icons/io5';
import {TbBath} from 'react-icons/tb';
import {BiArea} from 'react-icons/bi';




export default function AdCard({ad}) {
  return (
    <div className='col-lg-4 p-4 gx-4 gy-4'>
        <div className="card hoverable shadow">
            <img 
                src={ad?.photos?.[0].Location} 
                alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`} 
                style={{ height:"250px", objectFit: "cover"}} 
            />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h3>{ad?.price}</h3>
                </div>
                <p className='card-text d-flex justify-content-between'>
                    {ad?.bedrooms ? (<span> <IoBedOutline/> {ad?.bedrooms} </span>) : '' }
                    {ad?.bathrooms ? (<span> <TbBath/> {ad?.bathrooms} </span>) : '' }
                    {ad?.lotsize ? (<span> <BiArea/> {ad?.lotsize} </span>) : '' }
                </p>
            </div>
        </div>
    </div>
  )
}
