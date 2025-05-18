// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";

// function UserCard({ user, isConnection, current_User }) {
// 	console.log("user con : ",user._id);
// 	console.log("current user : ",current_User._id);



// 	return (
// 		<div className='bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md'>
// 			<Link to={`/profile/${user.username}`} className='flex flex-col items-center'>
// 				<img
// 					src={user.profilePicture || "/avatar.png"}
// 					alt={user.name}
// 					className='w-24 h-24 rounded-full object-cover mb-4'
// 				/>
// 				<h3 className='font-semibold text-lg text-center'>{user.name}</h3>
// 			</Link>
// 			<p className='text-gray-600 text-center'>{user.headline}</p>
// 			<p className='text-sm text-gray-500 mt-2'>{user.connections?.length} connections</p>
// 			<button className='mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full'>
// 				{isConnection ? "Connected" : "Connect"}
// 			</button>
// 			<Link to={`/messages/${user.username}`}>
// 			<div className='mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full' >
// 				message
// 			</div>
// 			</Link>
// 		</div>
// 	);
// }

// export default UserCard;



import { Link } from "react-router-dom";

function UserCard({ user, isConnection, current_User }) {
	console.log("user con : ", user._id);
	console.log("current user : ", current_User._id);

	return (
		<div className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center group'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-24 h-24 rounded-full object-cover mb-3 border-4 border-primary/20 group-hover:border-primary transition-all duration-300'
				/>
				<h3 className='font-semibold text-xl text-gray-800 group-hover:text-primary'>
					{user.name}
				</h3>
			</Link>

			<p className='text-gray-500 text-center text-sm mt-1'>{user.headline}</p>
			<p className='text-xs text-gray-400 mt-1'>{user.connections?.length} connections</p>

			<button
				className={`mt-4 px-5 py-2 rounded-md text-sm font-medium w-full transition-colors ${
					isConnection
						? "bg-green-100 text-green-700 cursor-default"
						: "bg-primary text-white hover:bg-primary-dark"
				}`}
				disabled={isConnection}
			>
				{isConnection ? "Connected" : "Connect"}
			</button>

			<Link to={`/messages/${user.username}`} className='w-full'>
				<div className='mt-3 bg-gray-100 hover:bg-gray-200 text-primary font-medium text-center px-5 py-2 rounded-md text-sm transition-colors'>
					Message
				</div>
			</Link>
		</div>
	);
}

export default UserCard;

