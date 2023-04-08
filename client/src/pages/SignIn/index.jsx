import React from 'react'

const SignIn = () => {
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
        <div className='flex flex-col justify-center shadow-xl rounded-2xl w-[350px] h-[400px] text-center gap-8 mb-4'>
            <div>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            <p className=''>Join YouTube Courses</p>
            </div>
            
            <a href = '/signin' className=' block mt-12 transition-all duration-200 border-2 w-fit py-2 px-4 text-lg font-semibold border-gray-800 rounded-2xl mx-auto hover:text-white hover:bg-blue-600 hover:border-blue-600'>Sign In with Google</a>
        </div>
    </div>
  )
}

export default SignIn