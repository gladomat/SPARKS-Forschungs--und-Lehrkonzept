# Bilingual deck: English Teaching Concept, German Forschungskonzept

The app bundles two ~10-minute talks for one appointment presentation. The **Teaching Concept** part (slides 1–10) is in English; the **Forschungskonzept / XAMA** part (slides 11–17) is in German. We deliberately did *not* unify the language.

## Why

The teaching content was authored in English; the research content was authored in German (`docs/forschungskonzept.md`, including the speaker notes / Sprechtext). We chose source fidelity over deck-wide consistency: the German research text is polished and is what the candidate will actually say, so translating it risked degrading wording for no audience benefit. The two parts are self-contained talks, so the seam is acceptable.

## Consequences

The language switch is intentional — a future reader should **not** "fix" the mismatch by translating one part to match the other. The two top-level nav labels reflect this on purpose: `Teaching Concept` (English) and `Forschungskonzept` (German). If the whole deck ever needs one language, that is a content decision (re-author/translate), not a bug.
