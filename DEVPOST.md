# Crossroads
**Elevator pitch** — Take a question you are stuck on, read how three people handled a related choice, and write down what you want to ask a real adviser.

**Platform** — Web (Chrome).

[Try Crossroads](https://hackathon-b4455.web.app) · [Public source code](https://github.com/mainkim/crossroads-hybrid)

### Inspiration
“Should I take a semester off?” can mean “Can I afford to stay?” or “Will I lose the one class I love?” Students often arrive at a meeting with the first question when the second would get them a more useful answer.

### What it does
A reader chooses a topic or writes a note. For a semester away, the archive pairs Gates leaving a way back to school, Jobs auditing classes, and Curie working before studying in Paris. Readers choose the detail that matters to them, draft a question and save a next step with a review date. A calendar export carries it beyond this browser.

### How we built it
Historical summaries are curated and kept separate from generated questions. The English web app calls Firebase AI Logic from the question editor. A reader can keep a private note on a compatible device, or permit cloud fallback when the local model is unavailable. Switching on cloud fallback also changes the material sent. Only the public topic, selected record and archive question are eligible for cloud processing. Readers can inspect that material first. App Check protects the cloud route. The interface displays the inference source returned by the SDK, and an editable archive question remains available when generation fails.

### What changed during the hackathon
We brought forward the original Korean app’s topic map, source material, decision notebook concept and particle portrait. We rewrote the reader journey in English and built the hybrid question editor, explicit cloud permission, App Check integration, inference-source display and judge walkthrough. The existing prototype and new code are identified in the repository.

### What judges can check
Compare SDK-reported sources for technical implementation. Follow one decision from note to calendar for design. Compare the opening worry with the specific question a student takes to a registrar for potential impact. To see what makes the hybrid design different, enter a distinctive private detail and enable cloud fallback: the preview drops that detail and retains the selected perspective. A future student pilot would measure whether participants actually ask the question they prepared.

### English demo outline (about two minutes)
0:00 — Enter a real example about taking a semester off.  
0:20 — Compare three sourced records and pick the class worth keeping.  
0:45 — Use a compatible device to generate a private question. Show the actual source.  
1:05 — Use a cloud-fallback test device and show a second real response with its source.  
1:30 — Edit a next step, save the pack and export the reminder.  
1:50 — Reopen the notebook. End on the question the student will take to their adviser.

### Publication gate
Before submission, verify the deployed model routes on supported hardware, insert the live demo URL and public GitHub/GitLab repository URL, and upload the English screen recording publicly to YouTube (under three minutes). Preserve the public test access through judging. Only claim platform routes actually demonstrated. No participant action or service usage figures have been inferred.
