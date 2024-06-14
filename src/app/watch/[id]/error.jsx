"use client"
import React from 'react'
import Error from '@/component/AnimeNotFound/Error'

const error = () => {
    window.location.reload()
  return (
    <div>
      <Error/>
    </div>
  )
}

export default error
