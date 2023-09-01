/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase_config';
import { Link, useNavigate } from 'react-router-dom';
import { createNewUser } from '../service/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoUrl } from '../constants';
import { ClipLoader } from 'react-spinners';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const provider = new GoogleAuthProvider();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleLogIn = (e) => {
		e.preventDefault();
		setIsLoading(true);

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate('/dashboard');
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/user-not-found':
						toast.error('User not found.');
						break;
					case 'auth/wrong-password':
						toast.error('Your password is incorrect.');
						break;
					case 'auth/invalid-email':
						toast.error('Invalid email.');
						break;
					default:
						toast.error('An error occurred during login.');
				}
				setIsLoading(false);
				console.log(error);
			});
	};

	const handleGoogleLogIn = () => {
		signInWithPopup(auth, provider)
			.then((userCredential) => {
				createNewUser(userCredential.user.email);
				navigate('/dashboard');
			})
			.catch((error) => {
				toast.error('An error occurred during Google sign up.');
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
			<ToastContainer position="top-right" />
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Link to="/">
					<img className="w-auto mx-auto h-28" src={logoUrl} alt="logo" />
				</Link>
				<h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
					Log in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
					<form className="space-y-6" onSubmit={handleLogIn}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									id="email"
									name="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="mt-2">
								<input
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									id="password"
									name="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{isLoading ? (
									<ClipLoader size={15} color={'#FFFFFF'} />
								) : (
									'Log In'
								)}
							</button>
						</div>
					</form>

					<div>
						<div className="relative mt-10">
							<div
								className="absolute inset-0 flex items-center"
								aria-hidden="true"
							>
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm font-medium leading-6">
								<span className="px-6 text-gray-900 bg-white">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6">
							<button
								className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-gray-700 font-semibold text-lg border-2 border-gray-100 hover:bg-[#e9e9ea] hover:border-transparent"
								type="button"
								onClick={handleGoogleLogIn}
							>
								<img
									src="https://res.cloudinary.com/yilin1234/image/upload/v1692507925/Google__G__Logo.svg_notatb.png"
									alt="Google Logo"
									className="w-5 h-5"
								/>
								<span className="text-sm font-semibold leading-6">Google</span>
							</button>
						</div>
					</div>
				</div>

				<p className="mt-10 text-sm text-center text-gray-500">
					Don't have an account?{' '}
					<Link
						to="/signup"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
