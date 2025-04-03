// App.js
import React, { useState, useEffect } from 'react';
import JobCard from './components/JobCard';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        // Using GitHub Jobs API proxy since the original API is deprecated
        const response = await fetch('https://remotive.com/api/remote-jobs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        setJobs(data.jobs || []);
        setFilteredJobs(data.jobs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term and category
  useEffect(() => {
    const results = jobs.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (selectedCategory === 'all') {
        return titleMatch;
      } else {
        // Map API job_type to our categories
        const categoryMap = {
          'full-time': ['full_time', 'full-time'],
          'part-time': ['part_time', 'part-time'],
          'remote': ['remote', 'remote-ok']
        };
        
        const categoryMatch = categoryMap[selectedCategory].some(cat => 
          job.job_type?.toLowerCase().includes(cat) || 
          job.category?.toLowerCase().includes(cat)
        );
        
        return titleMatch && categoryMatch;
      }
    });
    
    setFilteredJobs(results);
  }, [searchTerm, selectedCategory, jobs]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">Job Listings</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchBar onSearch={handleSearch} />
            <FilterDropdown onCategoryChange={handleCategoryChange} />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <p>Try refreshing the page or check back later.</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p>No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Job Listing - Built for Starlabs Technologies</p>
        </div>
      </footer>
    </div>
  );
}

export default App;