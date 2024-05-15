import React from 'react'

const LifestyleFactors = ({data, setData}) => {
  return (
    <div className='p-10'>
        <label className='block text-md font-medium text-white mb-2'>Level of physical activity:</label>
        <input onChange={(e)=> setData({...data, ml1: e.target.value})} value={data.ml1}
          type='text' id='ml1' className='block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm' 
        />

        <label className='block text-md font-medium text-white mb-2'>Hours of sleep per night:</label>
        <input onChange={(e)=> setData({...data, ml2: e.target.value})} value={data.ml2}
          type='text' id='ml2' className='block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm'
        />

        <label className='block text-md font-medium text-white mb-2'>Specific dietary needs related to lifestyle or occupation:</label>
        <input onChange={(e)=> setData({...data, ml3: e.target.value})} value={data.ml3}
          type='text' id='ml3' className='block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm' 
        />

   </div>
  )
}

export default LifestyleFactors
