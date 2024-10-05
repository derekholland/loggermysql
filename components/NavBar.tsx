// components/Navbar.js
'use client';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='bg-gray-800 p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='text-white text-2xl font-bold'>
					<Link href='/'>MyLogo</Link>
				</div>
				<div className='hidden md:flex space-x-4'>
					<Link
						href='/'
						className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
						Home
					</Link>
					{/* <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            About
          </Link> */}
					<Link
						href='/add-workout'
						className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
						Workouts
					</Link>
					{/* <Link href="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Contact
          </Link> */}
				</div>
				<div className='md:hidden'>
					<button className='text-gray-300 hover:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16m-7 6h7'
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
