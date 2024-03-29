import React from 'react';
import {IoBedOutline} from 'react-icons/io5';
import {TbBath} from 'react-icons/tb';
import {BiArea} from 'react-icons/bi';
import {Badge} from 'antd';
import {Link} from 'react-router-dom';



export default function AdCard({ad}) {
    function formatNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

  return (
    <div className='col-lg-4 p-4 gx-4 gy-4'>
        <Link to={`/ad/${ad.slug}`}>
            <Badge.Ribbon text={`${ad?.type} for ${ad?.action === "Sell" ? "Sale" : "Rent"}`} color={`${ad?.action === "Sell" ? "blue" : "green"}`}>
            <div className="card hoverable shadow-lg">
                <img 
                    src={ad?.photos?.[0].Location} 
                    alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`} 
                    style={{ height:"250px", objectFit: "cover"}} 
                />
                <div className="card-body">
                    
                        <h3>${formatNumber(ad?.price)}</h3>
                        <p className='card-text'>`{ad?.address}`</p>
                    
                    <p className='card-text d-flex justify-content-between'>
                        {ad?.bedrooms ? (<span> <IoBedOutline/> {ad?.bedrooms} </span>) : '' }
                        {ad?.bathrooms ? (<span> <TbBath/> {ad?.bathrooms} </span>) : '' }
                        {ad?.lotsize ? (<span> <BiArea/> {ad?.lotsize} </span>) : '' }
                    </p>
                </div>
            </div>
            </Badge.Ribbon>
        </Link>
    </div>
  )
}
