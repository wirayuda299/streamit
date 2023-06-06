import { signIn } from 'next-auth/react';

export default function SignIn() {
	return (
		<div>
			<button
				onClick={() =>
					signIn('google', {
						callbackUrl: '/',
						redirect: true,
					})
				}
			>
				Sign In
			</button>
		</div>
	);
}
