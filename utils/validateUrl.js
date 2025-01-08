const allowedUrls = [
  'http://localhost:3000/',
  'http://localhost:3000/payment#!',
];

export function isValidUrl(url) {
  try {
    // Allow relative URLs that start with '/'
    if (url.startsWith('/')) {
      return true;
    }
    const parsedUrl = new URL(url);

    // Check if the URL is in the list of allowed URLs
    return allowedUrls.includes(parsedUrl.href);
  } catch (err) {
    return false;
  }
}