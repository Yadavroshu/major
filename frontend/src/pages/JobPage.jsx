import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';

const JobPage = () => {
  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await axiosInstance.get('/jobs');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Job Listings</h1>
      {jobs.length === 0 ? (
        <div className="text-center">No job postings available currently.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-sm text-gray-600 mb-1">{job.company}</p>
              <p className="text-sm text-gray-600 mb-1">{job.location}</p>
              <p className="text-sm text-gray-800 mb-2">
                {job.description.length > 100
                  ? job.description.substring(0, 100) + '...'
                  : job.description}
              </p>
              <Link to={`/jobs/posting/${job._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;