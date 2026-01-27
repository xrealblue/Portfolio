import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex off flex-col items-center justify-center'>
      <div className='2xl:text-4xl flex text-lg sm:text-lg md:text-xl xl:text-xl tracking-wide font-light text-white/40 uppercase'>Page not found—

        <Link href='/'>
          <p className='2xl:text-4xl text-lg sm:text-lg md:text-xl xl:text-xl  text-[#FDE037] tracking-wide font-light transition-all duration-500 hover:border-b-2 border-dotted border-[#FDE037] uppercase'>Go HOME↗</p>
        </Link>
      </div>
    </div>
  )
}

export default page
