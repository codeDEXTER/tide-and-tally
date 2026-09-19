# Colibrì / GLM-5.3 run plan

This document records the machine-specific path for the benchmark. It is intentionally separate from the model-neutral benchmark protocol.

## Verified machine state

- MacBook Pro, Apple M1 Pro, 16 GB unified memory
- T9 mounted at `/Volumes/T9`; the latest check reports approximately 1.5 TiB available
- The complete raw `GLM-5.3-Flash` checkpoint is present at `/Volumes/T9/loom-ai-models/models/GLM-5.3-Flash`
- It contains all 62 safetensor shards and is about 328.3 GB on disk; Colibrì `doctor --deep` validates the shard sequence, required tensors, index, and internal layouts
- The raw checkpoint is FP8 (`F8_E4M3`) and is not directly runnable by the engine; the resumable int4 conversion is in progress at `/Volumes/T9/loom-ai-models/models/GLM-5.3-Flash-colibri-i4`
- The conversion has completed shard 1 (4.16 GB output in 52 seconds); the remaining 61 shards are still processing
- This is `GLM-5.3-Flash`, not the full `GLM-5.3` checkpoint. No full `GLM-5.3` checkpoint is currently verified on the machine.
- The Colibrì source checkout is `/Users/aashish/apps/Loom/.colibri-src`; the Apple Silicon `glm53` engine is built there
- The usable interpreter is `/Users/aashish/apps/Loom/.venv-loom-ai/bin/python` (Python 3.12 with MLX, PyTorch, safetensors, and transformers); the system Python 3.9 must not be used for Colibrì
- `coli doctor --deep` passes model integrity but reports the 16 GB capacity as constrained; projected operation is CPU/disk-bound with roughly 2% warm-expert residency

## Gates before inference

Do not start a benchmark run until all gates pass:

1. **Runtime gate:** use the Colibrì Apple Silicon engine with the project virtual-environment Python. Passed.
2. **Model gate:** finish the raw checkpoint and confirm every required shard and valid metadata. Passed for the raw checkpoint.
3. **Integrity gate:** run `coli doctor --deep`. Passed for the raw checkpoint.
4. **Conversion gate:** finish the resumable FP8-to-int4 conversion. In progress.
5. **Capacity gate:** retain the T9 free-space reserve and use a conservative RAM/context budget. Storage passes; 16 GB RAM remains a practical constraint.
6. **Smoke gate:** run a tiny prompt on the converted container and record time to first token before connecting an agent. Not yet run.
7. **Safety gate:** keep any server bound to `127.0.0.1`; use an API key before exposing it to another device.

## Evidence from the current machine

The direct raw-checkpoint smoke command was:

```bash
/Users/aashish/apps/Loom/.venv-loom-ai/bin/python \
  /Users/aashish/apps/Loom/.colibri-src/c/coli run \
  --model /Volumes/T9/loom-ai-models/models/GLM-5.3-Flash \
  --ram 12 --ctx 128 --ngen 1 --no-think --policy balanced \
  "Reply with exactly OK."
```

It reached the engine and failed because the source tensor was `F8_E4M3`; this is the expected signal that conversion is required, not a model-quality result. The one-shard conversion then succeeded, producing a 4.16 GB int4 shard in 52 seconds. The full conversion is resumable through `c/tools/convert_glm53.py` and must complete before the first real inference result is scored.

## Expected experiment order

1. Run the dependency-free Tide & Tally smoke checks without a model.
2. Run a tiny Colibrì prompt if the runtime and model gates pass.
3. Run Task A from `BENCHMARK_PROTOCOL.md` with a short prompt.
4. Only then attempt Tasks B–D; long agent prompts can be impractical on disk-streaming hardware.
5. Record the result in `results/<model>-<runtime>-<date>/` using the metadata template.

## Model comparison rule

If GLM-5.3 cannot pass the gates or is unusably slow, record that as a valid benchmark result. Do not silently replace it with GLM-5.3-Flash, OLMoE, or a hosted model. Those are separate model/runtime runs.
