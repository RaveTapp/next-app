import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingComponent({label}: {label?: string}) {
  return (
    <div className='fixed inset-0 flex flex-col gap-2 justify-center items-center'>
        <Spinner />
        <span>{label || 'Loading...'}</span>
    </div>
  )
}
