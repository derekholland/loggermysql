'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Exercise {
	name: string;
	weight: number;
}

// Function to calculate warm-up sets based on the working weight
const calculateWarmups = (weight: number) => {
	return [
		{ percent: '60%', weight: Math.round(weight * 0.6) },
		{ percent: '70%', weight: Math.round(weight * 0.7) },
		{ percent: '80%', weight: Math.round(weight * 0.8) },
		{ percent: '90%', weight: Math.round(weight * 0.9) },
	];
};

const AddWorkout: React.FC = () => {
	const [title, setTitle] = useState<string>(''); // State for workout title
	const [exercise, setExercise] = useState<string>(''); // State for selected exercise
	const [weight, setWeight] = useState<number>(0); // State for working weight
	const [exercises, setExercises] = useState<Exercise[]>([]); // State to store all exercises added

	// Initialize the router
	const router = useRouter();

	// Function to handle adding an exercise to the workout
	const handleAddExercise = () => {
		if (!exercise || !weight) {
			alert('Please select an exercise and enter a working weight.');
			return;
		}

		const newExercise: Exercise = { name: exercise, weight };
		setExercises([...exercises, newExercise]);

		// Reset exercise and weight fields for next exercise entry
		setExercise('');
		setWeight(0);
	};

	// Function to handle saving the workout via the API route
	const handleFinishWorkout = async () => {
		if (!title || exercises.length === 0) {
			alert('Please add a workout title and at least one exercise.');
			return;
		}

		try {
			// Send a POST request to the API route to save the workout
			const response = await fetch('/api/add-workout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title, // Workout title
					exercises, // Array of exercises to save
				}),
			});

			const result = await response.json();

			if (result.success) {
				alert('Workout saved successfully!');
				// Redirect to the main page after successful workout save
				router.push('/');
			} else {
				alert('Error saving workout.');
			}
		} catch (error) {
			console.error('Error saving workout:', error);
			alert('There was an error saving the workout.');
		}
	};

	return (
		<div className='max-w-md mx-auto p-4'>
			<h1 className='text-xl font-bold'>Add Workout</h1>

			{/* Input for workout title */}
			<div className='mt-4'>
				<label className='block'>Workout Title</label>
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='w-full p-2 border'
					placeholder='Enter workout title'
				/>
			</div>

			{/* Dropdown to select exercise */}
			<div className='mt-4'>
				<label className='block'>Select Exercise</label>
				<select
					value={exercise}
					onChange={e => setExercise(e.target.value)}
					className='w-full p-2 border'>
					<option value=''>-- Select Exercise --</option>
					<option value='Squat'>Squat</option>
					<option value='Bench Press'>Bench Press</option>
					<option value='Overhead Press'>Overhead Press</option>
					<option value='Deadlift'>Deadlift</option>
					<option value='Chin Ups'>Chin Ups</option>
				</select>
			</div>

			{/* Input for working weight */}
			<div className='mt-4'>
				<label className='block'>Working Weight (lbs)</label>
				<input
					type='number'
					value={weight}
					onChange={e => setWeight(parseInt(e.target.value))}
					className='w-full p-2 border'
					placeholder='Enter working weight'
				/>
			</div>

			{/* Display warm-up sets if a weight has been entered */}
			{weight > 0 && (
				<div className='mt-4'>
					<h3 className='text-lg font-bold'>Warm-up Sets:</h3>
					<ul>
						{calculateWarmups(weight).map((set, index) => (
							<li key={index}>
								{set.percent}: {set.weight} lbs
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Button to add exercise to the workout */}
			<button
				onClick={handleAddExercise}
				className='mt-4 p-2 bg-green-500 text-white'>
				Add Exercise
			</button>

			{/* Display added exercises */}
			{exercises.length > 0 && (
				<div className='mt-4'>
					<h3 className='text-lg font-bold'>Exercises Added:</h3>
					<ul>
						{exercises.map((ex, index) => (
							<li key={index}>
								{ex.name} - {ex.weight} lbs
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Button to save the workout and related exercises */}
			{exercises.length > 0 && (
				<button
					onClick={handleFinishWorkout}
					className='mt-4 p-2 bg-purple-500 text-white'>
					Finish Workout
				</button>
			)}
		</div>
	);
};

export default AddWorkout;
