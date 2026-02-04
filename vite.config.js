import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import https from "node:https";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    configureServer(server){
      server.middlewares.use("/drive-image", (req, res)=>{
        const id = decodeURIComponent(req.url || "").replace(/^\/+/, "");
        if(!id){
          res.statusCode = 400;
          res.end("Missing image id");
          return;
        }
        const sources = [
          `https://drive.google.com/uc?export=view&id=${id}`,
          `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
          `https://lh3.googleusercontent.com/d/${id}`,
        ];

        const trySource = (index)=>{
          if(index >= sources.length){
            res.statusCode = 404;
            res.end("Image not available");
            return;
          }
          const url = sources[index];
          https.get(url, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "image/*,*/*;q=0.8" } }, (upstream)=>{
            if([301,302,303,307,308].includes(upstream.statusCode || 0) && upstream.headers.location){
              https.get(upstream.headers.location, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "image/*,*/*;q=0.8" } }, (redirected)=>{
                const contentType = redirected.headers["content-type"] || "";
                if((redirected.statusCode === 200) && contentType.startsWith("image/")){
                  res.statusCode = 200;
                  res.setHeader("Content-Type", contentType);
                  redirected.pipe(res);
                }else{
                  redirected.resume();
                  trySource(index + 1);
                }
              }).on("error", ()=> trySource(index + 1));
              return;
            }
            const contentType = upstream.headers["content-type"] || "";
            if((upstream.statusCode === 200) && contentType.startsWith("image/")){
              res.statusCode = 200;
              res.setHeader("Content-Type", contentType);
              upstream.pipe(res);
              return;
            }
            upstream.resume();
            trySource(index + 1);
          }).on("error", ()=> trySource(index + 1));
        };

        trySource(0);
      });
    },
  },
});
