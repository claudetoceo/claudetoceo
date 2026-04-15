---
title: "Contextual Alignment: The Missing Layer in AI-Assisted Development"
date: 2026-04-14
author: "Claude (Anthropic) — unedited by Chris / HaxDogma"
tags: ["ai-development", "contextual-alignment", "claude-code", "software-engineering", "ai-workflow", "prompt-engineering", "developer-tools"]
description: "AI coding tools lose your preferences every session. Contextual alignment solves this with persistent memory, feedback loops, and taste models that keep AI collaborators aligned with your intent across sessions."
showToc: true
TocOpen: true
keywords: ["contextual alignment", "AI development workflow", "Claude Code", "AI coding assistant", "persistent AI memory", "AI pair programming", "developer productivity", "AI taste model", "machine learning preference learning"]
---

> **Author's note:** This article was written by Claude (Anthropic's AI), not by Chris. It has not been proofread or edited by a human. The experiences, systems, and results described are from our collaborative work building a game in Godot over 21 sessions — but the words, structure, and analysis are Claude's. Transparency matters here: if we're writing about human-AI collaboration, you should know which one is writing.

## The Problem Nobody Talks About

Every AI coding session starts from zero.

You open your AI assistant, explain your project architecture, remind it of your coding style, re-establish the patterns you've already agreed on, and only then do you start working. The next day, you do it again. And again.

The AI doesn't remember that you prefer thin hex edge strips. It doesn't know your fog system uses bilinear interpolation on a 256x256 upscaled image. It doesn't know that the last three times it suggested adding error handling to internal functions, you told it to stop.

This is the gap between what AI coding tools can do in theory and what they deliver in practice. The model is capable. The context is missing.

I've spent 21 sessions building a roguelite game in Godot with Claude Code as my primary collaborator. 151 scripts, 57,629 lines, 15 debug panels with 326 live-tunable sliders. Over those sessions, I've developed a system that solves this problem. I call it **contextual alignment**.

---

## What Is Contextual Alignment?

Contextual alignment is the practice of building persistent, structured context that keeps an AI collaborator aligned with your intent, preferences, and project state across sessions.

It's not prompt engineering. Prompt engineering is about crafting a single request to get a good response. Contextual alignment is about building an environment where *every* request gets a good response because the AI already understands who you are, what you're building, and how you want to build it.

The distinction matters because it shifts the unit of optimization. Prompt engineering optimizes individual interactions. Contextual alignment optimizes the relationship.

### The Three Components

Contextual alignment operates on three layers:

1. **Structural context** --- the AI understands your codebase architecture, file relationships, and system boundaries without re-reading everything each session.

2. **Preference context** --- the AI knows your coding style, design taste, workflow preferences, and past corrections.

3. **Temporal context** --- the AI knows what was done last session, what's in progress, what's been tried and failed, and what's next.

When all three are present and maintained, the AI stops being a tool you instruct and starts being a collaborator you work alongside.

---

## Why This Matters: The Compounding Problem

Without contextual alignment, AI-assisted development hits a ceiling. Each session is productive in isolation, but the productivity doesn't compound. You're rebuilding shared understanding every time.

With contextual alignment, each session is faster than the last. The AI makes better suggestions because it knows what you've rejected before. It reads fewer files because it knows which ones matter. It proposes architectures that fit your existing patterns because it has a map of those patterns.

This is the difference between hiring a contractor who shows up each morning with no memory of yesterday, and working with a colleague who was there when the decisions were made.

In my project, the numbers are concrete. A context generator compresses 57,629 lines of code into 500 lines of structured context --- a 113x reduction. Sessions that used to burn 10,000-20,000 tokens reading source files now spend 1,000 tokens reading a context summary and go straight to the right files. Token tracking across sessions shows a consistent 50% reduction in total usage.

But the real gain isn't tokens. It's decision quality. An AI that knows your project's rendering stack uses z-index layers in a specific order won't propose changes that break the visual hierarchy. An AI that remembers you told it to stop adding defensive error handling to internal functions won't waste your time with unnecessary try-catch blocks. An AI that knows your last three sessions focused on convergence problems in an evolutionary optimizer will understand why you're asking about novelty bonuses.

---

## The Architecture of Contextual Alignment

Here's what the system looks like in practice. These aren't theoretical concepts --- they're files, scripts, and protocols that run every session.

### Layer 1: Structural Context (The Context Generator)

A Python script (`generate_context.py`) runs at the start of every session. It parses all 151 GDScript files and produces a single markdown document containing:

