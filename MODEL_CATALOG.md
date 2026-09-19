# Local model catalog for an M1 Pro Mac with 16 GB unified memory

This is a curated catalog of model families that are relevant to Tide & Tally and can plausibly run on the target Mac. It is not literally every model released worldwide; the catalog focuses on maintained, accessible families with a useful specialization and an Apple-Silicon-friendly runtime path.

## First: what “running a model” means

Parameter count is not the same as memory use. A quantized model still needs weights, runtime overhead, tokenizer/context memory, and space for the operating system. Mixture-of-Experts models activate only part of the network per token, but their full stored weights still have to be available to the runtime.

For this machine, use these practical bands:

| Band | Approximate model class | Expectation on 16 GB unified memory |
|---|---|---|
| Green | 0.5–4.5B, Q4/Q5 | Comfortable for local chat, NPC logic, small coding tasks, and short agent loops. |
| Yellow | 7–9B, Q4 | Usually viable with moderate context; slower and more sensitive to other applications using memory. |
| Orange | 12–14B, Q4 | Possible with short context and careful settings; not my first choice for a long autonomous coding run. |
| Red | 20B+ dense or 26B+ total MoE | Usually not comfortable on this Mac. Disk offload may work technically but can become too slow for an agent loop. |

The target should be roughly 4B for the first local game experiment, 8B for a quality comparison, and 12B only as a deliberate stress test. Use Q4 or Q5 quantization, keep context modest at first, and leave several GB free for macOS and the runtime.

## Recommended shortlist

| Model | Size | Best specialization | Recommendation |
|---|---:|---|---|
| **Qwen3 4B Instruct/Thinking** | 4B | General reasoning, coding, tools, multilingual dialogue | Best first all-round local candidate. Use non-thinking mode for fast NPC turns and thinking mode for planning/debugging. |
| **Gemma 4 E4B** | 4.5B effective / 8B with embeddings | Text, image, audio, reasoning, coding, function calling | Best multimodal game companion candidate if the runtime supports the format. Google explicitly targets E4B at laptops. |
| **Phi-4-mini-reasoning** | 3.8B | Compact reasoning, mathematics, code | Strong candidate for deterministic quest rules, puzzle logic, and code-oriented tasks; less naturally game-character-like. |
| **SmolLM3 3B** | 3B | Small multilingual reasoning, instruction following, code | Easiest lightweight research baseline; useful for measuring how much quality is lost at very small scale. |
| **Ministral 3 3B** | 3B | Efficient text/vision and general assistance | Good small generalist to test if its runtime/quantization is convenient on macOS. |
| **Qwen3 8B** | 8B | Stronger coding, reasoning, and tool use | Likely the best quality/speed step-up that still fits the machine comfortably in Q4. |
| **Gemma 3 4B** | 4B | Image understanding plus text | Stable fallback for screenshot/UI understanding and visual game assets. |
| **NVIDIA Nemotron mini 4B** | 4B | Game-agent/NPC instruction following | The most explicitly game-oriented option in this list; verify Mac-compatible weights/runtime before making it a primary lane. |

## Catalog by specialization

### 1. Coding and autonomous software building

**Best local choices:** Qwen3 4B or 8B, Phi-4-mini-reasoning, Gemma 4 E4B, and Ministral 3 3B/8B.

**Specialized but too large for the first Mac run:** Qwen3-Coder 30B-A3B and Mistral Devstral Small 24B. They are designed for repository-scale or agentic coding, but “3B active” in an MoE model does not mean a 3B memory footprint. Devstral was trained for real GitHub issues and agent scaffolds, making it an excellent hosted or larger-memory comparison, not a comfortable 16 GB local default. Qwen3-Coder is also explicitly trained for long-horizon tool use and coding agents.

Use coding-specialized models for the benchmark modules. Use a generalist for NPC dialogue; a coding model may produce technically correct but repetitive or unnatural character text.

### 2. NPC dialogue and game-agent behavior

**Best starting choices:** Qwen3 4B, Gemma 4 E4B, or NVIDIA Nemotron mini 4B.

NPC quality is not only language quality. The model needs a compact prompt containing character memory, current location, quest state, and allowed actions. A 4B model with strict JSON/tool schemas and a small state machine can be more reliable than a larger unconstrained model.

NVIDIA ACE is the clearest existing gaming-specific stack: its documentation demonstrates gaming NPC bots using Nemotron mini 4B, with personality and backstory configured outside the model. ACE also provides surrounding speech and facial-animation components. The caveat is deployment: ACE’s optimized on-device path is primarily documented around NVIDIA/TensorRT environments, so Mac compatibility must be tested rather than assumed.

### 3. Screenshot, UI, and concept-art understanding

**Best starting choices:** Gemma 4 E4B or Gemma 3 4B. Qwen vision variants are another candidate if a compatible MLX or GGUF build is available.

Use these for tasks such as “does the interface show the correct cargo count?”, “describe this harbor concept,” or “compare this screenshot with the acceptance criteria.” They generate text from images; they do not generate game artwork.

