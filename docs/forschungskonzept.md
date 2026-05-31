# Forschungsvortrag Sparks University of Applied Sciences

## XAMA: Explainable and Auditable Memory for Data-Analytics Agents

**Rahmen:** Vorstellung bisheriger Forschungsarbeiten und/oder eines Konzepts künftiger Forschungsvorhaben, 10 Minuten
**Strategische Linie:** Ein klares künftiges Forschungsprogramm. Bisherige Forschung nur als kurze Glaubwürdigkeitsbrücke.
**Ziel:** Nicht XAMA vollständig erklären, sondern zeigen: Das Programm ist wissenschaftlich fundiert, technisch präzise, anwendungsnah, passgenau zur Professur Data Science und realistisch umsetzbar.

---

# Gesamtstruktur

| Folie | Titel                                                            |                                      Funktion | Zeit |
| ----- | ---------------------------------------------------------------- | --------------------------------------------: | ---: |
| 0     | XAMA: Explainable and Auditable Memory for Data-Analytics Agents |                                    Titelfolie | 0:00 |
| 1     | Von erklärbarer KI zu erklärbarem Agentengedächtnis              |         Publikationsbrücke + kurze Genealogie | 1:15 |
| 2     | Leitfall: Der Data-Analytics-Agent erinnert sich mit             |   Sparks-naher Use Case + Problemverschiebung | 1:30 |
| 3     | XAMA: Drei Säulen für accountable Agent Memory                   |                            Forschungsprogramm | 2:00 |
| 4     | Technische Forschungsfragen                                      |      Je Säule eine technische Forschungsfrage | 2:00 |
| 5     | Fit zur Professur Data Science                                   | Sparks-Fit, Lehre, Transfer, Drittmittel kurz | 2:00 |
| 6     | Erste 12 Monate                                                  |             Umsetzungsplan + Schlussbotschaft | 1:15 |

**Gesamt:** ca. 10 Minuten

---

# Folie 0 — Titelfolie

## XAMA

### Explainable and Auditable Memory for Data-Analytics Agents

**Geplantes Forschungsprogramm für die Professur Data Science**
Sparks University of Applied Sciences
Dr. Paul-Glad Mihai

**Visuelles Leitmotiv:**
Dreieck oder Pipeline:

1. Data-Analytics-Agent
2. Memory / gespeicherte Erfahrungen
3. Accountability / Auditierbarkeit

**Sprecherhinweis:**
Nicht lange auf der Titelfolie bleiben. Direkt in die wissenschaftliche Linie einsteigen.

---

# Folie 1 — Von erklärbarer KI zu erklärbarem Agentengedächtnis

## Kernaussage

Meine bisherige Forschung zu datenintensiven, erklärbaren KI-Systemen führt zu einer neuen Forschungsfrage: Wie erklären wir nicht nur Modellentscheidungen, sondern auch die Erinnerungs- und Abrufentscheidungen von KI-Agenten?

## Folieninhalt

**Kurze Genealogie:**

* Kognitive Architekturen: Intelligentes Handeln braucht Gedächtnis.
* Tulving: Gedächtnis ist nicht nur Faktenlager, sondern Grundlage situierten Handelns über Zeit.
* Moderne KI-Agenten: Persistentes Memory speichert Präferenzen, frühere Entscheidungen, Feedback und Kontext.
* Neue Frage: Wenn Agenten sich erinnern, beeinflusst Memory ihre Empfehlungen.

**Selected prior work:**
Guarnier et al., “Cascaded Multimodal Deep Learning in the Differential Diagnosis, Progression Prediction, and Staging of Alzheimer’s and Frontotemporal Dementia”, medRxiv, 2024. Co-author: Paul Glad Mihai.

## Sprechtext

