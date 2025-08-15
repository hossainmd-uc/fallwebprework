import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {supabase} from './../client.js'
import Creatorcard from '../components/Creatorcard.jsx';

const ShowCreators = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData () {
      try {
        setLoading(true);
        const {data, error} = await supabase.from('creators').select("*").order('created_at', { ascending: false });
        if (error){
          console.log(error);
        } else {
          setData(data || []);
        }
      } catch (err) {
        console.error('Error loading creators:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading creators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          All Creators
        </h1>
        <p className="text-gray-300 w-full mx-auto">
          Discover amazing content creators from across the internet. Click on any creator to learn more about them.
        </p>
      </div>

      {/* Creators Grid */}
      {data.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data.map((item) => (
            <Creatorcard 
              key={item.id}
              id={item.id}
              imageURL={item.imageURL} 
              url={item.url} 
              name={item.name} 
              description={item.description}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Creators Yet</h3>
          <p className="text-gray-400 mb-8 w-full mx-auto">
            It looks like there are no creators in your Creatorverse yet. Start building your collection by adding your first creator!
          </p>
          <Link 
            to="/add-creator"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Your First Creator
          </Link>
        </div>
      )}
    </div>
  )
}

export default ShowCreators