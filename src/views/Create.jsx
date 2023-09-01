import { useState } from 'react';
import axios from 'axios';
import { createNewPost } from '../service/post';
import { PhotoIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Create() {
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState('');
	const currentUser = useSelector((state) => state.user.value);

	function handleImageChange(event) {
		const { files } = event.target;
		if (files && files.length !== 0) {
			setImage(() => files[0]);
			setImagePreview(URL.createObjectURL(files[0]));
		}
	}

	async function handleImageUpload() {
		try {
			const data = new FormData();
			if (image) {
				data.append('file', image);
				data.append('upload_preset', 'purchaseApp');
				const response = await axios.post(
					'https://api.cloudinary.com/v1_1/yilin1234/image/upload',
					data
				);
				return response.data.secure_url;
			}
		} catch (error) {
			console.error(error);
			toast.error('Error uploading image.');
		}
	}

	async function handleOnSubmit(e) {
		e.preventDefault();

		let url = null; // Default value is set to null

		// If there's an image to upload, get its URL
		if (image) {
			url = await handleImageUpload();
		}

		const now = new Date(); // Get the current time

		// Initialize request body
		const body = {
			content: content,
			createdAt: now.toISOString(),
			image: url,
			commentsCount: 0,
			likesCount: 0,
			email: currentUser.email,
			userProfilePicture: currentUser.picture,
			username: currentUser.username,
		};

		try {
			await createNewPost(body);
			toast.success('Post created successfully!');
		} catch (error) {
			console.error(error);
			toast.error('Error creating the post. Please try again.');
		}
	}

	return (
		<div className="p-10 bg-white isolate">
			<ToastContainer position="bottom-right" />
			<form className="max-w-xl mx-auto" onSubmit={handleOnSubmit}>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div className="sm:col-span-2">
						<label
							htmlFor="content"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							content
						</label>
						<div className="mt-2.5">
							<textarea
								id="content"
								rows={4}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="col-span-full">
						<label
							htmlFor="profileImage"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							post picture
						</label>
						<div className="flex mt-3 text-sm leading-6 text-gray-600">
							<label
								htmlFor="profileImage"
								className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								upload an image{' '}
								<ArrowUpOnSquareIcon
									className="-mr-0.5 h-5 w-5"
									aria-hidden="true"
								/>
								<input
									className="sr-only"
									id="profileImage"
									type="file"
									name="profileImage"
									onChange={handleImageChange}
								/>
							</label>
						</div>
						<div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
							<div className="text-center">
								{imagePreview ? (
									<img src={imagePreview} alt="preview" width="300" />
								) : (
									<PhotoIcon
										className="w-12 h-12 mx-auto text-gray-300"
										aria-hidden="true"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-end mt-6 gap-x-6">
					<button
						type="submit"
						className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						post
					</button>
				</div>
			</form>
		</div>
	);
}

export default Create;