Meine bisherige Forschung liegt an der Schnittstelle von angewandter KI, heterogenen Datenquellen und Erklärbarkeit. In der genannten Arbeit ging es darum, multimodale Daten für entscheidungsnahe Aufgaben nutzbar zu machen und zugleich sichtbar zu machen, welche Datenmodalitäten Modellentscheidungen prägen.

XAMA führt diese Linie weiter. Die Frage verschiebt sich: Nicht nur das Modell selbst muss erklärbar sein, sondern auch die Daten- und Erinnerungsstrukturen, die seine Empfehlungen prägen.

Die Idee, künstlichen Agenten ein Gedächtnis zu geben, ist nicht neu. In kognitiven Architekturen wie Soar war Gedächtnis schon früh eine Voraussetzung intelligenten Handelns. Tulving hat gezeigt, dass episodisches Gedächtnis nicht einfach ein Archiv ist, sondern Handeln über Zeit ermöglicht. Moderne KI-Agenten bekommen nun genau solche persistenten Gedächtnissysteme.

Damit entsteht eine neue angewandte KI-Frage: Wie kontrollieren, erklären und auditieren wir dieses Gedächtnis, wenn es reale Entscheidungen beeinflusst?

---

# Folie 2 — Leitfall: Der Data-Analytics-Agent erinnert sich mit

## Kernaussage

In datengetriebenen Kommunikationsprozessen ist Agent Memory keine Komfortfunktion, sondern eine zweite Entscheidungsebene.

## Folieninhalt

**Leitfall:**
Ein Data-Analytics-Agent unterstützt ein Marketing- oder Kommunikationsteam.

Er analysiert:

* Kampagnenmetriken
* Zielgruppenreaktionen
* Conversion-Daten
* frühere Briefings
* A/B-Tests
* Performance-Historien

Er speichert daraus:

* wiederverwendbare Erkenntnisse
* Zielgruppenannahmen
* Kanal- und Messaging-Erfahrungen
* frühere Entscheidungen und Feedback

Er nutzt dieses Memory später für Empfehlungen:

* Welche Zielgruppe priorisieren?
* Welche Botschaft testen?
* Welcher Kanal performt historisch besser?
* Welche Annahmen gelten noch?

## Sprechtext

Stellen Sie sich einen Data-Analytics-Agenten in einer Agentur oder Marketingabteilung vor. Er analysiert Kampagnendaten, lernt aus A/B-Tests, speichert Zielgruppen- und Performance-Erkenntnisse und unterstützt das Team bei der nächsten Budget- oder Messaging-Entscheidung.

Genau hier wird Memory kritisch. Der Agent gibt eine Empfehlung nicht nur auf Basis des aktuellen Prompts oder eines Modells, sondern auch auf Basis dessen, woran er sich erinnert.

Wenn dieser Agent frühere Kampagnenerfahrungen speichert und später für neue Empfehlungen nutzt, beeinflusst Memory Budget, Botschaft und Strategie. Dann muss erklärbar sein, welche Erinnerung warum genutzt wurde.

Die zentrale These lautet deshalb: Agent Memory ist in datengetriebenen Kommunikationsprozessen keine Komfortfunktion, sondern eine zweite Entscheidungsebene. XAMA macht diese Ebene erklärbar und auditierbar.

---

# Folie 3 — XAMA: Drei Säulen für accountable Agent Memory

## Kernaussage

XAMA ist ein angewandtes Forschungsprogramm für verantwortbare Data-Analytics-Agenten. Es untersucht Retrieval, Lifecycle und Evaluation von Agent Memory.

## Folieninhalt

## 1. Explainable Memory Retrieval

**Leitfrage:** Warum erinnert sich der Agent an genau diese Kampagnenerfahrung?

Methodencluster:

* Shapley-basierte Quellenattribution
* graphbasierte Pfaderklärungen
* Retrieval-Scoring
* Faithfulness-Analyse

## 2. Responsible Memory Lifecycle

**Leitfrage:** Was darf der Agent speichern, aktualisieren oder vergessen?

Methodencluster:

