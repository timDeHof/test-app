import {
	ChatBubbleLeftIcon,
	HandThumbUpIcon,
	ShareIcon,
} from '@heroicons/react/24/outline';

import { format } from 'date-fns';

function Card({ post }) {
	return (
		<div className="max-w-lg p-4 mx-auto mt-4 bg-white border rounded-lg shadow-md">
			<div className="flex items-center">
				<img
					src={post.userProfilePicture}
					alt="post image"
					className="w-10 h-10 mr-4 rounded-full"
				/>
				<div className="text-sm">
					<p className="font-bold">{post.username}</p>
					<p className="text-gray-500">
						{format(new Date(post.createdAt), 'MMMM d, yyyy')}
					</p>
				</div>
			</div>
			<div className="mt-4">
				<p>{post.content}</p>
			</div>
			{post.image && (
				<img
					src={post.image}
					alt="Image for post"
					className="mt-4 rounded-lg"
				/>
			)}
			<div className="flex justify-between mt-4">
				<button className="flex items-center text-[#606872]">
					<HandThumbUpIcon className="w-5 h-5 mr-1" />
					{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}
				</button>
				<button className="flex items-center text-[#606872]">
					<ChatBubbleLeftIcon className="w-5 h-5 mr-1" />
					{post.commentsCount}{' '}
					{post.commentsCount === 1 ? 'Comment' : 'Comments'}
				</button>
				<button className="flex items-center text-[#606872]">
					<ShareIcon className="w-5 h-5 mr-1" />
					Share
				</button>
			</div>
		</div>
	);
}

export default Card;
