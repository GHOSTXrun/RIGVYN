(() => {
  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, options) {
    const requestURL = new URL(input instanceof Request ? input.url : input, location.href);
    const headers = new Headers(options?.headers || (input instanceof Request ? input.headers : undefined));
    if (requestURL.origin === location.origin) {
      const pathname = decodeURIComponent(requestURL.pathname).replace(/\/+$/, '') || '/';
      if (headers.get('RSC') === '1' || requestURL.searchParams.has('_rsc')) {
        const snapshot = THINKRIG_ROUTES[pathname];
        if (snapshot) {
          const response = await originalFetch('/' + snapshot, {credentials:'same-origin', signal: options?.signal});
          return new Response(response.body, {status:response.status, headers:{'Content-Type':'text/x-component; charset=utf-8'}});
        }
      }
      const method = (options?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
      if (pathname.startsWith('/api/') && !['GET', 'HEAD'].includes(method)) {
        return new Response(JSON.stringify({error:'Preview only. This action requires the original backend.'}), {status:501, headers:{'Content-Type':'application/json'}});
      }
    }
    return originalFetch(input, options);
  };
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const badge = document.createElement('aside');
      badge.textContent = 'PREVIEW · OCT 08, 2026';
      badge.style.cssText = 'position:fixed;bottom:8px;right:8px;z-index:99999;padding:6px 10px;background:#000;color:#fc0;border:1px solid #fc0;font:11px monospace;pointer-events:none';
      document.body.appendChild(badge);
    }, 1200);
  });
})();