* Write-Gating
* Validierung vor Konsolidierung
* Memory-Poisoning-Abwehr
* technische Löschung und Forgetting Correctness

## 3. Evaluation & Benchmarking

**Leitfrage:** Wie messen wir, ob Erinnerungen und Erklärungen belastbar sind?

Methodencluster:

* XAMA-Bench
* Erklärungsstabilität
* Logging-Vollständigkeit
* Bias-Propagation
* Auditierbarkeit für menschliche Aufsicht

## Sprechtext

XAMA besteht aus drei gleich starken Säulen.

Die erste Säule ist Explainable Memory Retrieval. Hier geht es um die Frage: Warum erinnert sich der Agent an genau diese Kampagnenerfahrung und nicht an eine andere? Technisch geht es um Attributionsverfahren, graphbasierte Erklärungen und Retrieval-Scoring.

Die zweite Säule ist Responsible Memory Lifecycle. Hier geht es nicht nur darum, was ein Agent abruft, sondern was er überhaupt speichern, konsolidieren, überschreiben oder vergessen darf. Das umfasst Write-Gating, Validierungsmechanismen, Memory-Poisoning-Abwehr und technische Löschbarkeit.

Die dritte Säule ist Evaluation & Benchmarking. Denn bestehende Agent-Memory-Systeme werden oft auf Abrufleistung geprüft, aber nicht systematisch darauf, ob ihre Erklärungen stabil, vollständig und auditierbar sind. Dafür soll XAMA-Bench entstehen.

Der Leitbegriff ist Accountability: Ein Data-Analytics-Agent soll nicht nur plausible Empfehlungen geben, sondern nachvollziehbar machen, auf welchen gespeicherten Erfahrungen, Daten und Annahmen diese Empfehlungen beruhen.

---

# Folie 4 — Technische Forschungsfragen

## Kernaussage

Jede XAMA-Säule mündet in eine präzise technische Forschungsfrage mit direkter Anwendung auf Data-Analytics-Agenten.

## Folieninhalt

## Forschungsfrage 1 — Explainable Memory Retrieval

Wie lassen sich Shapley-basierte und graphbasierte Attributionsverfahren auf Multi-Turn Agent Memory übertragen, ohne post-hoc-rationalisierte Erklärungen zu erzeugen?

**Im Leitfall:**
Welche früheren Kampagnen, A/B-Tests oder Zielgruppenannahmen haben die aktuelle Empfehlung tatsächlich beeinflusst?

---

## Forschungsfrage 2 — Responsible Memory Lifecycle

Wie müssen Write-Gating, Validierung und Forgetting-Mechanismen gestaltet sein, um Memory Poisoning, Bias-Propagation und Scheinkonsolidierung zu reduzieren?

**Im Leitfall:**
Was darf der Agent aus früheren Kampagnen dauerhaft lernen — und was muss er korrigieren oder löschen?

---

## Forschungsfrage 3 — Evaluation & Benchmarking

Welche Metriken messen Faithfulness, Logging-Vollständigkeit, Erklärungsstabilität und Forgetting Correctness in agentischen Memory-Systemen?

**Im Leitfall:**
Können Menschen die Agentenempfehlung prüfen und auditieren?

## Sprechtext

Die drei Säulen werden über drei technische Forschungsfragen konkret.

Erstens: Explainable Memory Retrieval. Die technische Frage ist, ob sich Shapley-basierte und graphbasierte Attributionsverfahren auf Multi-Turn Agent Memory übertragen lassen, ohne dass der Agent im Nachhinein nur plausibel klingende Begründungen erzeugt. Im Data-Analytics-Leitfall heißt das: Welche früheren Kampagnen oder A/B-Tests haben die Empfehlung wirklich beeinflusst?

