// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import Sidebar from "../components/Sidebar";
// import { UserPlus } from "lucide-react";
// import FriendRequest from "../components/FriendRequest";
// import UserCard from "../components/UserCard";

// const NetworkPage = () => {
// 	const { data: user } = useQuery({ queryKey: ["authUser"] });

// 	const { data: connectionRequests } = useQuery({
// 		queryKey: ["connectionRequests"],
// 		queryFn: () => axiosInstance.get("/connections/requests"),
// 	});

// 	const { data: connections } = useQuery({
// 		queryKey: ["connections"],
// 		queryFn: () => axiosInstance.get("/connections"),
// 	});

// 	return (
// 		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
// 			<div className='col-span-1 lg:col-span-1'>
// 				<Sidebar user={user} />
// 			</div>
// 			<div className='col-span-1 lg:col-span-3'>
// 				<div className='bg-gray-100 rounded-lg shadow p-6 mb-6'>
// 					<h1 className='text-2xl font-bold mb-6'>My Network</h1>

// 					{connectionRequests?.data?.length > 0 ? (
// 						<div className='mb-8'>
// 							<h2 className='text-xl font-semibold mb-2'>Connection Request</h2>
// 							<div className='space-y-4'>
// 								{connectionRequests.data.map((request) => (
// 									<FriendRequest key={request.id} request={request} />
// 								))}
// 							</div>
// 						</div>
// 					) : (
// 						<div className='bg-white rounded-lg shadow p-6 text-center mb-6'>
// 							<UserPlus size={48} className='mx-auto text-gray-400 mb-4' />
// 							<h3 className='text-xl font-semibold mb-2'>No Connection Requests</h3>
// 							<p className='text-gray-600'>
// 								You don&apos;t have any pending connection requests at the moment.
// 							</p>
// 							<p className='text-gray-600 mt-2'>
// 								Explore suggested connections below to expand your network!
// 							</p>
// 						</div>
// 					)}
// 					{connections?.data?.length > 0 && (
// 						<div className='mb-8'>
// 							<h2 className='text-xl font-semibold mb-4'>My Connections</h2>
// 							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
// 								{connections.data.map((connection) => (
// 									<UserCard key={connection._id} current_User={user} user={connection} isConnection={true} />
// 								))}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default NetworkPage;



import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
	const { data: user } = useQuery({ queryKey: ["authUser"] });

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: () => axiosInstance.get("/connections/requests"),
	});

	const { data: connections } = useQuery({
		queryKey: ["connections"],
		queryFn: () => axiosInstance.get("/connections"),
	});

	return (
		<div className='flex flex-col lg:flex-row gap-6 px-4 py-8 max-w-7xl mx-auto'>
			{/* Sidebar */}
			<div className='hidden lg:block lg:w-1/4'>
				<Sidebar user={user} />
			</div>

			{/* Main Content */}
			<div className='w-full lg:w-3/4'>
				<div className='bg-gray-200 rounded-2xl shadow-lg p-6'>
					<h1 className='text-3xl font-bold mb-8'>My Network</h1>

					{/* Connection Requests */}
					{connectionRequests?.data?.length > 0 ? (
						<div className='mb-10'>
							<h2 className='text-2xl font-semibold mb-4'>Connection Requests</h2>
							<div className='space-y-4'>
								{connectionRequests.data.map((request) => (
									<FriendRequest key={request.id} request={request} />
								))}
							</div>
						</div>
					) : (
						<div className='bg-gray-50 rounded-lg shadow-inner p-8 text-center mb-10'>
							<UserPlus size={48} className='mx-auto text-gray-400 mb-4' />
							<h3 className='text-xl font-semibold mb-2'>No Connection Requests</h3>
							<p className='text-gray-600'>
								You don&apos;t have any pending connection requests at the moment.
							</p>
							<p className='text-gray-600 mt-2'>
								Explore suggested connections below to expand your network!
							</p>
						</div>
					)}

					{/* My Connections */}
					{connections?.data?.length > 0 && (
						<div>
							<h2 className='text-2xl font-semibold mb-6'>My Connections</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
								{connections.data.map((connection) => (
									<UserCard key={connection._id} current_User={user} user={connection} isConnection={true} />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NetworkPage;
