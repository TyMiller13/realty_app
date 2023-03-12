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
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        parking: "",
        lotsize: "",
        type: "",
        title: "",
        description: "",
        loading: false,
    })
  return (
    <>
        <div className="mb-3 form-control">
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

        <CurrencyInput 
        placeholder='Enter price' 
        defaultValue={ad.price} 
        className="form-control mb-3" 
        onValueChange={(value) => setAd({...ad, price: value})}
        />

        <input type="number" min="0" className='form-control mb-3' placeholder='How many bedrooms?' value={ad.bedrooms} onChange={(e) => setAd({...ad, bedrooms: e.target.value})} />
        <input type="number" min="0" className='form-control mb-3' placeholder='How many bathrooms?' value={ad.bathrooms} onChange={(e) => setAd({...ad, bathrooms: e.target.value})} />
        <input type="number" min="0" className='form-control mb-3' placeholder='How many spots for parking?' value={ad.parking} onChange={(e) => setAd({...ad, parking: e.target.value})} />
        <input type="text" className='form-control mb-3' placeholder='Enter lot size' value={ad.lotsize} onChange={(e) => setAd({...ad, lotsize: e.target.value})} />
        <input type="text" className='form-control mb-3' placeholder='Enter Title' value={ad.title} onChange={(e) => setAd({...ad, title: e.target.value})} />
        <textarea className='form-control mb-3' placeholder='Enter Description' value={ad.description} onChange={(e) => setAd({...ad, description: e.target.value})} />
        
        <button className='btn btn-primary btn-lg' >Submit</button>

        <pre> {JSON.stringify(ad, null, 4)} </pre>
    </>
  )
}
