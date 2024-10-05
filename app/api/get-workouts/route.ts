// app/api/workouts/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// GET handler to fetch all workouts
export async function GET() {
	try {
		// Fetch all workouts, including their exercises and sets
		const workouts = await prisma.workout.findMany({
			include: {
				exercises: {
					include: {
						sets: true, // Include related sets for each exercise
					},
				},
			},
			orderBy: {
				date: 'desc', // Order by date (latest workouts first)
			},
		});

		// Return the workouts as JSON
		return NextResponse.json({ success: true, workouts });
	} catch (error) {
		console.error('Error fetching workouts:', error);
		return NextResponse.json(
			{ error: 'Error fetching workouts' },
			{ status: 500 },
		);
	}
}

// DELETE handler to delete a workout by its ID
export async function DELETE(request: Request) {
	try {
		const { id } = await request.json();
		console.log('Deleting workout with ID', id);
		// Delete the workout by ID
		await prisma.workout.delete({
			where: { id },
		});

		// Return success response
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting workout:', error);
		return NextResponse.json(
			{ error: 'Error deleting workout' },
			{ status: 500 },
		);
	}
}
