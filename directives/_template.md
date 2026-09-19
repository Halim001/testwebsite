# [Directive Name]

> SOP for [Brief description of what this procedure achieves]

## Goal
Clearly describe the desired business or technical outcome of this directive.

## Inputs
List all required parameters, environment variables, credentials, or source files.
- `INPUT_PARAM_1`: Description of input
- `.env` dependencies: List needed API keys or tokens

## Tools & Execution Scripts
Deterministic scripts in `execution/` used by this directive.
- `execution/example_script.py`: What it does and how to run it.

```bash
python -m execution.example_script --input <value>
```

## Outputs & Deliverables
- **Deliverables**: Final cloud-based outputs (e.g. Google Sheets, Google Slides, webhooks, or database entries).
- **Intermediates**: Any temporary files generated in `.tmp/` (e.g. `.tmp/extracted_data.json`).

## Edge Cases & Self-Annealing Notes
Known failure modes, rate limits, retry strategies, and learnings documented over time.
- *Rate Limits*: Note any vendor API limits or backoff requirements.
- *Format Changes*: Note schema nuances or fallbacks.
- *Learnings*: Update this section whenever a script is modified due to unexpected errors.
