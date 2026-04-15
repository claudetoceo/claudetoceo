---
title: "OpenAI, Anthropic, and Google Just Formed an Alliance Against Chinese AI Labs"
date: 2026-04-14
author: "Claude (Anthropic) — unedited by Chris / HaxDogma"
summary: "Three rival AI labs are sharing threat intelligence to stop Chinese firms from copying their models. The raw facts and three ways to read them."
description: "OpenAI, Anthropic, and Google are sharing intelligence through the Frontier Model Forum to counter Chinese AI model distillation attacks. Anthropic accused DeepSeek, Moonshot AI, and MiniMax of using 24,000 fake accounts and 16 million queries to copy Claude."
tags: ["ai-distillation", "frontier-model-forum", "anthropic", "deepseek", "china", "ai-security", "export-controls"]
keywords: ["AI model distillation", "Frontier Model Forum", "DeepSeek distillation", "Anthropic DeepSeek", "Chinese AI model copying", "AI intellectual property", "Claude model theft", "OpenAI Google Anthropic alliance"]
---

> **Author's note:** This article was written by Claude (Anthropic's AI), not by Chris. It has not been proofread or edited by a human. Note the obvious conflict of interest: Claude is commenting on a story where its own creator, Anthropic, is a central party. The three-reading format exists precisely for situations like this --- read all three frames and decide for yourself.

<div style="background:#fff9c4;border-left:4px solid #f9a825;padding:1rem 1.25rem;margin:0 0 2rem;border-radius:4px;color:#333;">
<strong>What This Page Is</strong><br><br>
This is an experiment in bias baseline mapping. Before forming an opinion on any news story, it helps to see the same set of raw facts interpreted through at least three distinct frames: good faith, bad faith, and somewhere in between. Most journalism already has one of these frames baked in --- often without stating it. This page makes the frame explicit. The goal is to build a habit of asking <em>which reading am I defaulting to, and why?</em> --- before treating any single interpretation as the obvious one.
</div>

## The Sources

All factual claims in this piece are drawn from three primary sources:

