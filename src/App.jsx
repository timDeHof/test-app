import { Route, Routes } from 'react-router-dom';

import Landing from './views/Landing';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import PrivateRoutes from './views/PrivateRoutes';
import AllPosts from './views/AllPosts';
import Create from './views/Create';
import MyProfile from './views/MyProfile';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route element={<PrivateRoutes />}>
				<Route path="/dashboard" element={<Dashboard />}>
					<Route path="my-profile" element={<MyProfile />} />
					<Route path="all-posts" element={<AllPosts />} />
					<Route path="create" element={<Create />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
