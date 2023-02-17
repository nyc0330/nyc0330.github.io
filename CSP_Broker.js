self.addEventListener('fetch', async (event) => {
  const {request} = event;
  let response = await fetch(request);
  response = new Response(response.body, response)
  response.headers.delete('Content-Security-Policy');
  response.headers.delete('X-Frame-Options');
  event.respondWith(Promise.resolve(originalResponse));
});