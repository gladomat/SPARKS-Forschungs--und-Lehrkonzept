# SPARKS Lehrkonzept Presentation

A presentation app for a Data Science MIND module teaching concept at SPARKS University of Applied Sciences. The app presents the module concept to a faculty committee in a 10-minute talk.

## Language

### Institution & Module

**SPARKS:**
The university — SPARKS University of Applied Sciences, Brands & Communication. A Swiss higher education institution focused on design, communication, and applied sciences.
_Avoid_: school, college

**MIND Module:**
A mandatory cross-program module taken by students from all three **Programs**. MIND is the module category — it means every program shares this module.
_Avoid_: elective, course, class

**Program:**
One of three degree tracks at SPARKS: Design & Arts, Copy & Story, or Media & Data. Students arrive from different programs with different skill levels.
_Avoid_: major, track, department

**ECTS:**
European Credit Transfer System. This module is 6 ECTS, corresponding to ~150 hours of total student workload.

### Pedagogical Design

**Competency Cluster:**
A grouping of related learning outcomes. The module has three: Cluster A (Foundations of Data Reasoning), Cluster B (Statistical Reading & Analysis), Cluster C (Algorithmic Systems & Applied Judgment). Progressive — A builds toward B builds toward C.
_Avoid_: topic, unit, chapter

**Learning Path:**
One of two differentiated routes through the module. The Communication & Design Path (low-code, interpret/critique) and the Media & Performance Path (notebook-based, reproduce/extend). Both paths share the same dataset, research question, and evidence standards.
_Avoid_: track (ambiguous with Program), level, tier

**Running Case:**
A single campaign performance dataset used across all five weeks. Contains audience segments, creative variants, engagement metrics, and a targeting component. The case provides continuity — students see the same data evolve through EDA, statistics, modeling, and reflection.
_Avoid_: project, assignment, exercise

**Self-Study Loop:**
The four-part weekly rhythm: Input (microlearning) → Guided Practice (worked examples) → Reflection → Mastery Checkpoint. Repeats every week. Based on Flipped Classroom 2.0.
_Avoid_: homework, reading

**Data Science Studio:**
The two-day on-site intensive in Week 4. Day 1: Explore & Probe (analysis + model building). Day 2: Critique & Translate (peer review + pitch). The climax of the module.
_Avoid_: workshop, lab, hackathon

### Assessment

**Two-Lane Assessment:**
The assessment model splitting work into Assured and Integrated lanes. Based on the Sydney two-lane model and Perkins et al. (2024) AI Assessment Scale.
_Avoid_: dual-track assessment

**Assured Lane:**
In-person, no AI. The on-site pitch at the end of Studio Day 2. Verifies personal competence.
_Avoid_: closed-book, proctored

**Integrated Lane:**
Digital submissions where AI is permitted and its use is documented. Three of the four **Performance Records** are Integrated.
_Avoid_: open-book, take-home

**Performance Record:**
A continuous assessment artifact. The module has four: EDA Evidence Memo (W2), Statistical Reasoning Brief (W3), On-Site Pitch (W4, Assured), Reflection Portfolio (W5, lighter scope).
_Avoid_: exam, test, assignment, deliverable

### Presentation App

**Slide:**
One screen of the presentation. 10 total. Each has a component file, sparse visual content, and plain-text speaker notes.

**Section:**
A named group of slides in the sidebar navigation. Three sections: Positioning (slides 2–4), Didactic Design (slides 5–7), Assessment (slides 8–9). Title (slide 1) and closing (slide 10) are outside sections.
_Avoid_: chapter, part

**Presenter Mode:**
A dual-window setup. The audience window shows the clean slide. The presenter window (`?presenter`) shows the current slide, speaker notes, and next slide preview. Both sync via BroadcastChannel.
_Avoid_: speaker view, notes mode

**Shimmer Transition:**
A slide transition where the outgoing slide is swept by a moving band of sparkling highlights. Triggered exclusively by sidebar clicks that cross sections. Signals a deliberate structural jump.

## Example Dialogue

> **Dev:** "The user clicked 'Self-Study Architecture' in the sidebar while on the Competency Clusters slide. What transition do I play?"
>
> **Domain expert:** "Those are in different Sections — Competency Clusters is Positioning, Self-Study is Didactic Design. Sidebar click crossing sections means shimmer transition."
>
> **Dev:** "And if they press the right arrow from Competency Clusters to Five-Week Roadmap?"
>
> **Domain expert:** "That's also a section crossing, but via arrow key, not sidebar. Vertical slide — new slide comes up from the bottom."
>
> **Dev:** "What about right arrow from Five-Week Roadmap to Self-Study Architecture?"
>
> **Domain expert:** "Same section — both Didactic Design. Horizontal slide from the right."
