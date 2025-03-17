import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users } from "lucide-react";

const Navbar = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	return (
		<nav className='bg-gray-100 secondary shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-3'>
					<div className='flex items-center space-x-4'>
						<Link to='/'>
							<img className='h-12 w-500 rounded' src='/linkup.jpg' alt='LinkedIn' />
						</Link>
					</div>
					<div className='flex items-center gap-2 md:gap-6'>
						{authUser ? (
							<>
								<Link to={"/"} className='text-neutral flex flex-col items-center'>
									<Home size={20} />
									<span className='text-xs hidden md:block'>Home</span>
								</Link>
								<Link to='/network' className='text-neutral flex flex-col items-center relative'>
									<Users size={20} />
									<span className='text-xs hidden md:block'>My Network</span>
									{unreadConnectionRequestsCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>
								<Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
									<Bell size={20} />
									<span className='text-xs hidden md:block'>Notifications</span>
									{unreadNotificationCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className='text-neutral flex flex-col items-center'
								>
									<User size={20} />
									<span className='text-xs hidden md:block'>Me</span>
								</Link>
								<button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
									onClick={() => logout()}
								>
									<LogOut size={20} />
									<span className='hidden md:inline'>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to='/login' className='btn btn-ghost'>
									Sign In
								</Link>
								<Link to='/signup' className='btn btn-primary'>
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;







// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../../lib/axios";
// import { Link } from "react-router-dom";
// import { Bell, Home, LogOut, User, Users, Search } from "lucide-react";
// import { useState } from "react";

// const Navbar = () => {
// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
// 	const queryClient = useQueryClient();
// 	const [searchQuery, setSearchQuery] = useState("");

// 	const { data: notifications } = useQuery({
// 		queryKey: ["notifications"],
// 		queryFn: async () => axiosInstance.get("/notifications"),
// 		enabled: !!authUser,
// 	});

// 	const { data: connectionRequests } = useQuery({
// 		queryKey: ["connectionRequests"],
// 		queryFn: async () => axiosInstance.get("/connections/requests"),
// 		enabled: !!authUser,
// 	});

// 	const { mutate: logout } = useMutation({
// 		mutationFn: () => axiosInstance.post("/auth/logout"),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 	});

// 	const { data: searchResults } = useQuery({
// 		queryKey: ["searchUsers", searchQuery],
// 		queryFn: async () => {
// 			if (!searchQuery) return [];
// 			const response = await axiosInstance.get(`/users/search?username=${searchQuery}`);
// 			return response.data;
// 		},
// 		enabled: !!searchQuery,
// 	});

// 	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
// 	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

// 	return (
// 		<nav className='bg-gray-100 secondary shadow-md sticky top-0 z-10'>
// 			<div className='max-w-7xl mx-auto px-4'>
// 				<div className='flex justify-between items-center py-3'>
// 					<div className='flex items-center space-x-4'>
// 						<Link to='/'>
// 							<img className='h-8 w-50 rounded' src='/linkup.jpg' alt='LinkedIn' />
// 						</Link>
// 					</div>
// 					<div className='relative flex items-center'>
// 						<input
// 							type='text'
// 							placeholder='Search by username...'
// 							value={searchQuery}
// 							onChange={(e) => setSearchQuery(e.target.value)}
// 							className='px-3 py-2 border rounded-md w-64'
// 						/>
// 						<Search className='absolute right-3 text-gray-500' size={20} />
// 						{searchQuery && (
// 							<div className='absolute top-full mt-2 bg-white border rounded-md shadow-md w-64'>
// 								{searchResults?.length > 0 ? (
// 									<ul>
// 										{searchResults.map((user) => (
// 											<li key={user._id} className='p-2 hover:bg-gray-100'>
// 												<Link to={`/profile/${user.username}`}>{user.username}</Link>
// 											</li>
// 										))}
// 									</ul>
// 								) : (
// 									<p className='p-2 text-gray-500'>No results found</p>
// 								)}
// 							</div>
// 						)}
// 					</div>
// 					<div className='flex items-center gap-2 md:gap-6'>
// 						{authUser ? (
// 							<>
// 								<Link to={'/'} className='text-neutral flex flex-col items-center'>
// 									<Home size={20} />
// 									<span className='text-xs hidden md:block'>Home</span>
// 								</Link>
// 								<Link to='/network' className='text-neutral flex flex-col items-center relative'>
// 									<Users size={20} />
// 									<span className='text-xs hidden md:block'>My Network</span>
// 									{unreadConnectionRequestsCount > 0 && <span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full size-3 flex items-center justify-center'>{unreadConnectionRequestsCount}</span>}
// 								</Link>
// 								<button onClick={() => logout()} className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'>
// 									<LogOut size={20} />
// 									<span className='hidden md:inline'>Logout</span>
// 								</button>
// 							</>
// 						) : (
// 							<>
// 								<Link to='/login' className='btn btn-ghost'>Sign In</Link>
// 								<Link to='/signup' className='btn btn-primary'>Join now</Link>
// 							</>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };
// export default Navbar;
