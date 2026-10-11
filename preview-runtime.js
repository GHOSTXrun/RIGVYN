const THINKRIG_ROUTES = {"/": "snapshots/rsc/home.txt", "/claim": "snapshots/rsc/claim.txt", "/launch": "snapshots/rsc/launch.txt", "/blocks": "snapshots/rsc/blocks.txt", "/mine": "snapshots/rsc/mine.txt", "/rigs": "snapshots/rsc/rigs.txt", "/vault": "snapshots/rsc/vault.txt", "/blocks/10": "snapshots/rsc/blocks--10.txt", "/blocks/12": "snapshots/rsc/blocks--12.txt", "/blocks/2": "snapshots/rsc/blocks--2.txt", "/blocks/6": "snapshots/rsc/blocks--6.txt", "/blocks/13": "snapshots/rsc/blocks--13.txt", "/blocks/21": "snapshots/rsc/blocks--21.txt", "/blocks/16": "snapshots/rsc/blocks--16.txt", "/blocks/9": "snapshots/rsc/blocks--9.txt", "/blocks/4": "snapshots/rsc/blocks--4.txt", "/blocks/20": "snapshots/rsc/blocks--20.txt", "/blocks/19": "snapshots/rsc/blocks--19.txt", "/blocks/7": "snapshots/rsc/blocks--7.txt", "/blocks/11": "snapshots/rsc/blocks--11.txt", "/blocks/17": "snapshots/rsc/blocks--17.txt", "/blocks/15": "snapshots/rsc/blocks--15.txt", "/blocks/8": "snapshots/rsc/blocks--8.txt", "/blocks/3": "snapshots/rsc/blocks--3.txt", "/blocks/1": "snapshots/rsc/blocks--1.txt", "/blocks/14": "snapshots/rsc/blocks--14.txt", "/blocks/5": "snapshots/rsc/blocks--5.txt", "/blocks/18": "snapshots/rsc/blocks--18.txt", "/rigs/rig-22": "snapshots/rsc/rigs--rig-22.txt", "/rigs/rig-01": "snapshots/rsc/rigs--rig-01.txt", "/rigs/rig-04": "snapshots/rsc/rigs--rig-04.txt"};
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
