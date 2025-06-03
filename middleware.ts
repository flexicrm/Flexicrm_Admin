// // // // middleware.ts
// // // import { NextResponse } from 'next/server';
// // // import type { NextRequest } from 'next/server';
// // // import Cookies from 'js-cookie';

// // // export function middleware(request: NextRequest) {
// // //     const subdomain = Cookies.get('subdomain');
// // //     const path = request.nextUrl.pathname;
// // //     const isPublicPath = path === `/${subdomain}/login`;
// // //     const token = request.cookies.get('crmaccess')?.value || '';

// // //     // Protected paths
// // //     const protectedPaths = ['/', `/${subdomain}`];

// // //     if (protectedPaths.includes(path) && !token) {
// // //         return NextResponse.redirect(new URL(`/${subdomain}/login`, request.url));
// // //     }

// // //     // Allow public paths
// // //     if (isPublicPath && token) {
// // //         return NextResponse.redirect(new URL('/', request.url));
// // //     }
// // // }

// // // // Specify the paths middleware should run on
// // // export const config = {
// // //     matcher: ['/', `/${subdomain}`, `/${subdomain}/login`]
// // // };

// // // // // middleware.ts
// // // // import { NextResponse } from 'next/server';
// // // // import type { NextRequest } from 'next/server';

// // // // export function middleware(request: NextRequest) {
// // // //     // Extract subdomain from host or cookies
// // // //     const host = request.headers.get('host');
// // // //     let subdomain = request.cookies.get('subdomain')?.value || (host?.split('.')[0] === 'localhost' || host?.split('.')[0] === 'www' ? '' : host?.split('.')[0]);

// // // //     // Validate subdomain format
// // // //     if (!subdomain || !/^[a-z0-9-]+$/.test(subdomain)) {
// // // //         return NextResponse.redirect(new URL('/invalid-subdomain', request.url));
// // // //     }

// // // //     const path = request.nextUrl.pathname;
// // // //     const token = request.cookies.get('crmaccess')?.value || '';

// // // //     // Protected paths - use startsWith for better matching
// // // //     const protectedPaths = ['/', `/${subdomain}`, `/${subdomain}/dashboard`];
// // // //     const isProtectedPath = protectedPaths.some((protectedPath) => path === protectedPath || path.startsWith(`${protectedPath}/`));

// // // //     // Public paths
// // // //     const publicPaths = [`/${subdomain}/login`, `/${subdomain}/forgot-password`, `/${subdomain}/reset-password`];
// // // //     const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.startsWith(`${publicPath}/`));

// // // //     // Redirect to login if trying to access protected path without token
// // // //     if (isProtectedPath && !token) {
// // // //         return NextResponse.redirect(new URL(`/${subdomain}/login`, request.url));
// // // //     }

// // // //     // Redirect away from public paths if already authenticated
// // // //     if (isPublicPath && token) {
// // // //         return NextResponse.redirect(new URL(`/${subdomain}/dashboard`, request.url));
// // // //     }

// // // //     return NextResponse.next();
// // // // }

// // // // export const config = {
// // // //     matcher: ['/((?!api|_next/static|_next/image|favicon.ico|invalid-subdomain).*)']
// // // // };
// // // // import { NextResponse } from 'next/server';
// // // // import Cookies from 'js-cookie';

// // // // // const protectedPaths = [];

// // // // export function middleware(request) {
// // // //     const userToken = request.Cookies.get('crmaccess')?.value;
// // // //     const subdomain = Cookies.get('subdomain');
// // // //     const protectedPaths = ['/', `/${subdomain}`, `/${subdomain}/dashboard`];
// // // //     // Check if the current path is protected
// // // //     const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

// // // //     if (isProtectedPath && !userToken) {
// // // //         // Create an HTML response with the message and countdown timer
// // // //         const htmlResponse = `
// // // //             <!DOCTYPE html>
// // // //             <html lang="en">
// // // //             <head>
// // // //                 <meta charset="UTF-8">
// // // //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
// // // //                 <meta http-equiv="refresh" content="5;url=/${subdomain}/dashboard>
// // // //                 <title>Access Denied</title>
// // // //                 <style>
// // // //                     body {
// // // //                         font-family: Arial, sans-serif;
// // // //                         display: flex;
// // // //                         justify-content: center;
// // // //                         align-items: center;
// // // //                         height: 100vh;
// // // //                         margin: 0;
// // // //                         background-color: #f0f0f0;
// // // //                     }
// // // //                     .message {
// // // //                         background: white;
// // // //                         padding: 20px;
// // // //                         border-radius: 8px;
// // // //                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// // // //                         text-align: center;
// // // //                     }
// // // //                 </style>
// // // //             </head>
// // // //             <body>
// // // //                 <div class="message">
// // // //                     <h1>Access Denied</h1>
// // // //                     <p>Please login, you can't access this page. Please login first. Thank you.</p>
// // // //                     <p id="countdown">Redirecting to the home page in <span id="timer">5</span> seconds...</p>
// // // //                 </div>
// // // //                 <script>
// // // //                     let timeLeft = 5;
// // // //                     const timerElement = document.getElementById('timer');
// // // //                     const countdownInterval = setInterval(() => {
// // // //                         timeLeft -= 1;
// // // //                         timerElement.textContent = timeLeft;
// // // //                         if (timeLeft <= 0) {
// // // //                             clearInterval(countdownInterval);
// // // //                         }
// // // //                     }, 1000);
// // // //                 </script>
// // // //             </body>
// // // //             </html>
// // // //         `;

// // // //         // Return the HTML response
// // // //         return new NextResponse(htmlResponse, {
// // // //             status: 200,
// // // //             headers: {
// // // //                 'Content-Type': 'text/html'
// // // //             }
// // // //         });
// // // //     }

// // // //     // If the path is not protected or the token is present, allow access
// // // //     return NextResponse.next();
// // // // }

// // // // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // // // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // // // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // // // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // // import { NextResponse, NextRequest } from 'next/server';

// // // export function middleware(request: NextRequest) {
// // //     console.log('??????????????????????', request);
// // //     const userToken = request.cookies.get('crmaccess')?.value;
// // //     // Extract subdomain from the hostname
// // //     const hostname = request.headers.get('host') || '';
// // //     const subdomain = hostname.split('.')[0]; // adjust this logic to match your domain setup
// // //     console.log(subdomain, 'subdomain');
// // //     const protectedPaths = ['/', `/${subdomain}`, `/${subdomain}/dashboard`];

// // //     const currentPath = request.nextUrl.pathname;
// // //     const isProtectedPath = protectedPaths.some((path) => currentPath.startsWith(path));

// // //     if (isProtectedPath && !userToken) {
// // //         const htmlResponse = `
// // //       <!DOCTYPE html>
// // //       <html lang="en">
// // //       <head>
// // //           <meta charset="UTF-8">
// // //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
// // //           <meta http-equiv="refresh" content="5;url=/${subdomain}/dashboard">
// // //           <title>Access Denied</title>
// // //           <style>
// // //               body {
// // //                   font-family: Arial, sans-serif;
// // //                   display: flex;
// // //                   justify-content: center;
// // //                   align-items: center;
// // //                   height: 100vh;
// // //                   margin: 0;
// // //                   background-color: #f0f0f0;
// // //               }
// // //               .message {
// // //                   background: white;
// // //                   padding: 20px;
// // //                   border-radius: 8px;
// // //                   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// // //                   text-align: center;
// // //               }
// // //           </style>
// // //       </head>
// // //       <body>
// // //           <div class="message">
// // //               <h1>Access Denied</h1>
// // //               <p>Please login, you can't access this page. Thank you.</p>
// // //               <p id="countdown">Redirecting to the dashboard in <span id="timer">5</span> seconds...</p>
// // //           </div>
// // //           <script>
// // //               let timeLeft = 5;
// // //               const timerElement = document.getElementById('timer');
// // //               const countdownInterval = setInterval(() => {
// // //                   timeLeft -= 1;
// // //                   timerElement.textContent = timeLeft;
// // //                   if (timeLeft <= 0) {
// // //                       clearInterval(countdownInterval);
// // //                   }
// // //               }, 1000);
// // //           </script>
// // //       </body>
// // //       </html>
// // //     `;

// // //         return new NextResponse(htmlResponse, {
// // //             status: 200,
// // //             headers: {
// // //                 'Content-Type': 'text/html'
// // //             }
// // //         });
// // //     }

// // //     return NextResponse.next();
// // // }
// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// // export function middleware(request: NextRequest) {
// //     console.log('Middleware triggered for:', request.url);
// //     return NextResponse.redirect(new URL('/login', request.url));
// // }

