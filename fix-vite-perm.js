   // fix-vite-perm.js
   if (process.env.VERCEL === "1") {
     const { execSync } = require("child_process");
     try {
       execSync("chmod +x node_modules/.bin/vite");
       console.log("Vite binary permissions fixed.");
     } catch (e) {
       // Ignore errors on non-Unix systems
     }
   }
