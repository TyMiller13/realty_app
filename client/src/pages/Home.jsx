import React from 'react'
import { useAuth } from '../context/auth'

export default function Home() {
    const [auth, SetAuth] = useAuth();
  return (
    <div>
        <h1 className="display-1 bg-info text-white p-1">Welcome To Homey</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  )
}
