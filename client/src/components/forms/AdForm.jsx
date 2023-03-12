import React from 'react';
import { useState } from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_API_KEY } from '../../config';
import CurrencyInput from "react-currency-input-field";


export default function AdForm({action, type}) {
    //state
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        address: "",
        title: "",
        description: "",
        lotsize: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        parking: "",
        type: "",
        loading: false,
    })
  return (
    <>
        <div className="container border border-primary">
        <div className="my-4">
            <GooglePlacesAutocomplete 
            apiKey={GOOGLE_API_KEY} 
            apiOptions="us" 
            selectProps = {{
                defaultInputValue: ad?.address, 
                placeholder: "Search for address...", 
                onChange: ({value}) => {setAd({...ad, address: value.description})},
            }} 
            />
        </div>
        <input type="text" className='form-control mb-3' placeholder='Enter Title' value={ad.title} onChange={(e) => setAd({...ad, title: e.target.value})} />
        <textarea className='form-control mb-3' placeholder='Enter Description' value={ad.description} onChange={(e) => setAd({...ad, description: e.target.value})} />
        <input type="text" className='form-control mb-3' placeholder='Enter lot size (e.g. "2000 sqft") ' value={ad.lotsize} onChange={(e) => setAd({...ad, lotsize: e.target.value})} />

        <CurrencyInput 
        placeholder='Enter price' 
        defaultValue={ad.price} 
        className="form-control mb-3" 
        onValueChange={(value) => setAd({...ad, price: value})}
        />

        <input type="number" min="0" className='form-control mb-3' placeholder='How many bedrooms?' value={ad.bedrooms} onChange={(e) => setAd({...ad, bedrooms: e.target.value})} />
        <input type="number" min="0" className='form-control mb-3' placeholder='How many bathrooms?' value={ad.bathrooms} onChange={(e) => setAd({...ad, bathrooms: e.target.value})} />
        <input type="number" min="0" className='form-control mb-3' placeholder='How many spots for parking?' value={ad.parking} onChange={(e) => setAd({...ad, parking: e.target.value})} />
        
        <button className='btn btn-primary btn-lg my-3' >Submit</button>
        </div>
        <pre> {JSON.stringify(ad, null, 4)} </pre>
    </>
  )
}
