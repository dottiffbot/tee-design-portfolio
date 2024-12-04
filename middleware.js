export function middleware(req) {
    const url = req.nextUrl;
  
    // If the request is for the root path `/`, redirect to `/design`
    if (url.pathname === '/') {
      url.pathname = '/design'; // Set the pathname to `/design`
      return Response.redirect(url, 307); // 307 means temporary redirect
    }
  
    // If not the root, proceed with the request
    return Response.next();
  }
  
  export const config = {
    matcher: '/', // Apply to root path `/`
  };