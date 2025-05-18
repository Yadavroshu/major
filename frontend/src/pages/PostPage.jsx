import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const PostPage = () => {
	const { postId } = useParams();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: post, isLoading } = useQuery({
		queryKey: ["post", postId],
		queryFn: () => axiosInstance.get(`/posts/${postId}`),
	});

	if (isLoading) return <div>Loading post...</div>;
	if (!post?.data) return <div>Post not found</div>;
	// todo 

	// return (
	// 	<div className=' grid grid-cols-1 lg:grid-cols-4 gap-6'>
	// 		<div className='hidden lg:block lg:col-span-1'>
	// 			<Sidebar user={authUser} />
	// 		</div>

	// 		<div className='col-span-1 lg:col-span-3'>
	// 			<Post post={post.data} />
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4">
			<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
				
				{/* Sidebar - visible only on large screens */}
				<div className="hidden lg:block lg:col-span-3">
					<div className="sticky top-20">
						<Sidebar user={authUser} />
					</div>
				</div>
	
				{/* Post content */}
				<div className="col-span-1 lg:col-span-9">
					<div className="bg-white shadow-md rounded-2xl p-6 md:p-8">
						<Post post={post.data} />
					</div>
				</div>
			</div>
		</div>
	);
	
};
export default PostPage;