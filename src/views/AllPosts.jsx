import { getAllPosts } from '../service/post';
import { useState, useEffect } from 'react';
import List from '../components/List';

export default function Example() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initialSetUp() {
			setIsLoading(true);
			try {
				const data = await getAllPosts();
				setPosts(data);
				console.log(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		initialSetUp();
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return <List posts={posts} />;
}
