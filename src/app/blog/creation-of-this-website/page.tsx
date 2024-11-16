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

## Choosing GitHub Pages
Chronologically speaking, I first came across this GitHub Pages service, and I want to take advantage of this because:

* it's entirely free
* it can be fully managed by myself in GitHub as a repository
* it comes with its organic \`github.io\` link, which I think is cool

Then I researched a bit about what can be hosted there since it is claimed as [a static site hosting service that takes HTML, CSS, and JavaScript files](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#about-github-pages) (not sure what this is supposed to mean). But I am the visual guy so I want the website to look good and responsive. After some searches, I was glad to find that it can host React apps. I know it could work for me!

## Next.js for React

Initially, I found this helpful step-by-step [guide](https://github.com/gitname/react-gh-pages), which was a life-saver because I have no knowledge of building React apps and deploying it.

I was thankful to this guide because it was detailed and user-friendly to follow, and things worked well, which greatly enhanced my confidence. Yet the only caveat I wish to call out here is that it uses \`create-react-app\`, which seems to be an outdated approach of creating React apps as of 2024.

That's a no-no for me because I wish to keep up with the trend and try to adopt latest technologies as much as possible. From the official React website, and from voices I heard in social media platforms like Red, I decided to adopt Next.js.

This time, I found another guide to help me set up Next.js with GitHub pages.
`;

  return (
    <ClientBlogLayout 
      title="Creation of this website" 
      date="2024-11-15"
      tags={["Next.js", "GitHub Pages", "Cursor"]}
    >
      {markdown}
    </ClientBlogLayout>
  );
} 
