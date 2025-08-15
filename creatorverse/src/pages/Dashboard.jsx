import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../client.js'

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        // Get total count
        const { count } = await supabase
          .from('creators')
          .select('*', { count: 'exact', head: true });
        
        // Get recent creators
        const { data: recent } = await supabase
          .from('creators')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        setStats({
          total: count || 0,
          recent: recent || []
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome to Creatorverse
        </h1>
        
        <p className="text-xl text-gray-300 w-full mx-auto leading-relaxed">
          Your personal universe of amazing content creators. Discover, organize, and connect with the creators that inspire you most.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link 
            to="/show-creators"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Explore Creators
          </Link>
          
          <Link 
            to="/add-creator"
            className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/30"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Creator
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {loading ? '...' : stats.total}
          </h3>
          <p className="text-gray-400">Total Creators</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Growing</h3>
          <p className="text-gray-400">Your Collection</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Curated</h3>
          <p className="text-gray-400">With Love</p>
        </div>
      </div>

      {/* Recent Creators */}
      {stats.recent.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recently Added</h2>
            <Link 
              to="/show-creators"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.recent.map((creator) => (
              <Link 
                key={creator.id}
                to={`/view-creator/${creator.id}`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    className="w-12 h-12 rounded-full object-cover border border-purple-500/20"
                    src={creator.imageURL || `https://via.placeholder.com/48x48/6366f1/ffffff?text=${creator.name?.charAt(0) || '?'}`}
                    alt={creator.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/48x48/6366f1/ffffff?text=${creator.name?.charAt(0) || '?'}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {creator.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard