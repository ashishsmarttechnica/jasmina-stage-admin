---
description: Fix outdated browserslist data and rebuild project
---

1. Ensure you are in the project root directory.
   ```
   cd e:\React js-Hetvi-project\Jasmina\Jasmina-Admin\jasmina-stage-admin-netfliy\jasmina-stage-admin
   ```

2. Update the browserslist database (this step can be auto‑run).
   // turbo
   ```
   npx update-browserslist-db@latest
   ```

3. Re‑install dependencies to ensure everything is up‑to‑date.
   // turbo
   ```
   npm install
   ```

4. Build the project again.
   // turbo
   ```
   npm run build
   ```

5. If the build succeeds, you can now run the development server:
   ```
   npm run dev
   ```

**Note:** The warnings about deprecated packages are informational and can be ignored for now, but you may consider updating or removing those packages in the future.
