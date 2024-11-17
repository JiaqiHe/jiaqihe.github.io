import ClientBlogLayout from '@/app/components/ClientBlogLayout';

export default function BlogPost() {
  const markdown = `
## Introduction

Hey everyone!

If you are ever curious about how the main page's 3D moving background is created (BTW in case you didn't notice, you can change its view angle by performing a drag action using mouse), you are in the right spot. In this post, I'd like to share my experience of using __Spline__ to create art material in this website, and some tips for interested readers who want to give it a try.

## How I got to know Spline

Back in mid year of 2024, I was attracted by 3D art created in Blender. And thanks to recommendation algorithm in video platforms, I was flooded with 3D art tutorials. And since then I got to know Spline. My impression back then was that it is an easy version of Blender, and I still had stronger affection for Blender simply because it seems way more powerful and more diverse.

My perspective changed until I saw the interactiveness Spline can easily deliver (e.g. [this tutorial](http://xhslink.com/a/4BMNxrmh9GUZ) in mandarin, or in [English](https://www.youtube.com/watch?v=JPUSjRxQEKI)). I was like "*Wow I want it!*".

## My journey with Spline

Spline has its web interface: [spline.design](https://spline.design/), and it's free to use for the most of the functionalities. It also has downloadable version, but I don't use it ever since I came across closing issues multiple times.

### Ramp up

Spline has an extensive spectrum of tutorials directly nested in their home page. But it is also a bit overwhelming for users like me who don't have any knowledge about 3D art. Yes those tutorials have catchy titles and visual effects, but they all feel like "advanced" features that I should explore in later phase.

For instance, I tried to follow this [tutorial](https://www.youtube.com/watch?v=JlrzLhEwMGI) with the hope to familiarize how to create shapes at will. I failed to follow, check out what I made compared to the reference:

![spline_ramp_up_bunny](https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/3d-art-with-spline/spline_ramp_up_bunny.gif)

I quickly realized that I needed basic tutorials. Luckily, Spline has [documentations](https://docs.spline.design/doc/-getting-started/doc390iSGamE) too. And these docs proved to be super helpful! I'd encourage everyone to begin with this starting documentation.

After picking up the basic operations and getting to know a few functionalities, I then went back to check out those fancy tutorials. And here was the glass cube I made:

![spline_ramp_up_cube](https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/3d-art-with-spline/spline_ramp_up_cube.gif)

### Create!

## My tips

Based on
`;

  return (
    <ClientBlogLayout 
      title="3D Art With Spline" 
      date="2024-11-17"
      tags={["3D", "Spline", "Mixamo"]}
    >
      {markdown}
    </ClientBlogLayout>
  );
} 