import ClientBlogLayout from '@/app/components/ClientBlogLayout';

export default function BlogPost() {
  const markdown = `
## Introduction

Hey everyone!

In this post, I'm going to present you, for the very first time, my game concept, and share my progress using Godot to bring it to life along the way in the future!

## Basic game concept

I enjoy playing video games in my free time, and most of all, I want to create my own game! I had this idea in the mid year of 2024. Back then I started to get bored with the games I played (CIV6, Oxygen not included, Stardew Valley, Stacklands, etc.), and that made me wonder what game I want to play.

And my answer was: strategy and simulation. Based on my game experience, I came up with this high-level game concept: having a brave heart and entering woods, I summon a diverse group of  animals with divergent personalities/habits to build the world's most successful mobile apps!

I was self-motivated by how many potential fun mechanisms I could introduce to the game, and started to learn Godot and try to implement some rudimentary prototypes for some features to sanity check if they are manageable.

## World map evolution

In this post, I will go over the section about world map, which I implemented in multiple versions, and finally landed as a preferable state. If you are creating maps for your game in Godot 2D, hope you can avoid unnecessary troubles that I have confronted, and hope you will find it helpful!

My goal is to have a grid-like map that is interactive: the tile should highlight when the mouse hovers on it. And it needs to look nice.

### V0: GridContainer + Button

My initial "brilliant" idea is to use Buttons! Because Buttons are by natural, have hover-able interactions.

And what about appearance? Should also be fine since I could wrap the button with another panel or sprite to contain the terrain texture.

And, this initial results look satisfying:

![grid-button](https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/game-dev-1-creating-world-map/game-dev-1-grid-button.gif)

The great thing about this solution is that I don't need to handle any mouse hover events and mouse leaving events.

The bad thing? Yes, there is a significant drawback of this method: can not support curved tiles: every tile has to be squares so that they don't leave gaps. If changing to curved corners, it'll be strange to leave a lot of holes on the map. I also notice that having so many buttons would make the rendering a slight lagging when I move camera quickly.

## V1: TileMapLayer with dual-grid

Then I did some research online, and quickly realized that the cost of looking cute (having curved corners) is really high! 

When the terrain types I want to support increases, the work amount increases exponentially __if__ I want to make these terrains look compatible with each other and make the final rendered map look seamless.

This is because to create those naturally connected effects between two terrains, we have to explicitly create all possible connection tiles!

What's fortunate is that I notice this *dual-grid* version of using TileMapLayers to create curved tiles with much fewer tiles: [YouTube link](https://www.youtube.com/watch?v=buKQjkad2I0&t=234s). And what's amazing about open source is that Pablo Gila-Herranz shared his version on GitHub: [TileMapDual_godot_node](https://github.com/pablogila/TileMapDual_godot_node) (Thanksss)! I cloned this repository, followed the guideline and tried it out. Indeed it works great for two terrain types. Behaviors become unexpected when more terrain types kick in:

![dual-grid](https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/game-dev-1-creating-world-map/game-dev-1-dual-grid.gif)

If you look closely, those four types of terrains (white, pink, green, brown-ish green) don't work independently to handle the neighboring.

Another issue with using TileMapLayer is that I need to implement hover events explicitly! It's not that complex, but one good note is that don't forget to handle *removing* the hover effect when mouse moves away :)

V2: single TileMapLayer, but works like dual-grid

Guess what, I found this amazing demo [video](https://m.bilibili.com/video/BV17PUPYqEYs?buvid=YA43ECA3A5314E74460AB9B96A35FA8DCFEF&from_spmid=main.my-favorite.0.0&is_story_h5=false&mid=olhEu63Lq0%2F0KRp0YPD1pQ%3D%3D&p=1&plat_id=114&share_from=ugc&share_medium=iphone&share_plat=ios&share_session_id=E59F8D07-D34D-49AD-8041-32023BF6F562&share_source=WEIXIN&share_tag=s_i&timestamp=1733036216&unique_k=dPtVxB4&up_id=1831152475) with slogan "beat the dual-grid up" LOL on bilibili. The video owner did some research about the tile filling mechanism, and found some magic tricks. In the end, I can implement the rounded corners just like what dual grid can deliver, with 16 tiles in one layer!

Check out my final rendering results (so far, can't guarantee I polish it in the future):

![map-demo](https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/game-dev-1-creating-world-map/game-dev-1-map-demo.gif)

The map you see above is auto-generated. Check out [this tutorial](https://www.youtube.com/watch?v=rlUzizExe2Q) I followed.

## Ending words

Okay, that's pretty much for the map that I have been working on lately. There are other features I require on the map, but I didn't cover here, and I'll leave it to future related topics. Stay tuned!

## Appendix

As a last note, I really want to highlight how useful [this document](https://github.com/dandeliondino/godot-4-tileset-terrains-docs/blob/master/terrain_sets_docs.pdf) is for explaining how TileMap works. Can't believe such material didn't make to public official docs!

`;

  return (
    <ClientBlogLayout 
      title="[Game Dev #1] Creating world map" 
      date="2024-11-30"
      tags={["Game dev log", "Godot", "TileMapLayer"]}
    >
      {markdown}
    </ClientBlogLayout>
  );
} 
