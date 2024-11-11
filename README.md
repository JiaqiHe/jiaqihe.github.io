## Howto: Deploy Next.js App to GitHub Pages

* GitHub side:
  * create a new repo `jiaqihe.github.io`.
* locally:
  * go into the directory that is going to host the local version of this github repo.
  * `git clone` the repo. After this step, we'll have a directory with name `jiaqihe.github.io`, do not `cd` in it for now.
  * Create Next.js app via `npx create-next-app@latest`. The first prompt would ask for the project name. For this project, type `jiaqihe.github.io` to use the same directory we just cloned. For other questions, we can just use the default options.
  * (for sanity check here) Try to bring up a local version with `npm run dev`. We should be able to go to [http://localhost:3000](http://localhost:3000) with the browser to see the result.
  * Make changes to `next.config.ts` as below, and submit all local changes to main branch:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  basePath: "/jiaqihe.github.io",
};

export default nextConfig;
```
   
* GitHub side:
  * Go to "Actions" in the repo page, and add an action called "Deploy Next.js site to Pages". This will create a commit change automatically. Just check in this change.
  * Now the action should be triggered, and every time we submit changes to main branch. Once it's successful, we can go to the website `https://jiaqihe.github.io` and see results.


> Caveat: After this, the local dev no longer works. I suspect that it could be related to the changes we made to `next.config.ts` file. Still unknown what is the work-around.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

