// app/api/add-workout/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the Exercise interface
interface Exercise {
	name: string;
	weight: number;
	reps?: number; // Optional if you want to include reps
}

// POST handler to add a new workout
export async function POST(request: Request) {
	try {
		// Parse the request body
		const body = await request.json();
		const { title, exercises }: { title: string; exercises: Exercise[] } = body;

		// Create the workout with related exercises
		const workout = await prisma.workout.create({
			data: {
				title,
				exercises: {
					create: exercises.map((exercise: Exercise) => ({
						name: exercise.name,
						sets: {
							create: [{ weight: exercise.weight, reps: exercise.reps ?? 5 }], // Default to 5 reps if not provided
						},
					})),
				},
			},
		});

		return NextResponse.json({ success: true, workout });
	} catch (error) {
		console.error('Error adding workout:', error);
		return NextResponse.json(
			{ error: 'Error adding workout' },
			{ status: 500 },
		);
	}
}
