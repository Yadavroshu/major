import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const { id } = useParams();
    // Check for "self" in the id and set heiring accordingly.
    let jobId = id;
    let heiring = false;
    if (jobId.endsWith("self")) {
      heiring = true;
      jobId = jobId.replace("self", "");
    }

  const queryClient = useQueryClient();
 
  const { data: job, isLoading, isError, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/jobs/${jobId}`);
      console.log("Job data:", data);
      return data;
    },
  });

  const { mutate: applyJob, isLoading: applyingJob } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post(`/jobs/${jobId}/apply`);
      return data;
    },
    onSuccess: () => {
      toast.success("Your profile is shared with recruiter");
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to apply for job");
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {/* Job Header */}
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="mb-4">
        <p className="text-lg font-semibold">{job.company}</p>
        <p className="text-md text-gray-600">
          {job.location} &middot; Salary: ${job.salary}
        </p>
        <p className="text-sm text-gray-500">
          Posted on: {new Date(job.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Requirements</h2>
          <ul className="list-disc ml-6">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Posted By */}
      {job.postedBy && (
        <div className="mb-6">
            <Link to={`/profile/${job.postedBy.username}`} key={job.postedBy.username}>
          <h2 className="text-xl font-bold mb-2">Posted By</h2>
          <div className="flex items-center">
            <img
              src={job.postedBy.profilePicture || '/avatar.png'}
              alt={job.postedBy.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold">{job.postedBy.name}</p>
              <p className="text-sm text-gray-600">@{job.postedBy.username}</p>
            </div>
            </div>
          </Link>
        </div>
      )}

      {/* Applicants */}
      <div className="mb-6">
  <h2 className="text-xl font-bold mb-2">Applicants</h2>
  {job.applicants && job.applicants.length > 0 ? (
    <div className="space-y-2">
      {job.applicants.map((applicant) => (
        <div key={applicant._id} className="flex items-center space-x-2">
          <Link to={`/profile/${applicant.username}`}>
            <div className="flex items-center">
              <img
                src={applicant.profilePicture || '/avatar.png'}
                alt={applicant.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{applicant.name}</p>
                <p className="text-sm text-gray-600">@{applicant.username}</p>
              </div>
            </div>
          </Link>
          { heiring && (
          <Link to={`/messages/${applicant.name}`}>
            <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
              Message
            </button>
          </Link>
          )
          }
            </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600">No applicants yet.</p>
  )}
</div>

      {/* Apply Button */}
      <button
        onClick={() => applyJob()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
        disabled={applyingJob}
      >
        {applyingJob ? (
          "Applying..."
        ) : (
          "Apply for Job"
        )}
      </button>
    </div>
  );
};

export default JobDetails;