import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateUserProfile } from '../service/user';
import { PhotoIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProfile() {
	const [username, setUsername] = useState('');
	const [aboutMe, setAboutMe] = useState('');
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState('');

	const currentUser = useSelector((state) => state.user.value);
	const navigate = useNavigate();

	function handleImageChange(e) {
		const { files } = e.target;
		if (files && files.length !== 0) {
			setImage(files[0]);
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

	async function handleOnUpdate(e) {
		e.preventDefault();
		let profilePictureUrl = currentUser.picture;

		// If there is a new image, upload it
		if (image) {
			profilePictureUrl = await handleImageUpload();
			if (!profilePictureUrl) return; // Return if image upload failed
		}

		try {
			await updateUserProfile(
				currentUser.id,
				username,
				profilePictureUrl,
				aboutMe
			);
			toast.success('User profile updated. refresh to see the changes.');
			// navigate(0);
		} catch (error) {
			toast.error(error.message);
			console.error('Error:', error);
		}
	}

	const handleReset = () => {
		navigate(0);
	};

	useEffect(() => {
		if (currentUser) {
			setUsername(currentUser.username);
			setAboutMe(currentUser.about);
		}
	}, [currentUser]);

	return (
		<div className="p-10">
			<ToastContainer position="bottom-right" />
			<form onSubmit={handleOnUpdate}>
				<h2 className="text-base font-semibold leading-7 text-gray-900">
					profile
				</h2>
				<p className="mt-1 text-sm leading-6 text-gray-600">
					this information will be displayed publicly so be careful what you
					share.
				</p>
				<img className="h-24 mt-5" src={currentUser.picture} alt="profile" />
				<div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div className="sm:col-span-4">
						<label
							htmlFor="username"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							username
						</label>
						<div className="mt-2">
							<input
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								type="text"
								name="username"
								id="username"
								autoComplete="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="col-span-full">
						<label
							htmlFor="about"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							about
						</label>
						<div className="mt-2">
							<textarea
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								id="about"
								name="about"
								rows={3}
								value={aboutMe}
								onChange={(e) => setAboutMe(e.target.value)}
								required
							/>
						</div>
						<p className="mt-3 text-sm leading-6 text-gray-600">
							write a few sentences about yourself.
						</p>
					</div>

					<div className="col-span-full">
						<label
							htmlFor="profileImage"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							profile Image
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

						<div className="flex justify-center px-6 py-10 mt-4 border border-dashed rounded-lg border-gray-900/25">
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
						type="button"
						className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={handleReset}
					>
						<ArrowPathIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
						reset
					</button>
					<button
						type="submit"
						className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						update
					</button>
				</div>
			</form>
		</div>
	);
}

export default MyProfile;
