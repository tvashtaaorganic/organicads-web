import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the current URL information
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const host = request.headers.get('host') || 'organicads.in';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  
  // Add the base URL to the request
  const baseUrl = `${protocol}://${host}`;
  
  // Store this information for later use
  const response = NextResponse.next();
  response.headers.set('x-base-url', baseUrl);
  response.headers.set('x-pathname', pathname);
  
  return response;
}

export const config = {
  matcher: '/:path*',
};