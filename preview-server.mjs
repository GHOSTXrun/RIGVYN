import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const args=process.argv.slice(2);
const option=(k,d)=>args.includes(k)?args[args.indexOf(k)+1]:d;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain; charset=utf-8','.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8'};
http.createServer((req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
    if(pathname==='/__mobile-preview'){
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end('<!doctype html><html><body style="margin:0;background:#182132;display:flex;justify-content:center;padding:18px"><iframe title="Mobile frontend preview" src="/" style="width:390px;height:844px;border:1px solid #475675;border-radius:12px;background:#080d18"></iframe></body></html>');
      return;
    }
    let file=path.resolve(root,'.'+pathname);
    if(file!==root&&!file.startsWith(root+path.sep))throw Error('Invalid path');
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file))throw Error('Missing file');
    const bytes=fs.readFileSync(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':bytes.length});
    res.end(bytes);
  }catch{res.writeHead(404);res.end('Not included in this frontend preview');}
}).listen(Number(option('--port','4173')),option('--host','0.0.0.0'));