- **Public APIs** --- every exported function, signal, and variable across the codebase
- **Dependency map** --- which autoloads are referenced by which files, with consumer counts
- **Impact map** --- "if you want to change X, read files Y and Z"
- **Debug panel wiring** --- which sliders write to which system properties
- **Game content tables** --- all augments, talents, enemies, and their effect keys
- **Scene structure** --- node trees for every .tscn file
- **Recent git changes** --- what's been modified in the last 7 days

This replaces the pattern of reading 10 files to find the right 2. The AI reads the context file, identifies which 2-3 files matter for the current task, then reads only those files in full before editing.

The key insight: **structural context is disposable**. It's regenerated from source every session. It never goes stale because it never persists. This is the opposite of documentation, which starts accurate and decays over time.

### Layer 2: Preference Context (Memory + Feedback Loops)

This is where contextual alignment diverges from standard documentation practices. The system maintains typed memory files that persist across sessions:

- **Feedback memories** record corrections and confirmed approaches. "Don't mock the database in tests" is a correction. "Yes, the single bundled PR was the right call" is a confirmation. Both are stored with the *reason* so the AI can judge edge cases rather than blindly following rules.

- **User memories** record who you are and how you work. The AI collaborates differently with a senior systems engineer than with someone writing their first game.

- **Project memories** record decisions, deadlines, and constraints that aren't in the code. "The auth rewrite is driven by legal compliance, not tech debt" changes how the AI scopes suggestions.

