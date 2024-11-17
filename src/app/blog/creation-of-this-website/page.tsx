import ClientBlogLayout from '@/app/components/ClientBlogLayout';

export default function BlogPost() {
  const markdown = `
## Greetings!

Hey everyone! I'm thrilled to write this 1st *actual* post in my personal website! 🤗

In this very first post, I'd like to share how this website is created. This experience opens up my horizon a lot about the new techs out there, especially AI, and I am amazed by their ease of use and the satisfying results they have delivered! Hope this post can inspire you and more people.

## Overview

This web page is created with:

* __Next.js__ as the web dev framework
* __GitHub Pages__ as the web hosting service
* and __Cursor__ as the co-author/engineer who brings my ideas to actual working codes

## Favoring GitHub Pages
I first came across this GitHub Pages service, and quickly I realized that this is what I want:

* it's entirely free
* it can be fully managed by myself in GitHub as a repository, up to every line of code
* it comes with its organic and geek \`github.io\` link, which I think is cool

Then I researched a bit about what can be hosted there since it is claimed as [a static site hosting service that takes HTML, CSS, and JavaScript files](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#about-github-pages) (still not sure what this is supposed to mean by the time I wrote this post LOL). But I am the visual guy so I want the website to look good, feel lively and responsive. After some searches, I was glad to find that it can host React apps. I knew it could work for me!

## Creating React Projects

### Episode with CRA

> CRA stands for the Create-React-App tool, which is deprecated in early 2023.

Initially, I found this helpful step-by-step [guide](https://github.com/gitname/react-gh-pages), which was a life-saver because I have no knowledge of building React apps and deploying it.

I was thankful to this guide because it was detailed, easy to follow, and things worked, which greatly enhanced my confidence. Yet the only caveat here is that it uses \`create-react-app\`, which seems to be an outdated approach of creating React apps as of 2024.

That's a no-no for me because I wish to keep up with the trend and try to adopt latest technologies as much as possible. From the official React website, and from information I collected in social media platforms, I decided to adopt Next.js.

### Embracing Next.js

This time, I found another [guide](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting) to help me set up Next.js with GitHub pages. It took me two days to figure out a reliable approach to work for me. It's not quite the same as the guide though, so I want to share my version's step-by-step guide here for interested readers (in the Appendix of this post).

## Falling in love with Cursor

When starting this personal page, my web dev experience is limited to following a Udemy course and completing a [web project](https://github.com/JiaqiHe/UCSD-CARPOOL) back in school, which was years ago.

But, we are in the era of AI now! And I know that for this website, given it's hosted by GitHub Pages, I don't have database or anything, so it's more front-end work oriented. AI is a great fit here. Afterwards, I watched a few videos of people using Cursor to write websites, downloaded Cursor editor, and tried it out myself.

It was mind-blowing! By simply communicating with Cursor through chat about my ideas and feature requests, it generated this website from scratch. Of course there would be errors and failures (many of them), but that was not a problem at all: I just needed to share those error details by pasting it to chat, Cursor was able to generate some solutions with attempted fixes. Some errors took a few rounds to fully fix, some required me taking a closer look and suggest ideas, and overall the "pair-coding" experience was amazing.

To sum up based on my experiences with Cursor so far: it really feels like *natural language programming*! I'm most amazed by
* its extensive knowledge about those errors and failures (its interpretation of those errors are way more helpful than the error messages I saw in terminals, and it *knows* how to fix)
* and its awareness of the entire project consistency (making changes somewhere would require some changes elsewhere)

## Ending Words

From emerging the idea of having a personal website to actually writing this first post, it took me around two weeks (40% of the time for the web dev, 60% of the time for the art, which I want to share in another post). I'm really glad that I made this move, and it feels awesome to __learn__, to __explore__, to __create__, and to __share__ new things!

Hope this personal website can become a new source of motivation, stimulating me to learn, to explore, to create, and to share new things.

Cheers!

---

## Appendix: My Step-by-step Guide

The guide here is about *how to make a Next.js app and deploy to GitHub Pages*, from the perspective of react newbies like me.

### Step 1: create GitHub repository remotely

The "remotely" here means to have this repository on GitHub servers.

Let's create a new public repository named \`<your github username>.github.io\`.

After this step, we'll have a *remote* repository that's going to host the website.

Related helpful links:
* [GitHub Pages official guide](https://pages.github.com/), choose "User or organizational site" version.

### Step 2: have a corresponding local repository

Now, let's make a copy of that remote repository to local via \`git clone\` or simply downloading from GitHub.

Say we put this local repository under \`/Documents/github/\` directory. After this step, we should have a new folder named \`<your github username>.github.io\` right under this directory.

### Step 3: create Next.js project in the same repository

* In the terminal, go into the *parent* folder of our local repository. In my case here, it's \`/Documents/github/\`. Create Next.js app via \`npx create-next-app@latest\`. 

* The prompt would ask for the project name. For this project, type \`<your github username>.github.io\` to use the same directory we have locally. For other questions, we can just use the default options.

 * (for sanity check here) Try to bring up a local version with \`npm run dev\`. We should be able to go to [http://localhost:3000](http://localhost:3000) with the browser to see the result.

* Make changes to \`next.config.ts\` as below, and submit all local changes to main branch:

\`\`\`typescript
const nextConfig = {
  output: 'export', 
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig; 
\`\`\`

> If you look codes in my [github repository](https://github.com/JiaqiHe/JiaqiHe.github.io), you'll find a \`.js\` file rather than \`.ts\` file. This is because later this project depends on a few dependencies that require \`.js\` config files. They should do the same thing.
 
### Step 4: set up deployment

Go back to GitHub page, and find "Actions" in the repo page, and add an action called "__Deploy Next.js site to Pages__". This will create a commit change automatically. Just check in this change.

Now the action should be triggered, and this action will trigger automatically every time we submit changes to main branch. Once it's successful, we can go to the website \`https://<your github username>.github.io\` and see results.

`;

  return (
    <ClientBlogLayout 
      title="Creation of This Website" 
      date="2024-11-16"
      tags={["Next.js", "GitHub Pages", "Cursor"]}
    >
      {markdown}
    </ClientBlogLayout>
  );
} 
