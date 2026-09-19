# Colibrì / GLM-5.3 run plan

This document records the machine-specific path for the benchmark. It is intentionally separate from the model-neutral benchmark protocol.

## Verified machine state

- MacBook Pro, Apple M1 Pro, 16 GB unified memory
- T9 mounted at `/Volumes/T9`; the latest check reports approximately 1.5 TiB available
- A partial `GLM-5.3-Flash` checkpoint exists at `/Volumes/T9/loom-ai-models/models/GLM-5.3-Flash`
- The checkpoint currently contains 51 of 62 safetensor shards (`model-00001` through `model-00051`) and is about 282 GB on disk
- Shards `model-00052` through `model-00062` are missing; the checkpoint is not verified as complete or byte-identical to its upstream source
- This is `GLM-5.3-Flash`, not the full `GLM-5.3` checkpoint. No full `GLM-5.3` checkpoint is currently verified on the machine.
- No `coli` or `colibri` executable is currently on `PATH`
- Python 3.9.6 is available, but `mlx`, `torch`, `transformers`, `vllm`, `sglang`, and `ktransformers` are not installed in the checked interpreter

## Gates before inference

Do not start a benchmark run until all gates pass:

1. **Runtime gate:** build or install the Colibrì binary for Apple Silicon and verify `coli doctor`.
2. **Model gate:** finish or replace the checkpoint, then confirm every required shard and valid metadata.
3. **Integrity gate:** verify the model against an authoritative upstream manifest or a trusted copy.
4. **Capacity gate:** confirm sufficient free space for the completed model, working files, and reserve space.
5. **Smoke gate:** run a tiny prompt and record time to first token before connecting an agent.
6. **Safety gate:** keep the server bound to `127.0.0.1`; use an API key before exposing it to another device.

## Expected experiment order

1. Run the dependency-free Tide & Tally smoke checks without a model.
2. Run a tiny Colibrì prompt if the runtime and model gates pass.
3. Run Task A from `BENCHMARK_PROTOCOL.md` with a short prompt.
4. Only then attempt Tasks B–D; long agent prompts can be impractical on disk-streaming hardware.
5. Record the result in `results/<model>-<runtime>-<date>/` using the metadata template.

## Model comparison rule

If GLM-5.3 cannot pass the gates or is unusably slow, record that as a valid benchmark result. Do not silently replace it with GLM-5.3-Flash, OLMoE, or a hosted model. Those are separate model/runtime runs.
