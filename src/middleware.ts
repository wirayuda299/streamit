import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const cookie = req.cookies.get('next-auth.session-token');
	const noEmpty = cookie !== undefined && cookie !== null;
	if (noEmpty) {
		return NextResponse.next();
	}
	return NextResponse.rewrite(new URL('/auth/signin', req.url));
}

export const config = {
	matcher: ['/((?!login|api|_next|static|favicon.ico).*)', '/'],
};
