import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center mt-4">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
        role="status">
      </div>
    </div>
  )
}

export default Loader