import React from 'react'
import dynamic from 'next/dynamic';
const DynamicHome = dynamic(() => import("@/app/home/home"), {
  ssr: false,
});


const page = () => {
  return (
    <div>
      <DynamicHome/>
    </div>
  )
}

export default page
