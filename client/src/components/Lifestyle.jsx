import React from 'react'

const Lifestyle = ({data, setData}) => {
  return (
    <div className='p-10'>
        <label className='block text-md font-medium text-white mb-2'>How would you describe your stress level on a daily basis?</label>
        <input onChange={(e)=> setData({...data, l1: e.target.value})} value={data.l1}
          type='text' id='l1' className='block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm' 
        />

        <label className='block text-md font-medium text-white mb-2'>How many hours of sleep do you typically get per night?</label>
        <input onChange={(e)=> setData({...data, l2: e.target.value})} value={data.l2}
          type='text' id='l2' className='block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm' 
        />

        <label className='block text-md font-medium text-white mb-2'>Do you smoke? If yes, how many cigarettes per day?</label>
        <input onChange={(e)=> setData({...data, l3: e.target.value})} value={data.l3}
          type='text' id='l3' className='block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm' 
        />

        <label className='block text-md font-medium text-white mb-2'>How would you describe your overall energy levels throughout the day?</label>
        <input onChange={(e)=> setData({...data, l4: e.target.value})} value={data.l4}
          type='text' id='l4' className='block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm' 
        />
    </div>
  )
}

export default Lifestyle