Zweitens: Responsible Memory Lifecycle. Hier geht es um Write-Gating, Validierung und Forgetting. Ein Agent darf nicht jede Beobachtung dauerhaft speichern und als Wahrheit behandeln. Gerade in Kommunikationsdaten können verzerrte Zielgruppenannahmen, temporäre Kampagneneffekte oder fehlerhafte Messungen sonst langfristig weiterwirken.

Drittens: Evaluation & Benchmarking. Die zentrale Frage ist, welche Metriken notwendig sind, um Faithfulness, Logging-Vollständigkeit, Erklärungsstabilität und Forgetting Correctness messbar zu machen. XAMA-Bench soll genau diese Lücke adressieren.

---

# Folie 5 — Fit zur Professur Data Science

## Kernaussage

XAMA ist ein Forschungsanker für die Professur Data Science: methodisch präzise, anwendungsnah und direkt lehr- und transferfähig.

## Folieninhalt

## Fachlicher Fit

* Data-Analytics-Agenten arbeiten mit prozessgenerierten Daten.
* Kampagnenmetriken, Zielgruppenreaktionen und Entscheidungslogs sind typische Data-Science-Objekte im Kommunikationsumfeld.
* Memory macht diese Daten über Zeit handlungsrelevant.

## Methodischer Fit

XAMA verbindet:

* Datenqualität
* Explainable AI
* Evaluation
* Audit Trails
* Dateninfrastruktur
* Prompting und agentische Systeme

## Lehr-Forschungs-Fit

Studierende können:

* Data-Analytics-Agenten bauen
* Memory-Retrieval evaluieren
* Bias-Propagation analysieren
* Audit-Logs interpretieren
* XAMA-Bench-Prototypen testen

## Transfer- und Drittmittel-Fit

Anschlussfähig an anwendungsorientierte Förderlinien und Praxispartner aus Medien, Kommunikation und Marketing.

## Sprechtext

Für die Professur Data Science bietet XAMA einen klaren Forschungsanker. Es verbindet wissenschaftliche Datenanalyse, prozessgenerierte Daten, KI-gestützte Entscheidungsunterstützung und verantwortbare Dateninfrastruktur im Kommunikations- und Medienkontext.

Der fachliche Fit liegt darin, dass Data-Analytics-Agenten genau mit den Daten arbeiten, die für Medien- und Kommunikationsprozesse zentral sind: Kampagnenmetriken, Zielgruppenreaktionen, Performance-Daten und Entscheidungslogs.

Der methodische Fit liegt in der Verbindung von Datenqualität, Explainable AI, Evaluation, Audit Trails und agentischen Systemen.

Und der Lehr-Forschungs-Fit ist unmittelbar: Studierende können solche Agenten in Projekten bauen, deren Memory-Retrieval evaluieren, Bias-Propagation untersuchen und XAMA-Bench-Prototypen testen.

Drittmittel würde ich dabei projektförmig denken: Ein Praxispartner bringt einen realen Data-Analytics-Agenten oder Datensatz ein; die Professur entwickelt darauf Methoden für erklärbares Retrieval, Lifecycle-Governance und Evaluation.

Regulatorisch wird diese Frage durch den EU AI Act zusätzlich relevant, etwa über Logging, Transparenz und menschliche Aufsicht. Mein Hauptargument ist aber breiter: Data-Analytics-Agenten brauchen Accountability, weil sie datenbasierte Entscheidungen in Organisationen beeinflussen.

---

# Folie 6 — Erste 12 Monate

## Kernaussage

XAMA ist kein abstraktes Langfristprogramm, sondern lässt sich in den ersten zwölf Monaten in konkrete Forschungs-, Lehr- und Transferaktivitäten übersetzen.

## Folieninhalt

## Monat 1–3

**XAMA-Spezifikation und Use-Case-Design**

* Data-Analytics-Agent-Leitfall definieren
* Memory-Lifecycle modellieren
* technische Baseline auswählen
* mögliche Praxispartner identifizieren

## Monat 4–6

**Prototyp: Explainable Memory Retrieval**

