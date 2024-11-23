import ClientBlogLayout from '@/app/components/ClientBlogLayout';

export default function BlogPost() {
  const markdown = `
## Overview

Hey everyone! In this post, I'm going to summarize my shallow learning experience with Deep Reinforcement Learning across the past two months, and talk about my attempts to integrate DeepRL with Godot game engine to make smart bots.

## Knowledge preparation

I was initially attracted by the cover of [DeepRL courses](https://huggingface.co/learn/deep-rl-course/unit0/introduction) offered by HuggingFace, and felt excited about what this can bring to games! DeepRL can be the brain of NPCs in the game, which unlocks a whole new potential for game developers and game players.

### The HuggingFace courses

I completed the course and received certificate in two months during spare time:

![hf-certificate](https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/a-taste-of-deep-reinforcement-learning/hf-certificate.png)

and below are my reviews about the *Good* and *Bad* of this course series:

#### The good

The course syllabus was great, and the content was written in a vivid manner (with lots of visual representations) to help readers grasp key concepts in RL.

From my personal experience, the course is designed successfully in that it attracts and holds readers' attention, and keeps delivering positive feedbacks. Every unit in the course comes with *hands on* exercises to give audience 1st-hand experience. The colab was extremely detailed, guiding people to follow the step-by-step process. And the outcomes? They are tangible and rendered as short clips of trained bots playing those games! It delivers a huge sense of accomplishment when exporting results to HuggingFace repositories.

#### The bad

Looking back on what I've learned, I feel that my understanding to DeepRL was too shallow:
* Yes I am now familiar with RL-specific terms like *state*, *reward*, *action*, *policy function*, *action value function*, etc., but I feel the gap between the theory and implementation of famous deepRL algorithms like *A2C*, *PPO*. The main reason is that libraries like \`stable_baselines3\` wrap up implementations for ease of use.
* The game environments used in the courses are well-defined in Gymnasium. It feels detached with real game engine environments like Unity, UE, Godot, etc. So I didn't know how practical it is to adopt DeepRL in actual game development.

### Videos on Youtube

I also found this [series of videos](https://www.youtube.com/watch?v=vmkRMvhCW5c) made by Shusen Wang on Youtube to enhance my understanding.

## Application in Godot

### "Ring Pong" game

I was not satisfied by finishing the courses and submitting trained models to HuggingFace; I wish to apply DeepRL to game scenes that I develop in Godot.

Inspired by this [Godot RL Agents tutorial](https://huggingface.co/learn/deep-rl-course/en/unitbonus3/godotrl#godot-rl-agents), I followed along and successfully trained and applied the AI to play this ring pong game. The tutorial covers the steps up to training, but missing exporting, and applying the models. I added my notes in Appendix to help you out if you want to try it out yourself.

### "5 in a row" game

Again, I was not satisfied by games like "Ring Pong" where there is only one AI in the game, and wanted to try something more complex like __self-play__. So I built a "5 in a row" game environment with Godot, with two AI players playing *against* each other!

![5-in-a-row-demo](https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/a-taste-of-deep-reinforcement-learning/5-in-a-row-demo.gif)

It was me playing against myself, and I was surprised to see that the AI was able to learn to play the game!

Things didn't went well with self-play: I noticed that the AI was dumb and didn't show any sign of learning even if I let it train for the whole night (with > 10M steps). I tried to the following things to improve the performance:
* Change the reward function
   * reward AI for placing a better move (evaluated by how many pieces in a row already)
   * penalize AI for placing an invalid move that already has pieces, and early stop the game
* Refine the observations
   * separate two players pieces in the board (with the hope to normalize the inputs)
   * add current player's turn indicator to the observation
* Refine the action space
   * add a "pass" action to the action space, to allow AI to skip the turn if no valid moves
* Implement a self-play loop with PPO manually
   * referenced [code base](https://github.com/ImmanuelXIV/ppo-self-play/blob/master/policy.py) 
   * explicitly define how the two AIs are taking turns to play this game

The end results was still not any better than a random AI. Sigh...

Hence, my attempts to apply DeepRL in Godot game development were not always successful. My takeaway so far is that:
* DeepRL can be applied in Godot! At least for simple cases where we just need one AI to play the game, it's a great-to-have feature. Hope I could adopt this in my game projects in the future.
* Self-play is hard in Godot. It's not easy to set up the reward function and training loop for self-play, and the performance is not always better than a random AI (or it could be me doing something wrong). I know that for mature game engines like Unity, there are plugins that support self-play out of the box, so I believe it's just a matter of time before Godot catches up.

Lastly, in case any interested readers are interested in figuring out what went wrong with my "5 in a row" game, please let me know! I'd be happy to discuss. Link to the [project repo](https://github.com/JiaqiHe/5-in-a-row).

## Ending words

At this ongoing trend of AI moving towards *Agentic* AI, I'm excited to see what's next!

Cheers!

---

## Appendix

For interested readers who also want to try Godot with Godot RL but encounter errors/failures, I'd like to share a few notes about training and applying the model to game. The tutorial only covers the steps up to training, but missing exporting, and applying the models.

### How to export trained model?

[Reference doc](https://github.com/edbeeching/godot_rl_agents/tree/main?tab=readme-ov-file#exporting-and-loading-your-trained-agent-in-onnx-format)

Let's put aside the Godot editor for now. We'll need to use terminals to run some commands in order to save models we trained.

The latest version of the Godot RL library provides experimental support for onnx models with the Stable Baselines 3, rllib, and CleanRL training frameworks.

For example, let's use the Stable Baselines 3 as the framework. Train your agent using the [sb3 example](https://github.com/edbeeching/godot_rl_agents/blob/main/examples/stable_baselines3_example.py) ([instructions for using the script](https://github.com/edbeeching/godot_rl_agents/blob/main/docs/ADV_STABLE_BASELINES_3.md#train-a-model-from-scratch)), enabling the option \`--onnx_export_path=model.onnx\`

Below is an example command line to execute:

\`\`\`bash
cd <....> # go into this Godot project directory
python stable_baselines3_example.py --timesteps=100_000 --onnx_export_path=model.onnx --save_model_path=model.zip --save_checkpoint_frequency=20_000 --experiment_name=exp1
\`\`\`

If things work correctly, you should see messages printed out in the terminal like below:

\`\`\`bash
No game binary has been provided, please press PLAY in the Godot editor
waiting for remote GODOT connection on port 11008
\`\`\`

> If you encounter failures about import error in stable_baselines3_example script: "ImportError: cannot import name 'export_model_as_onnx' from 'godot_rl.wrappers.onnx.stable_baselines_export'", follow the answer in [this issue](https://github.com/edbeeching/godot_rl_agents/issues/203) here.

Now it's time to switch back to the Godot editor, and hit PLAY on the top right corner. Once you hit that, the game scene will pop up showing AI training. In the meantime, the terminal will start to print out metrics. Wait for the training to finish, and if things work correctly, you should be able to find the file \`model.onnx\` in the Godot project directory.

> If you run into issues where the Godot game can't connect with the training process, the symptom is that after you hit PLAY in Godot, the process didn't continue (i.e., nothing happens). The solution is: you need to add group token named "AGENT" (all capitals, without quotation marks) to the AI controller.

### How to apply the trained model?

Now let's apply this trained model to the game!

In the Godot editor, find the Sync node in \`train.tscn\`:

* change the control mode to \`Onnx Inference\` from the dropdown
* set \`Onnx Model Path\` to the model file name, in our case here it's \`model.onnx\`

To run this game, we need the mono version (i.e., the .NET version) of the Godot editor, you can download it from the Godot official page. We need to install [.NET](https://dotnet.microsoft.com/en-us/download) as well.

> If you run into issue about "Invalid Call. Nonexistent function 'new' in base 'CSharpScript'": [solution](https://github.com/edbeeching/godot_rl_agents/blob/main/docs/TROUBLESHOOTING.md)

> If you run into error "Unable to load shared library 'onnxruntime' on MacOS (DllNotFoundException)" when using inference mode: the solution is to follow this [GitHub issue](https://github.com/microsoft/onnxruntime/issues/9707#issuecomment-968090030), basically install Microsoft.ML.OnnxRuntime package.
`;

  return (
    <ClientBlogLayout 
      title="A Taste of Deep Reinforcement Learning" 
      date="2024-11-22"
      tags={["DeepRL", "Godot", "Agent"]}
    >
      {markdown}
    </ClientBlogLayout>
  );
} 
