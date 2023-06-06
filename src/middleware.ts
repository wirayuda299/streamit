import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const isProduction = process.env.NODE_ENV === 'production';
	const cookieProd = req.cookies.get('__Secure-next-auth.session-token');
	const cookie = req.cookies.get('next-auth.session-token');
	if (isProduction && cookieProd !== undefined && cookieProd !== null) {
		return NextResponse.next();
	} else if (!isProduction && cookie !== undefined && cookie !== null) {
		return NextResponse.next();
	} else {
		return NextResponse.rewrite(new URL('/auth/signin', req.url));
	}
}

export const config = {
	matcher: ['/((?!login|api|_next|static|favicon.ico).*)', '/'],
};
