import React, { useState } from 'react';

function JobCard({ job }) {
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-grey-800">{job.title}</h2>
            <p className="text-gray-6000 mt-1">{job.company_name}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
              {job.job_type || 'Not specified'}
            </span>
            <span className="text-sm text-gray-500 mt-1">
              {job.candidate_required_location || 'Location flexible'}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700 line-clamp-2">
            {job.description ? 
              job.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 
              'No description available'}
          </p>
        </div>
        
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={toggleDetails}
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        
        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <h3 className="font-semibold mb-2">Job Details</h3>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Company:</span> {job.company_name}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {job.candidate_required_location || 'Not specified'}
                </div>
                <div>
                  <span className="font-medium">Job Type:</span> {job.job_type || 'Not specified'}
                </div>
                <div>
                  <span className="font-medium">Salary:</span> {job.salary || 'Not specified'}
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold mb-2">Description</h3>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: job.description || 'No description available' }}
            />
            
            {job.url && (
              <div className="mt-4">
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobCard;