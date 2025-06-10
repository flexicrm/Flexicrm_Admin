// pages/404.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page immediately
    router.replace('/');
  }, [router]);

  // No content is rendered here
  return null;
}