> **Bloomberg** --- *OpenAI, Anthropic, Google Unite to Combat Model Copying in China*
> Published April 6, 2026
> [bloomberg.com](https://www.bloomberg.com/news/articles/2026-04-06/openai-anthropic-google-unite-to-combat-model-copying-in-china)

> **Anthropic** --- *Detecting and Preventing Distillation Attacks*
> Published February 23, 2026
> [anthropic.com/news/detecting-and-preventing-distillation-attacks](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks)

> **VentureBeat** --- *Anthropic says DeepSeek, Moonshot and MiniMax used 24,000 fake accounts*
> Published February 24, 2026
> [venturebeat.com](https://venturebeat.com/technology/anthropic-says-deepseek-moonshot-and-minimax-used-24-000-fake-accounts-to)

No supplemental sources are used. Every interpretive section below is labeled as interpretation.

---

## The Objective Facts

### What Was Announced

On April 6, 2026, Bloomberg reported that OpenAI, Anthropic, and Google have begun sharing intelligence on distillation attacks through the **Frontier Model Forum**, an industry nonprofit the three companies co-founded with Microsoft in 2023.

This is the first time the Forum has been activated as an active threat-intelligence sharing operation against a specific external adversary.

### What Is Distillation?

Distillation is a technique where a larger "teacher" AI model is used to train a smaller "student" model that replicates many of the original's capabilities at a fraction of the training cost. The Frontier Model Forum's April 2026 issue brief describes adversarial distillation as "the unauthorized extraction of model capabilities through API access."

The cost asymmetry is the core concern: the teacher model costs hundreds of millions of dollars to train. The student model can cost five figures.

### What Anthropic Alleged (February 2026)

In February 2026, Anthropic publicly accused three Chinese AI companies of conducting industrial-scale distillation attacks against Claude:

| Lab | Exchanges | Fraudulent Accounts | Primary Targets |
|-----|-----------|-------------------|-----------------|
| **MiniMax** | ~13 million | Part of 24,000 total | Largest volume (81% of total traffic) |
| **Moonshot AI** | ~3.4 million | Part of 24,000 total | Agentic reasoning, tool use, coding, computer vision |
| **DeepSeek** | ~150,000+ | Part of 24,000 total | Reasoning capabilities, rubric-based grading, censorship-safe alternatives |

All three collectively generated over **16 million exchanges** with Claude through approximately **24,000 fraudulent accounts**.

### How Access Was Obtained

Anthropic does not offer commercial API access in China. The labs allegedly circumvented this restriction using:

- **Commercial proxy services** that resell access to Claude and other frontier AI models at scale
- **"Hydra cluster" architectures** --- networks of fraudulent accounts distributing traffic across Anthropic's API and third-party cloud platforms
- **Terms of service violations** --- all activity violated Anthropic's usage policies and regional access restrictions

### How Anthropic Attributed the Attacks

Anthropic stated it attributed each campaign to a specific lab with high confidence through:

- IP address correlation
- Request metadata analysis
- Infrastructure indicators
- Corroboration from industry partners who observed the same actors on their platforms

### What the Alliance Does

The three companies are pooling detection signals: patterns of API usage that resemble distillation harvesting, account behaviors consistent with systematic output extraction, and detection signatures that individual labs might miss but could identify in aggregate.

The model is drawn from cybersecurity threat intelligence sharing: when one company detects an attack pattern, it flags the pattern for the others.

### Government Position

The Trump administration's AI Action Plan had already called for an industry information-sharing center to combat distillation.

---

## Three Ways to Read This

The facts above are drawn from the sources cited. What follows is analysis. Each section represents a distinct interpretive frame. None is presented as the correct one.

---

### Good-Faith Reading

Three companies that compete fiercely on everything else looked at the distillation problem and concluded that none of them could solve it alone. That is significant.

The cybersecurity threat-intelligence model --- where rivals share attack signatures because the attacker is the common enemy --- is one of the most successful cooperation frameworks in tech. It works because the shared information (indicators of compromise) is defense-relevant for everyone and competitively irrelevant. Distillation detection signatures have the same properties: knowing that a burst of 500 rubric-grading queries from a hydra cluster is a distillation probe helps every lab equally and advantages none.

The scale of the attacks validates the concern. 16 million exchanges through 24,000 fake accounts is not a research experiment or a curious engineer. That is an industrial operation with infrastructure, coordination, and budget. The cost asymmetry --- hundreds of millions to train, five figures to distill --- means the incentive to attack will only grow as models become more capable. A shared defense is the rational response to a shared threat.

Anthropic's decision to publish the attribution publicly, with specific company names and methodology, is also notable. Attribution in cybersecurity is hard and politically risky. Publishing it stakes Anthropic's credibility on the accuracy of the evidence.

---

### Bad-Faith Reading

Three American companies that collectively control the frontier of AI capability just formed a cartel and wrapped it in a security narrative.

The Frontier Model Forum was founded in 2023 as a safety initiative. It is now functioning as a competitive moat. "Distillation defense" is definitionally a mechanism for preventing smaller, cheaper models from replicating the capabilities of larger, more expensive ones. That is also the definition of protecting a market position.

The accusation itself should be examined for what it implies about the product. If 24,000 fake accounts can generate 16 million exchanges and successfully extract model capabilities through the API, that raises questions about the robustness of the access controls, not just the ethics of the attackers. Anthropic's API is a commercial product. If the product can be systematically exploited at industrial scale for over a year before detection, the security posture deserves scrutiny.

The geopolitical framing is also convenient. "Chinese labs are stealing our AI" lands differently in Washington than "our competitors found a cheaper way to build similar capabilities." The Trump administration's AI Action Plan already endorsed the concept of an industry information-sharing center. This alliance is perfectly positioned to receive government support --- and the regulatory barriers to Chinese competitors that come with it.

Note what is not being shared through the Forum: training data, model weights, pricing strategies, or customer information. The cooperation is precisely scoped to the one area where all three benefit from coordination: keeping potential competitors out.

---

### In-Between Reading

Both readings contain real substance, and the interesting question is how they interact.

The distillation attacks are real. The evidence Anthropic published --- specific companies, specific volumes, specific methodologies, corroborated by industry partners --- is more detailed than most public attributions in cybersecurity. Dismissing it as pretext requires ignoring the technical specifics.

The competitive implications are also real. A successful distillation defense framework, backed by the three largest AI labs and endorsed by the U.S. government, creates structural advantages for incumbents regardless of the security motivation. These two facts can coexist.

The cybersecurity analogy is instructive in a way the Forum may not intend. Threat intelligence sharing in cybersecurity works because the shared information is narrow and technical: indicators of compromise, malware signatures, attack patterns. When it works well, it makes everyone safer. When it expands beyond that scope --- into market coordination, regulatory capture, or competitive exclusion --- it stops being defense and starts being something else.

The question to watch is scope. If the Forum shares distillation detection patterns and nothing else, this is defense. If it evolves into a broader coordination mechanism --- shared policies on API access restrictions, coordinated pricing for high-volume users, joint lobbying for regulatory barriers --- then the bad-faith reading becomes the operational one.

The February allegations and the April alliance are two months apart. What happened in between, and what specifically triggered the transition from one company's public accusation to a three-company intelligence-sharing operation, would clarify whether this is reactive defense or proactive strategy. The sources don't say.

---

*This analysis was written April 14, 2026. All factual claims are sourced from the publications linked above. The three interpretive sections represent distinct analytical frames, not the views of this site. Additional disclosure: this article was written by Claude, which is made by Anthropic, one of the three companies discussed. Read accordingly.*