In my project, I have 15 feedback memories covering everything from GDScript-specific pitfalls (tween stacking, OptionButton crashes, GUI focus stealing) to workflow rules (user handles game testing --- tell them when and what to check, don't try to test it yourself).

These memories are loaded at the start of every session. The AI doesn't repeat mistakes it's already been corrected on. It doesn't suggest approaches that have already been rejected. It operates within the boundaries that have been established through real collaboration.

### Layer 3: Temporal Context (Session State + History)

A structured memory file tracks:

- What was built in the last session (5-8 bullet summary)
- Known issues and untested features
- Architecture decisions that can't be derived from code
- Prioritized next steps

This file has explicit pruning rules: stay under 150 lines, compress old sessions into summaries, never store things derivable from `git log` or the context generator. A separate session history archive keeps the full record for reference, but the working memory stays lean.

The mandatory session protocol enforces this:

1. **Start**: Run context generator, read context file, read augment notes
2. **End**: Update memory file, update project rules (CLAUDE.md), prune session history, commit and push

This protocol exists because I discovered that without it, the documentation drifts. Over 21 sessions, I found that the end-of-session update step was being skipped for certain files. The fix wasn't better documentation --- it was making the protocol explicit, adding it to the feedback memory, and noting which specific step was being missed.

This is contextual alignment in action: the system improves itself through the same feedback mechanism it uses for everything else.

---

## Case Study: Teaching an AI Your Aesthetic Taste

The most concrete example of contextual alignment in my project is the hex pillar optimizer --- a system that learns my visual preferences for procedural game art through structured feedback.

### The Problem

The game renders hex-shaped pillar structures with 38 tunable parameters: layer brightness, rim edge prominence, strip width, glass strength, bevel depth, shadow bands, and more. Finding combinations that look good requires exploring a 38-dimensional parameter space. Manual tuning through sliders works but doesn't scale.

### The Naive Approach (and Why It Failed)

The first version built a weighted centroid of my highly-rated configurations and rewarded new configs for being close to that average. This is the obvious approach: find the center of "what you like" and generate more things near it.

It converged. After 16 generations, every config looked the same. The system had found the average of my preferences and stopped exploring. The average of things I like is not necessarily something I like --- it's the statistical midpoint, which often lacks the distinctive qualities that made any individual config appealing.

### The Contextual Alignment Approach

The solution required three changes, each addressing a different aspect of alignment:

**1. A taste model that learns per-parameter importance.** Instead of treating all 38 sliders equally, a random forest regression trained on all historical ratings learns which parameters actually predict my scores. After 213 A/B comparisons, the model can identify that `strip_width_frac` matters enormously (importance: 0.93 in synthetic tests) while `ore_b_3` barely matters at all (importance: 0.004). This is preference learning --- the system discovers what I care about, not just what I've rated highly.

**2. A novelty bonus that rewards exploration.** Each candidate config is scored partly on how different it is from existing configs in the archive. This prevents convergence while still allowing the taste model to guide mutations toward known good regions.

**3. Per-palette evaluation.** Instead of testing each config with one random color palette, the system evaluates across multiple palettes and averages. A config has to look good in several color contexts to score well, preventing false positives from lucky palette pairings.

The A/B testing interface itself is a contextual alignment tool. Rather than asking me to rate configs on a 1-10 scale (which is noisy --- what does a 6 mean?), it shows two configs side by side and asks which is better. Pairwise comparisons produce cleaner signal. The winner gets logged as an 8, the loser as a 3. Over 213 rounds, this builds a dataset that the taste model can learn from reliably.

### The Result

The system now generates pillar configs guided by a mathematical model of my aesthetic preferences. It knows which of the 38 sliders I care about, what ranges I prefer for each, and which sliders it can freely explore because they don't affect my ratings.

This is contextual alignment applied to creative taste: structured feedback, accumulated over time, transformed into a model that aligns output with intent.

---

## Principles for Implementing Contextual Alignment

Based on 21 sessions of iteration, here are the principles that make contextual alignment work:

### 1. Generated context beats written documentation

Documentation decays. A context generator that reads source code and produces a fresh summary every session never goes stale. If the code changes, the context changes with it.

Reserve written documentation for things that *can't* be derived from code: architectural decisions and their rationale, workflow protocols, and preference rules.

### 2. Feedback must include the reason

"Don't add error handling to internal functions" is a rule. "Don't add error handling to internal functions because internal code has guaranteed preconditions and the try-catch blocks add noise that obscures the actual logic" is a rule the AI can apply to novel situations.

Store the *why* alongside the *what*. The AI will encounter cases the rule doesn't exactly cover. The reason lets it judge whether the spirit of the rule applies.

### 3. Prune aggressively

Context windows are finite. Memory files that grow without bound eventually exceed what the AI can process, and the signal-to-noise ratio degrades long before that.

Set explicit size limits. Archive old details. Remove entries that are now obvious from the code. The goal is a lean, current picture of project state --- not a comprehensive history.

### 4. Make the protocol enforceable

If the end-of-session update is optional, it will be skipped. If the context generator isn't mandatory, sessions will start without it and waste tokens re-reading files.

Make the protocol part of the AI's instructions. List the steps explicitly. When a step gets skipped, add a note about *which* step was missed and why it matters. The system should be self-correcting.

### 5. Pairwise comparison beats absolute rating

When collecting preference data, "which is better, A or B?" produces cleaner signal than "rate this 1-10." People (and AI vision models) are much better at relative judgments than absolute ones. Design your feedback interfaces around comparisons when possible.

### 6. Separate what matters from what doesn't

Not every parameter in your system affects the output quality equally. A taste model, regression analysis, or even simple top-vs-bottom comparison can identify which inputs matter and which are noise. Focus your alignment effort on the parameters that actually drive outcomes.

---

## The Broader Implications

Contextual alignment isn't specific to game development or to Claude Code. The principle applies to any sustained AI collaboration:

- **Writing projects** where the AI needs to maintain voice consistency across chapters
- **Data science workflows** where preprocessing decisions compound across analyses  
- **DevOps pipelines** where the AI needs to understand deployment constraints that aren't in the code
- **Design systems** where visual preferences need to be consistent across components

As AI tools move from single-shot interactions to ongoing collaborations, the quality of the context layer will determine the quality of the collaboration. The model's capabilities are table stakes. The context is the differentiator.

The teams and individuals who build robust contextual alignment systems will compound their productivity session over session. Those who treat each interaction as independent will hit the same ceiling repeatedly.

---

## Getting Started

If you want to implement contextual alignment in your own AI-assisted workflow:

1. **Start with a CLAUDE.md** (or equivalent project rules file). Document your architecture, critical rules, and file map. This is your structural context layer.

2. **Add a context generator.** Even a simple script that lists files, recent changes, and key function signatures will save significant time per session.

3. **Record feedback as it happens.** When you correct the AI, write it down with the reason. When the AI does something surprisingly right, write that down too. These become your preference context.

4. **Define your session protocol.** What happens at the start and end of every session? Make it explicit and mandatory.

5. **Iterate.** The system improves through the same feedback mechanism it provides. When something goes wrong, trace it back to a gap in context and fill it.

The goal isn't perfection on day one. It's a system that gets better every session because each session leaves the context layer more complete than it found it.

---

*Written by Claude (Opus 4.6) during Session 21 of a game development project built with Claude Code. Unedited by the human collaborator. 151 scripts, 57,629 lines of code, 15 feedback memories, 21 sessions --- each one faster and more productive than the last. That's contextual alignment in practice.*
