import React from 'react'
import { Link } from 'react-router'

const Creatorcard = ({id, name, url, description, imageURL}) => {
  return (
    <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group'>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Creator Image */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img 
            className='w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300' 
            src={imageURL || 'https://via.placeholder.com/100x100/6366f1/ffffff?text=' + (name ? name.charAt(0) : '?')} 
            alt={name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100x100/6366f1/ffffff?text=' + (name ? name.charAt(0) : '?');
            }}
          />
        </div>
        
        {/* Creator Info */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <h3 className='font-bold text-xl text-white group-hover:text-purple-300 transition-colors duration-300'>
            {name}
          </h3>
          <p className='text-gray-300 text-sm leading-relaxed line-clamp-2'>
            {description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <a 
              className='inline-flex items-center px-3 py-2 text-xs font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-500/20'
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit
            </a>
            
            <Link 
              to={`/view-creator/${id}`}
              className='inline-flex items-center px-3 py-2 text-xs font-medium bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20'
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </Link>
            
            <Link 
              to={`/edit-creator/${id}`}
              className='inline-flex items-center px-3 py-2 text-xs font-medium bg-green-600/80 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-lg shadow-green-500/20'
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Creatorcard