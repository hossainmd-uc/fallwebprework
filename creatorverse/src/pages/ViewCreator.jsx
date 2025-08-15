import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { supabase } from '../client.js'

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCreator() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setError('Creator not found');
          console.error(error);
        } else {
          setCreator(data);
        }
      } catch (err) {
        setError('Error loading creator');
        console.error('Error loading creator:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadCreator();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading creator...</p>
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-red-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Creator Not Found</h3>
        <p className="text-gray-400 mb-8">
          The creator you're looking for doesn't exist or may have been removed.
        </p>
        <Link 
          to="/show-creators"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Creators
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        
        <Link
          to={`/edit-creator/${creator.id}`}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Creator
        </Link>
      </div>

      {/* Creator Details Card */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Creator Image */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <div className="relative">
                <img
                  className="w-48 h-48 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20"
                  src={creator.imageURL || `https://via.placeholder.com/192x192/6366f1/ffffff?text=${creator.name?.charAt(0) || '?'}`}
                  alt={creator.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/192x192/6366f1/ffffff?text=${creator.name?.charAt(0) || '?'}`;
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Creator Info */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  {creator.name}
                </h1>
                <div className="inline-flex items-center px-3 py-1 bg-purple-600/20 rounded-full text-purple-300 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Content Creator
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">About</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {creator.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Channel</h3>
                  <a
                    href={creator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors break-all"
                  >
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {creator.url}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 text-center"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Channel
                  </div>
                </a>
                
                <Link
                  to="/show-creators"
                  className="flex-1 sm:flex-initial bg-white/10 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20 text-center"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    All Creators
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  )
}

export default ViewCreator