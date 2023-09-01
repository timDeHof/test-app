import { db } from '../../firebase_config';
import { addDoc, collection, getDocs } from 'firebase/firestore';

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewPost = async (body) => {
	try {
		const docRef = await addDoc(collection(db, 'posts'), body);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getAllPosts = async () => {
	const postsCollection = collection(db, 'posts');

	try {
		const querySnapshot = await getDocs(postsCollection);
		const posts = [];

		querySnapshot.forEach((doc) => {
			const post = doc.data();
			posts.push({
				id: doc.id, // Include the document ID as "id"
				...post, // Include the rest of the post data
			});
		});

		return posts;
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw new Error('Error fetching posts');
	}
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡
