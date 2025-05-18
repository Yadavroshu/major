// import { Link } from "react-router-dom";
// import { Home, UserPlus, Bell, MessageSquare } from "lucide-react";

// export default function Sidebar({ user }) {
// 	return (
// 		<div className='bg-gray-100 secondary rounded-lg shadow '>
// 			<div className='p-4 text-center'>
// 				<div
// 					className='h-16 rounded-t-lg bg-cover bg-center'
// 					style={{
// 						backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
// 					}}
// 				/>
// 				<Link to={`/profile/${user.username}`}>
// 					<img
// 						src={user.profilePicture || "/avatar.png"}
// 						alt={user.name}
// 						className='w-20 h-20 rounded-full mx-auto mt-[-40px]'
// 					/>
// 					<h2 className='text-xl font-semibold mt-2'>{user.name}</h2>
// 				</Link>
// 				<p className='text-info'>{user.headline}</p>
// 				<p className='text-info text-xs'>{user.connections.length} connections</p>
// 			</div>
// 			<div className='border-t border-base-100 p-4'>
// 				<nav>
// 					<ul className='space-y-2'>
// 						<li>
// 							<Link
// 								to='/'
// 								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors'
// 							>
// 								<Home className='mr-2' size={20} /> Home
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								to='/network'
// 								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors'
// 							>
// 								<UserPlus className='mr-2' size={20} /> My Network
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								to='/messages/all'
// 								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors'
// 							>
// 								<MessageSquare className='mr-2' size={20} /> Messages
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								to='/notifications'
// 								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors'
// 							>
// 								<Bell className='mr-2' size={20} /> Notifications
// 							</Link>
// 						</li>
// 					</ul>
// 				</nav>
// 			</div>
// 			<div className='border-t border-base-100 p-4'>
// 				<Link to={`/profile/${user.username}`} className='text-sm font-semibold'>
// 					Visit your profile
// 				</Link>
// 			</div>
// 		</div>
// 	);
// }


import { Link } from "react-router-dom";
import { Home, UserPlus, Bell, MessageSquare, Handshake } from "lucide-react";

export default function Sidebar({ user }) {
	return (
		<div className='hidden lg:block bg-gray-200 rounded-lg shadow w-80 fixed left-10'>
			{/* Banner & Profile Section */}
			<div className='p-4 text-center'>
				<div
					className='h-16 rounded-t-lg bg-cover bg-center'
					style={{
						backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
					}}
				/>
				<Link to={`/profile/${user.username}`}>
					<img
						src={user.profilePicture || "/avatar.png"}
						alt={user.name}
						className='w-20 h-20 rounded-full mx-auto mt-[-40px] border-4 border-white'
					/>
					<h2 className='text-xl font-semibold mt-2'>{user.name}</h2>
				</Link>
				<p className='text-info'>{user.headline}</p>
				<p className='text-info text-xs'>{user.connections.length} connections</p>
			</div>

			{/* Navigation Menu */}
			<div className='border-t border-base-100 p-4'>
				<nav>
					<ul className='space-y-2'>
						<li>
							<Link
								to='/'
								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-300'
							>
								<Home className='mr-2' size={20} /> Home
							</Link>
						</li>
						<li>
							<Link
								to='/network'
								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-300'
							>
								<UserPlus className='mr-2' size={20} /> My Network
							</Link>
						</li>
						<li>
							<Link
								to='/messages/all'
								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-300'
							>
								<MessageSquare className='mr-2' size={20} /> Messages
							</Link>
						</li>
						<li>
							<Link
								to='/jobs'
								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-300'
							>
								<Handshake className='mr-2' size={20} /> Jobs
							</Link>
						</li>
						<li>
							<Link
								to='/notifications'
								className='flex items-center py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-300'
							>
								<Bell className='mr-2' size={20} /> Notifications
							</Link>
						</li>
					</ul>
				</nav>
			</div>

			{/* Profile Link */}
			<div className='border-t border-base-100 p-4'>
				<Link to={`/profile/${user.username}`} className='text-sm font-semibold hover:text-primary'>
					Visit your profile
				</Link>
			</div>
		</div>
	);
}


