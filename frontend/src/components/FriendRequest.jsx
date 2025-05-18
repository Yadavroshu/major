// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const FriendRequest = ({ request }) => {
// 	const queryClient = useQueryClient();

// 	const { mutate: acceptConnectionRequest } = useMutation({
// 		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
// 		onSuccess: () => {
// 			toast.success("Connection request accepted");
// 			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
// 		},
// 		onError: (error) => {
// 			toast.error(error.response.data.error);
// 		},
// 	});

// 	const { mutate: rejectConnectionRequest } = useMutation({
// 		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
// 		onSuccess: () => {
// 			toast.success("Connection request rejected");
// 			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
// 		},
// 		onError: (error) => {
// 			toast.error(error.response.data.error);
// 		},
// 	});

// 	return (
// 		<div className='bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md'>
// 			<div className='flex items-center gap-4'>
// 				<Link to={`/profile/${request.sender.username}`}>
// 					<img
// 						src={request.sender.profilePicture || "/avatar.png"}
// 						alt={request.name}
// 						className='w-16 h-16 rounded-full object-cover'
// 					/>
// 				</Link>

// 				<div>
// 					<Link to={`/profile/${request.sender.username}`} className='font-semibold text-lg'>
// 						{request.sender.name}
// 					</Link>
// 					<p className='text-gray-600'>{request.sender.headline}</p>
// 				</div>
// 			</div>

// 			<div className='space-x-2'>
// 				<button
// 					className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors'
// 					onClick={() => acceptConnectionRequest(request._id)}
// 				>
// 					Accept
// 				</button>
// 				<button
// 					className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors'
// 					onClick={() => rejectConnectionRequest(request._id)}
// 				>
// 					Reject
// 				</button>
// 			</div>
// 		</div>
// 	);
// };
// export default FriendRequest;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const FriendRequest = ({ request }) => {
	const queryClient = useQueryClient();

	const { mutate: acceptConnectionRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request accepted");
			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	const { mutate: rejectConnectionRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request rejected");
			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	return (
		<div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-center justify-between gap-5">
			{/* Profile and Request Details */}
			<div className="flex items-center gap-6">
				<Link to={`/profile/${request.sender.username}`}>
					<img
						src={request.sender.profilePicture || "/avatar.png"}
						alt={request.sender.name}
						className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-md"
					/>
				</Link>

				<div>
					<Link
						to={`/profile/${request.sender.username}`}
						className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors"
					>
						{request.sender.name}
					</Link>
					<p className="text-sm text-gray-500">{request.sender.headline}</p>
				</div>
			</div>

			{/* Buttons: Accept & Reject */}
			<div className="flex gap-4 mt-4 sm:mt-0">
				<button
					className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:from-primary-dark hover:to-secondary-dark transition-all shadow-sm"
					onClick={() => acceptConnectionRequest(request._id)}
				>
					Accept
				</button>
				<button
					className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all shadow-sm"
					onClick={() => rejectConnectionRequest(request._id)}
				>
					Reject
				</button>
			</div>
		</div>
	);
};

export default FriendRequest;
