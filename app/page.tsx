'use client';

import { useEffect, useState } from 'react';

interface Set {
	weight: number;
	reps: number;
}

interface Exercise {
	name: string;
	sets: Set[];
}

interface Workout {
	id: number;
	title: string;
	date: string;
	exercises: Exercise[];
}

const MainPage: React.FC = () => {
	const [workouts, setWorkouts] = useState<Workout[]>([]); // State to store fetched workouts
	const [loading, setLoading] = useState<boolean>(true); // State to track loading status

	// Fetch workouts from the API when the page loads
	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const response = await fetch('/api/get-workouts', {
					method: 'GET',
				});

				const data = await response.json();

				if (data.success) {
					setWorkouts(data.workouts); // Set the fetched workouts to state
				}
			} catch (error) {
				console.error('Error fetching workouts:', error);
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};

		fetchWorkouts(); // Trigger fetch on page load
	}, []);

	// Function to handle deleting a workout
	const handleDelete = async (id: number) => {
		// Display confirmation dialog before proceeding with deletion
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this workout?',
		);

		// If user cancels, stop the delete operation
		if (!isConfirmed) {
			return;
		}

		try {
			const response = await fetch('/api/get-workouts', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id }), // Send the workout ID to delete
			});

			if (!response.ok) {
				throw new Error('Error deleting workout');
			}

			const data = await response.json();

			if (data.success) {
				setWorkouts(workouts.filter(workout => workout.id !== id)); // Remove workout from state
			} else {
				alert('Error deleting workout.');
			}
		} catch (error) {
			console.error('Error deleting workout:', error);
			alert('Error deleting workout.');
		}
	};

	if (loading) {
		return <div>Loading workouts...</div>; // Display loading indicator
	}

	if (workouts.length === 0) {
		return <div>No workouts found.</div>; // Display if no workouts are found
	}

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Workout Log</h1>

			{workouts.map(workout => (
				<div key={workout.id} className='border p-4 mb-4 rounded shadow-sm'>
					<h2 className='text-lg font-semibold'>{workout.title}</h2>
					<p className='text-gray-600'>
						Date: {new Date(workout.date).toLocaleDateString()}
					</p>

					{workout.exercises.map((exercise, index) => (
						<div key={index} className='mt-2'>
							<h3 className='text-md font-semibold'>{exercise.name}</h3>
							{exercise.sets.map((set, setIndex) => (
								<p key={setIndex}>
									{set.reps} reps @ {set.weight} lbs
								</p>
							))}
						</div>
					))}

					{/* Delete button with confirmation dialog */}
					<button
						onClick={() => handleDelete(workout.id)}
						className='mt-4 p-2 bg-red-500 text-white rounded'>
						Delete Workout
					</button>
				</div>
			))}
		</div>
	);
};

export default MainPage;
