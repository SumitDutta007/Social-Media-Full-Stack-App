import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PrimarySearchAppBar from '../../components/topbar/topbar';
import ResponsiveDrawer from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightsidebar/Rightsidebar';
import BottomNav from '../../components/bottomNav/BottomNav';
import Post from '../../components/posts/Post';
import axiosInstance from '../../axios.js';
import './searchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'users'

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const searchContent = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log('Searching for:', query);
        
        // Search for users
        const usersRes = await axiosInstance.get(`/api/users/search?q=${query}`);
        setUsers(usersRes.data);

        // Search for posts by username
        const postsRes = await axiosInstance.get(`/api/posts/search?username=${query}`);
        setPosts(
          postsRes.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );

        console.log('Users found:', usersRes.data);
        console.log('Posts found:', postsRes.data);
      } catch (err) {
        console.error('Search error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    searchContent();
  }, [query]);

  return (
    <div>
      <PrimarySearchAppBar />
      <div className="searchResultsContainer">
        <ResponsiveDrawer />
        <div className="searchResultsMain">
          <div className="searchResultsWrapper">
            <h2 className="searchTitle">
              Search Results for: <span className="searchQuery">"{query}"</span>
            </h2>

            {/* Tabs */}
            <div className="searchTabs">
              <button
                className={`searchTab ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                Posts ({posts.length})
              </button>
              <button
                className={`searchTab ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                People ({users.length})
              </button>
            </div>

            {loading ? (
              <div className="searchLoading">
                <p>Searching...</p>
              </div>
            ) : (
              <>
                {/* Posts Tab */}
                {activeTab === 'posts' && (
                  <div className="searchPostsSection">
                    {posts.length === 0 ? (
                      <p className="noResults">No posts found for "{query}"</p>
                    ) : (
                      posts.map((post) => (
                        <Post key={post._id || post.id} post={post} />
                      ))
                    )}
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                  <div className="searchUsersSection">
                    {users.length === 0 ? (
                      <p className="noResults">No users found for "{query}"</p>
                    ) : (
                      <div className="usersList">
                        {users.map((foundUser) => (
                          <Link
                            key={foundUser._id}
                            to={`/profile/${foundUser.username}`}
                            className="userCard"
                          >
                            <img
                              className="userCardImg"
                              src={
                                foundUser.profilePicture
                                  ? PF + '/' + foundUser.profilePicture
                                  : PF + '/users/noAvatar.png'
                              }
                              alt={foundUser.username}
                            />
                            <div className="userCardInfo">
                              <span className="userCardName">{foundUser.username}</span>
                              {foundUser.desc && (
                                <span className="userCardDesc">{foundUser.desc}</span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Rightbar />
      </div>
      <BottomNav />
    </div>
  );
}

export default SearchResults;
