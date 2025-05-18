// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { axiosInstance } from "../lib/axios";
// import { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Loader, MessageCircle, Share2, ThumbsUp, Send, Trash2 } from "lucide-react";
// import PostAction from './PostAction';
// import { formatDistanceToNow } from 'date-fns';
// import { useParams } from 'react-router-dom';
// import PostLike from './PostLike';

// const Post = ({ post }) => {
//     const { postId } = useParams();

//     const { data: authUser } = useQuery({ queryKey: ["authUser"] });
//     const [showComments, setShowComments] = useState(false);
//     const [newComment, setNewComment] = useState("");

//     if (!authUser) return <div>please login first</div>;

//     const [comments, setComments] = useState(post.comments || []);

//     console.log("Post data:", post);

//     if (!post.author) return null;

//     const isOwner = authUser._id === post.author._id;
//     const isLiked = post.likes.includes(authUser._id);

//     const queryClient = useQueryClient();

//     const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
//         mutationFn: async () => {
//             await axiosInstance.delete(`/posts/delete/${post._id}`);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["posts"] });
//             toast.success("Post deleted successfully");
//         },
//         onError: (error) => {
//             toast.error(error.message);
//         },
//     });

//     const { mutate: createComment, isPending: isAddingComment } = useMutation({
//         mutationFn: async (newComment) => {
//             await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["posts"] });
//             toast.success("Comment added successfully");
//         },
//         onError: (err) => {
//             toast.error(err.response.data.message || "Failed to add comment");
//         },
//     });


//     const { mutate: likePost, isPending: isLikingPost } = useMutation({
//         mutationFn: async () => {
//             await axiosInstance.post(`/posts/${post._id}/like`);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["posts"] });
//             queryClient.invalidateQueries({ queryKey: ["post", postId] });
//         },
//     });

//     const handleDeletePost = () => {
//         if (!window.confirm("Are you sure you want to delete this post?")) return;
//         deletePost();

//     };

//     const handleLikePost = async () => {
//         if (isLikingPost) return;
//         likePost();
//     };

//     const handleAddComment = async (e) => {
//         e.preventDefault();
//         if (newComment.trim()) {
//             createComment(newComment);
//             setNewComment("");
//             setComments([
//                 ...comments,
//                 {
//                     content: newComment,
//                     user: {
//                         _id: authUser._id,
//                         name: authUser.name,
//                         profilePicture: authUser.profilePicture,
//                     },
//                     createdAt: new Date(),
//                 },
//             ]);
//         }
//     };


//     return (
//         <div className='bg-gray-100 secondary rounded-lg shadow mb-4'>
//             <div className='p-4'>
//                 <div className='flex items-center justify-between mb-4'>
//                     <div className='flex items-center'>
//                         <Link to={`/profile/${post?.author?.username}`}>
//                             <img
//                                 src={post.author.profilePicture || "/avatar.png"}
//                                 alt={post.author.name}
//                                 className='size-10 rounded-full mr-3'
//                             />
//                         </Link>

//                         <div>
//                             <Link to={`/profile/${post?.author?.username}`}>
//                                 <h3 className='font-semibold'>{post.author.name}</h3>
//                             </Link>
//                             <p className='text-xs text-info'>{post.author.headline}</p>
//                             <p className='text-xs text-info'>
//                                 {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
//                             </p>
//                         </div>
//                     </div>
//                     {isOwner && (
//                         <button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
//                             {isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
//                         </button>
//                     )}
//                 </div>
//                 <p className='mb-4'>{post.content}</p>
//                 {post.image && <img src={post.image} alt='Post content' className='rounded-lg w-full mb-4' />}

//                 <div className=' text-black flex justify-between text-info'>
//                     <PostLike
//                         isLiked={isLiked}
//                         count={post.likes.length}
//                         onClick={handleLikePost}
//                     />

//                     <PostAction
//                         icon={<MessageCircle size={18} />}
//                         text={`Comment (${comments.length})`}
//                         onClick={() => setShowComments(!showComments)}
//                     />
//                     <PostAction icon={<Share2 size={18} />} text='Share' />
//                 </div>
//             </div>

//             {showComments && (
//                 <div className='px-4 pb-4'>
//                     <div className='mb-4 max-h-60 overflow-y-auto'>
//                         {comments.map((comment) => (
//                             <div key={comment._id} className='mb-2 bg-base-100 p-2 rounded flex items-start'>
//                                 <img
//                                     src={comment.user.profilePicture || "/avatar.png"}
//                                     alt={comment.user.name}
//                                     className='w-8 h-8 rounded-full mr-2 flex-shrink-0'
//                                 />
//                                 <div className='flex-grow'>
//                                     <div className='flex items-center mb-1'>
//                                         <span className='font-semibold mr-2'>{comment.user.name}</span>
//                                         <span className='text-xs text-info'>
//                                             {formatDistanceToNow(new Date(comment.createdAt))}
//                                         </span>
//                                     </div>
//                                     <p>{comment.content}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <form onSubmit={handleAddComment} className='flex items-center'>
//                         <input
//                             type='text'
//                             value={newComment}
//                             onChange={(e) => setNewComment(e.target.value)}
//                             placeholder='Add a comment...'
//                             className='flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary'
//                         />