* Retrieval-Attribution implementieren
* erste Audit-Logs definieren
* Kampagnen- oder Simulationsdaten nutzen

## Monat 7–9

**XAMA-Bench v0.1**

* Metriken für Faithfulness, Logging und Erklärungsstabilität
* erste studentische Projektarbeiten oder Abschlussarbeitsthemen

## Monat 10–12

**Transfer und Publikation**

* Workshop-Paper oder angewandter Forschungsbeitrag
* Drittmittel-Skizze mit Praxispartner
* Integration in Data-Science-Lehre

## Schlussbotschaft

**XAMA macht sichtbar, wie Data-Analytics-Agenten erinnern — und wie diese Erinnerungen erklärbar, auditierbar und verantwortbar werden.**

## Sprechtext

In den ersten zwölf Monaten würde ich XAMA in vier Schritten aufbauen.

Zunächst wird der Data-Analytics-Leitfall präzisiert: Welche Daten nutzt der Agent, was speichert er, wann ruft er Erinnerungen ab, und an welchen Punkten entstehen Accountability-Risiken?

Im zweiten Schritt entsteht ein erster Prototyp für Explainable Memory Retrieval: also ein System, das nicht nur Empfehlungen ausgibt, sondern dokumentiert, welche gespeicherten Erfahrungen daran beteiligt waren.

Im dritten Schritt würde ich XAMA-Bench v0.1 entwickeln: zunächst mit Metriken für Faithfulness, Logging-Vollständigkeit und Erklärungsstabilität. Das ist gleichzeitig sehr gut in studentische Projekt- und Abschlussarbeiten integrierbar.

Im vierten Schritt folgt die Transfer- und Publikationslogik: ein Workshop-Paper, eine Drittmittel-Skizze und die Integration in die Data-Science-Lehre.

Die Schlussbotschaft ist: XAMA macht sichtbar, wie Data-Analytics-Agenten erinnern — und wie diese Erinnerungen erklärbar, auditierbar und verantwortbar werden.

---

# Gekürzte Kernthese für den Vortrag

Agent Memory ist in datengetriebenen Kommunikationsprozessen keine Komfortfunktion, sondern eine zweite Entscheidungsebene. XAMA untersucht, wie Data-Analytics-Agenten Erinnerungen nutzen, um Entscheidungen zu unterstützen — und wie diese Erinnerungsprozesse erklärbar, auditierbar und verantwortbar gestaltet werden können.

---

# Was aus dem alten Outline gestrichen wird

* Klinische Validierung als eigener Anwendungsfall
* Charité / Medical-AI-Partnerlogik
* große Berliner Ökosystem-Folie
* detaillierte Drittmittelbeträge und Förderkataloge
* breite institutionelle Behauptung, Sparks insgesamt strategisch zu profilieren
* lange Wettbewerbsanalyse deutscher FHs
* ausführliche EU-AI-Act-Dramaturgie
* überlange Genealogie mit vielen kognitionswissenschaftlichen Details

---

# Was erhalten bleibt

* XAMA als klares Forschungsprogramm
* drei gleich starke Säulen
* technische Forschungsfragen
* Agent Memory als aktive Entscheidungskomponente
* Explainability, Auditierbarkeit und Accountability
* kurzer EU-AI-Act-Verweis
* Lehre-Forschung-Transfer
* 12-Monats-Umsetzungsplan

---

# Vortragsregel

Pro Folie genau eine Hauptbotschaft.

Besonders kritisch:

* Folie 1 darf keine CV-Folie werden.
* Folie 3 darf keine Methoden-Enzyklopädie werden.
* Folie 4 darf technisch sein, muss aber immer zum Data-Analytics-Agenten zurückführen.
* Folie 5 darf Sparks-Fit zeigen, aber XAMA nicht als Programm für die gesamte Hochschule überverkaufen.
* Folie 6 muss umsetzungsreif wirken, nicht überambitioniert.