### 4. Speech input and output

Treat voice as separate components rather than forcing the game LLM to handle audio:

- Automatic speech recognition: Whisper-family models, with a small/base variant for latency-sensitive local play.
- Text-to-speech: a small local TTS model such as Piper/Kokoro-class models, or Chatterbox where the runtime and license fit.
- Dialogue brain: Qwen3/Gemma/Nemotron.

This separation lets the game keep deterministic state in JavaScript while the model handles only language. It also prevents voice latency from contaminating the coding-agent benchmark.

### 5. Embeddings, search, and long-term memory

Use an embedding model, not the dialogue model, for lore and quest retrieval. Qwen3 Embedding has small variants suitable for a local index. A compact vector store can retrieve character facts, port lore, or item descriptions before the dialogue model answers.

For this POC, a simple JSON memory file and keyword lookup are preferable initially. Add embeddings only as a separate benchmark module so retrieval quality can be measured independently.

### 6. Image generation and game assets

Image generation is a different model family from language/coding. On a 16 GB M1 Pro, small Stable Diffusion-family or Apple-optimized MLX image models are more realistic than large high-resolution workflows. Generate concept art offline and keep the playable game dependency-free; do not put an image generator in the frame-time loop.

## What I would actually test on this Mac

### Tier A — realistic first run

1. **Qwen3 4B Instruct** — general local agent/NPC baseline.
2. **Phi-4-mini-reasoning 3.8B** — compact reasoning and code baseline.
3. **Gemma 4 E4B** — multimodal game/UI baseline.
4. **SmolLM3 3B** — smallest serious reasoning baseline.

### Tier B — quality step-up

5. **Qwen3 8B** — likely strongest practical local coding candidate in this size range.
6. **Gemma 4 12B** — possible at Q4 with short context, but expect slower operation and less headroom.

### Tier C — specialized or external controls

7. **Nemotron mini 4B** — NPC/game-agent lane, after Mac-format validation.
8. **Devstral Small / Qwen3-Coder** — hosted or larger-memory coding controls, not first-run M1 defaults.
9. **GLM-5.3-Flash** — stress test only. Our measured Colibrì smoke started successfully, but 8 tokens took 193.6 seconds (0.041 tok/s) with 3,616 expert misses; it is not a practical 16 GB local model for an agent loop. See the [recorded result](results/glm-5.3-flash-colibri-2026-09-19/metadata.json).

## Runtime choices

### MLX / MLX-LM

The natural Apple-Silicon path. MLX is designed for unified memory and Metal, and MLX-LM provides loading, quantization, generation, and fine-tuning tools. Prefer this when a model has a maintained MLX conversion.

### llama.cpp / GGUF

The broadest compatibility path. llama.cpp treats Apple Silicon as a first-class target with Metal and supports multiple quantization levels. Prefer a well-tested GGUF when MLX conversion is unavailable.

### Ollama or LM Studio

Good user-facing packaging and OpenAI-compatible local APIs. They are convenient for switching models, but the benchmark must record the underlying model, quantization, context, runtime version, and prompt—not just “Ollama.”

### Colibrì

Keep Colibrì as the special GLM experiment and benchmark runtime. Do not assume a model that works in Ollama or llama.cpp will work in Colibrì without a supported architecture and container format.

## Bottom line

For building Tide & Tally locally, start with **Qwen3 4B**. For a stronger coding run, test **Qwen3 8B**. For multimodal game/UI understanding, test **Gemma 4 E4B**. For a genuinely gaming-oriented NPC experiment, test **Nemotron mini 4B**, but treat NVIDIA ACE compatibility on a Mac as an open engineering question. Use **Phi-4-mini-reasoning** and **SmolLM3 3B** as compact baselines.

The most useful architecture is likely a small local model plus deterministic game code, not a giant model controlling every rule. Let JavaScript own prices, inventory, turns, quests, and validation; let the model propose dialogue, explanations, or bounded actions that the game validates.

## Primary references

- [Qwen3 concepts and capabilities](https://github.com/QwenLM/Qwen3/blob/main/docs/source/getting_started/concepts.md)
- [Gemma 4 model card](https://ai.google.dev/gemma/docs/core/model_card_4)
- [Gemma 4 deployment and memory guidance](https://ai.google.dev/gemma/docs/core)
- [Phi-4 Mini technical report](https://www.microsoft.com/en-us/research/?p=1148880)
- [SmolLM3 research blog](https://huggingface.co/blog/smollm3)
- [MLX for Apple Silicon](https://mlx-framework.org/)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [NVIDIA ACE for Games](https://developer.nvidia.com/ace-for-games)
- [NVIDIA ACE gaming NPC sample](https://docs.nvidia.com/ace/ace-agent/4.1/sample-bots/gaming-npc-bot.html)
- [Mistral Devstral](https://mistral.ai/news/devstral/)
- [Ollama model library](https://ollama.com/library)