//                         <button
//                             type='submit'
//                             className='bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300'
//                             disabled={isAddingComment}
//                         >
//                             {isAddingComment ? <Loader size={18} className='animate-spin' /> : <Send size={18} />}
//                         </button>
//                     </form>



//                 </div>
//             )}
//         </div>
//     )
// }

// export default Post;


import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from "../lib/axios";
import { Link, useParams } from "react-router-dom";
import { Loader, MessageCircle, Share2, ThumbsUp, Send, Trash2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import toast from "react-hot-toast";
import PostLike from './PostLike';
import PostAction from './PostAction';

const Post = ({ post }) => {
	const { postId } = useParams();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState(post.comments || []);

	if (!authUser) return <div>Please login first</div>;
	if (!post.author) return null;

	const isOwner = authUser._id === post.author._id;
	const isLiked = post.likes.includes(authUser._id);

	// Delete Post
	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
		mutationFn: async () => await axiosInstance.delete(`/posts/delete/${post._id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post deleted successfully");
		},
		onError: (error) => toast.error(error.message),
	});

	// Like Post
	const { mutate: likePost, isPending: isLikingPost } = useMutation({
		mutationFn: async () => await axiosInstance.post(`/posts/${post._id}/like`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
		},
	});

	// Comment
	const { mutate: createComment, isPending: isAddingComment } = useMutation({
		mutationFn: async (newComment) =>
			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Comment added successfully");
		},
		onError: (err) =>
			toast.error(err.response?.data?.message || "Failed to add comment"),
	});

	const handleDeletePost = () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			deletePost();
		}
	};

	const handleLikePost = () => {
		if (!isLikingPost) likePost();
	};

	const handleAddComment = (e) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		createComment(newComment);
		setComments([
			...comments,
			{
				content: newComment,
				user: {
					_id: authUser._id,
					name: authUser.name,
					profilePicture: authUser.profilePicture,
				},
				createdAt: new Date(),
			},
		]);
		setNewComment("");
	};

	return (
		<div className="bg-gray-100 p-4 rounded-xl mb-6">
			<div className="bg-white border border-gray-300 rounded-lg shadow-sm">
				<div className="p-4">
					{/* Header */}
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-center gap-3">
							<Link to={`/profile/${post.author.username}`}>
								<img
									src={post.author.profilePicture || "/avatar.png"}
									alt="author"
									className="w-10 h-10 rounded-full object-cover"
								/>
							</Link>
							<div className="text-sm">
								<Link to={`/profile/${post.author.username}`}>
									<p className="font-semibold hover:underline">{post.author.name}</p>
								</Link>
								<p className="text-gray-500 text-xs">{post.author.headline}</p>
								<p className="text-gray-400 text-xs">
									{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
								</p>
							</div>
						</div>
						{isOwner && (
							<button
								onClick={handleDeletePost}
								className="text-red-500 hover:text-red-600"
							>
								{isDeletingPost ? (
									<Loader size={18} className="animate-spin" />
								) : (
									<Trash2 size={18} />
								)}
							</button>
						)}
					</div>

					{/* Content */}
					<div className="mb-4">
						<p className="text-gray-800 text-sm mb-2">{post.content}</p>
						{post.image && (
							<img
								src={post.image}
								alt="Post"
								className="rounded-md w-full border max-h-96 object-contain"
							/>
						)}
					</div>

					{/* Actions */}
					<div className="flex justify-between text-gray-500 text-sm border-t pt-3">
						<PostLike isLiked={isLiked} count={post.likes.length} onClick={handleLikePost} />
						<PostAction
							icon={<MessageCircle size={18} />}
							text={`Comment (${comments.length})`}
							onClick={() => setShowComments(!showComments)}
						/>
						<PostAction icon={<Share2 size={18} />} text="Share" />
					</div>
				</div>

				{/* Comments */}
				{showComments && (
					<div className="p-4 border-t bg-gray-50 rounded-b-lg">
						<div className="space-y-3 max-h-60 overflow-y-auto pr-1">
							{comments.map((comment, index) => (
								<div key={index} className="flex items-start gap-3">
									<img
										src={comment.user.profilePicture || "/avatar.png"}
										alt="user"
										className="w-8 h-8 rounded-full object-cover"
									/>
									<div className="flex-grow">
										<div className="flex items-center justify-between">
											<p className="font-semibold text-sm">{comment.user.name}</p>
											<p className="text-xs text-gray-400">
												{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
											</p>
										</div>
										<p className="text-sm text-gray-700">{comment.content}</p>
									</div>
								</div>
							))}
						</div>

						{/* Add Comment */}
						<form onSubmit={handleAddComment} className="flex items-center mt-4 gap-2">
							<input
								type="text"
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Write a comment..."
								className="flex-grow px-4 py-2 text-sm border rounded-full bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
							<button
								type="submit"
								className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
								disabled={isAddingComment}
							>
								{isAddingComment ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default Post;