// // // Specify the paths you want the middleware to run on
// // export const config = {
// //     matcher: [
// //         '/', // match root path
// //         '/dashboard', // match /dashboard
// //         '/((?!login).*)' // match all paths except /login
// //     ]
// // };
// import { NextResponse, NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//     const subdomain = request.cookies.get('subdomain')?.value || '';
//     const path = request.nextUrl.pathname;
//     const isPublicPath = path === `/${subdomain}/login`;
//     const token = request.cookies.get('crmaccess')?.value || '';

//     const protectedPaths = ['/', `/${subdomain}`];

//     if (protectedPaths.includes(path) && !token) {
//         return NextResponse.redirect(new URL(`/${subdomain}/login`, request.url));
//     }

//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL(`/${subdomain}`, request.url));
//     }

//     return NextResponse.next(); // Continue as normal
// }

// // Static config: you can't use dynamic variables here like `${subdomain}`
// export const config = {
//     matcher: ['/', '/:subdomain']
// };
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================

// import { NextResponse } from 'next/server';

// export function middleware(request) {
//     const userToken = request.cookies.get('crmaccess')?.value;
//     const subdomain = request.cookies.get('subdomain')?.value;

//     // Define paths that don't require authentication
//     const publicPaths = ['/', '/login', `/${subdomain}/login`, '/api/auth', '/_next/static', '/_next/image', '/favicon.ico'].filter(Boolean); // Remove any undefined paths if subdomain is missing

//     // Check if the current path is public
//     const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

//     // If it's not a public path and there's no token, redirect to login
//     if (!isPublicPath && !userToken) {
//         const loginPath = subdomain ? `/${subdomain}/login` : '/login';

//         // Create an HTML response with the message and countdown timer
//         const htmlResponse = `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <meta http-equiv="refresh" content="5;url=${loginPath}">
//                 <title>Access Denied</title>
//                 <style>
//                     body {
//                         font-family: Arial, sans-serif;
//                         display: flex;
//                         justify-content: center;
//                         align-items: center;
//                         height: 100vh;
//                         margin: 0;
//                         background-color: #f0f0f0;
//                     }
//                     .message {
//                         background: white;
//                         padding: 20px;
//                         border-radius: 8px;
//                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                         text-align: center;
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="message">
//                     <h1>Access Denied</h1>
//                     <p>Please login to access this page.</p>
//                     <p id="countdown">Redirecting to login page in <span id="timer">5</span> seconds...</p>
//                 </div>
//                 <script>
//                     let timeLeft = 5;
//                     const timerElement = document.getElementById('timer');
//                     const countdownInterval = setInterval(() => {
//                         timeLeft -= 1;
//                         timerElement.textContent = timeLeft;
//                         if (timeLeft <= 0) {
//                             clearInterval(countdownInterval);
//                         }
//                     }, 1000);
//                 </script>
//             </body>
//             </html>
//         `;

//         return new NextResponse(htmlResponse, {
//             status: 200,
//             headers: {
//                 'Content-Type': 'text/html'
//             }
//         });
//     }

//     // If user has token and tries to access login page, redirect to home
//     if (isPublicPath && userToken && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith(`/${subdomain}/login`))) {
//         return NextResponse.redirect(new URL(subdomain ? `/${subdomain}` : '/', request.url));
//     }

//     return NextResponse.next();
// }
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const urlPath = request.nextUrl.pathname;
    const dynamicProtectedPath = request.cookies.get('subdomain')?.value; // e.g. "/project-xyz-admin"
    const userToken = request.cookies.get('crmaccess')?.value;

    const isProtectedPath = dynamicProtectedPath && urlPath.startsWith(dynamicProtectedPath);

    if (isProtectedPath && !userToken) {
        const loginRedirectUrl = `${dynamicProtectedPath}/login`; // ✅ No extra slash

        const htmlResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="refresh" content="5;url=${loginRedirectUrl}">
                <title>Access Denied</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        text-align: center;
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Access Denied</h1>
                    <p>You are not authorized to access this page.</p>
                    <p id="countdown">Redirecting to login in <span id="timer">5</span> seconds...</p>
                </div>
                <script>
                    let timeLeft = 5;
                    const timer = document.getElementById('timer');
                    setInterval(() => {
                        timeLeft--;
                        if (timeLeft >= 0) {
                            timer.textContent = timeLeft;
                        }
                    }, 1000);
                </script>
            </body>
            </html>
        `;

        return new NextResponse(htmlResponse, {
            status: 200,
            headers: {
                'Content-Type': 'text/html'
            }
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api|static).*)']
};
