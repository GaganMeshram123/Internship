## Interaction Data: New Structure and Backend Storage

This document describes the canonical interaction data format used by the slides, how the data is sent to our backend, and how it is stored. Use this as the single source of truth when creating or updating interactions.

---

### 1) End-to-end flow (high level)

- On each slide, interactions are collected in-memory and saved on unmount via `SlideComponentWrapper`.
- The client calls `POST /api/user-interactions` with a single-slide payload (see below).
- The API route validates auth, enriches the payload with `studentId` (from token if not provided), and forwards to the Amplify REST API (`studentApi → module-interactions`).
- The Lambda handler (`amplify/functions/studentApiFunction/handler.ts`) persists the document to MongoDB in the `module_interactions` collection.

---

### 2) API payload (per slide)

```json
{
  "moduleId": "<module-id>",
  "submoduleId": "<submodule-id>",
  "slideId": "<slide-id>",
  "slideTitle": "<slide-title>",
  "timeSpent": 12345,
  "interactions": { "<interactionId>": { /* InteractionResponse */ } },
  "timestamp": "2025-08-12T10:22:33.456Z",
  "studentId": "<cognito-sub>"  
}
```

Notes:
- Quizzes must not provide in-UI retry controls. Offering retries can overwrite earlier attempts within the same slide payload. If multiple attempts are truly required, author the UI to record distinct attempts under the same interaction id using numeric keys, or split into separate interaction ids.

---

### 3) InteractionResponse (new canonical shape)

All interaction responses share a common envelope with `interactionId`, `timestamp`, concept metadata, and a polymorphic `value` based on the question type.

```ts
interface InteractionResponse {
  interactionId: string;
  // Polymorphic value by question type:
  // - mcq: string (selected option id, e.g., "A" | "B" | "C" | "D")
  // - multiselect: string[] (array of selected option ids)
  // - integer: number
  // - matching: { key: string; value: string }[] // list of pairs
  // - learning interactions (no question): number (counter)
  value: string | number | string[] | { key: string; value: string }[];

  isCorrect?: boolean;           // For judging interactions
  timestamp: number;             // ms epoch
  conceptId?: string;
  conceptName?: string;
  conceptDescription?: string;
  studentId?: string;            // Optional passthrough

  // Question metadata
  question?: InteractionQuestionMeta;
}

type QuestionType = 'mcq' | 'multiselect' | 'integer' | 'matching';

interface InteractionQuestionMeta {
  type: QuestionType;
  question: string;              // Required question text
  options?: string[];            // MCQ/Multiselect options (optional)
  matching?: {                   // Matching question lists
    left?: string[];             // Items to match (left side)
    right?: string[];            // Target labels (e.g., ["scalar", "vector"])
  };
}
```

Key guarantees:
- The `value` type must match `question.type` if `question` is present.
- For learning (non-judging) interactions without a `question`, `value` is typically a numeric counter (e.g., click count).

---

### 4) Canonical examples

#### a) Learning (non-graded)
```json
{
  "interactionId": "vector-components-interaction",
  "value": 3,
  "timestamp": 1754461600000,
  "conceptId": "vector-components",
  "conceptName": "Vector Components Interactive",
  "conceptDescription": "User adjusted magnitude/angle 3 times during exploration"
}
```
Notes:
- Learning interactions do not include a `question` block.
- `value` is a numeric counter representing engagement events (e.g., clicks, drags, slider changes). If you need richer semantics, summarize briefly in `conceptDescription`.

#### b) Matching (Scalars vs Vectors drag-and-drop)
```json
{
  "interactionId": "scalars-vectors-drag-drop",
  "value": [
    { "key": "5 meters", "value": "scalar" },
    { "key": "5 m/s East", "value": "vector" },
    { "key": "10 seconds", "value": "scalar" },
    { "key": "25 degrees Celsius", "value": "scalar" },
    { "key": "30 N downward", "value": "vector" },
    { "key": "2 kg", "value": "scalar" },
    { "key": "15 m/s² upward", "value": "vector" },
    { "key": "position (3,4)", "value": "vector" }
  ],
  "isCorrect": true,
  "timestamp": 1754461662987,
  "conceptId": "scalars-vectors-interaction",
  "conceptName": "Scalars vs Vectors Drag and Drop",
  "conceptDescription": "Attempt #1: 100.0% accuracy (8/8)",
  "question": {
    "type": "matching",
    "question": "Match each quantity to Scalar or Vector",
    "matching": {
      "left": ["5 meters", "5 m/s East", "10 seconds", "25 degrees Celsius", "30 N downward", "2 kg", "15 m/s² upward", "position (3,4)"],
      "right": ["scalar", "vector"]
    }
  }
}
```

#### c) MCQ (Vector Operations)
```json
{
  "interactionId": "vector-operations-quiz",
  "value": "B",          
  "isCorrect": true,
  "timestamp": 1754462225376,
  "conceptId": "vector-operations-1d",
  "conceptName": "Vector Operations in 1D Quiz",
  "conceptDescription": "Question 1: relative velocity",
  "question": {
    "type": "mcq",
    "question": "Car A moves East at 60 km/hr, Car B moves East at 35 km/hr. What is Car A's velocity relative to Car B?"
  }
}
```

#### d) Integer (Split Dual: Distance and Displacement)
Distance
```json
{
  "interactionId": "distance-quiz",
  "value": 8,
  "isCorrect": true,
  "timestamp": 1754461933265,
  "conceptId": "distance-calculation",
  "conceptName": "Distance Calculation Quiz",
  "conceptDescription": "Total distance for 5m East then 3m West",
  "question": {
    "type": "integer",
    "question": "A person walks 5m East, then 3m West. What is the total distance traveled? (in m)"
  }
}
```
Displacement
```json
{
  "interactionId": "displacement-quiz",
  "value": 2,
  "isCorrect": true,
  "timestamp": 1754461933265,
  "conceptId": "displacement-calculation",
  "conceptName": "Displacement Calculation Quiz",
  "conceptDescription": "Net displacement for 5m East then 3m West",
  "question": {
    "type": "integer",
    "question": "A person walks 5m East, then 3m West. What is the final displacement? (in m; East positive)"
  }
}
```

#### e) Multiselect (when used)
```json
{
  "interactionId": "example-multiselect",
  "value": ["A", "C"],
  "isCorrect": true,
  "timestamp": 1754462500000,
  "question": {
    "type": "multiselect",
    "question": "Select all correct statements about ...",
    "options": ["A", "B", "C", "D"]
  }
}
```

---

### 5) Backend storage

- API route: `pages/api/user-interactions.ts`
  - Validates auth (ID token from header or session)
  - Derives `studentId` from token if `studentId` not provided
  - Forwards to Amplify API `studentApi` with body:
    ```json
    {
      "studentId": "<sub>",
      "moduleId": "...",
      "submoduleId": "...",
      "slideId": "...",
      "slideTitle": "...",
      "timeSpent": 12345,
      "interactions": { /* as above */ },
      "timestamp": "<ISO>"
    }
    ```

- Lambda handler: `amplify/functions/studentApiFunction/handler.ts` (route `module-interactions`)
  - Validates required fields
  - Inserts into MongoDB collection `module_interactions` a document like:
    ```json
    {
      "studentId": "<sub>",
      "moduleId": "...",
      "submoduleId": "...",
      "slideId": "...",
      "slideTitle": "...",
      "timeSpent": 12345,
      "interactions": { /* as sent */ },
      "createdAt": "<ISO>"
    }
    ```

Storage notes
- The backend does not mutate `interactions`; it stores exactly what the client sends.
- If you send multiple attempts under the same interaction, use numeric keys ("0", "1", "2", …) inside that interaction.

---

### 6) Authoring guidance

- Always include `question` metadata for judging interactions so downstream analytics can interpret `value`:
  - mcq → `value: string` (option id)
  - multiselect → `value: string[]`
  - integer → `value: number`
  - matching → `value: {key, value}[]` and `question.matching.left/right`
- Learning interactions should not attach `question`. Use a numeric `value` counter; if extra context is useful, summarize briefly in `conceptDescription`.
- Include concept metadata (`conceptId`, `conceptName`, `conceptDescription`) when meaningful.
- Avoid stringifying rich payloads inside `value`. The `value` should be one of the canonical types above.

---

### 7) Where this is implemented

- Type definitions and helpers:
  - `pages/modules/common-components/concept.tsx` (Interaction types, `InteractionResponse`, question types)
  - `pages/modules/common-components/SlideUtils.tsx` (save helper, `createInteractionResponse`)
- Persistence trigger:
  - `pages/modules/common-components/SlideComponentWrapper.tsx` (collects interactions, saves on unmount)
- API + backend:
  - `pages/api/user-interactions.ts` (auth, forward)
  - `amplify/functions/studentApiFunction/handler.ts` (Mongo insert)

---

### 8) Migration notes (old → new)

- Old: stringified JSON blobs in `value` (e.g., detailed quiz payloads). New: structured typed values + `question` metadata.
- Dual-question interactions (e.g., distance+displacement) are now split into two interactions: `distance-quiz` and `displacement-quiz` with `integer` values.
- Drag-and-drop classification is now the `matching` type with explicit pairs and matching lists.

---

If you need examples or have questions about a new interaction type, add them here to keep this document authoritative.

### 9) Learning interactions: handling and implementation

- Use `type: 'learning'` with a clear `description`; do not attach a `question` block.
- The recorded `value` is a numeric counter of engagement events (clicks, drags, slider changes). Prefer counters to keep payloads small and comparable.
- The UI `TrackedInteraction` wrapper auto-increments this counter for learning interactions and records an `InteractionResponse` with concept metadata and a timestamp.
- Interactions for a slide are aggregated and sent once on unmount by `SlideComponentWrapper` to `POST /api/user-interactions`; the Amplify function stores them in MongoDB unchanged.
- If you need extra context, summarize it in `conceptDescription` rather than sending complex objects in `value`.
- For frequent events (drag/slider), throttle increments or aggregate by sending a single increment at drag-end.

Minimal capture example for a slider change:

```ts
// Inside a component with access to handleInteractionComplete
onSliderChange={(newValue) => {
  handleInteractionComplete({
    interactionId: 'vector-components-interaction',
    value: 1, // increment counter
    timestamp: Date.now(),
    conceptId: 'vector-components',
    conceptName: 'Vector Components Interactive',
    conceptDescription: 'Adjusted magnitude'
  });
}}
```

Implementation references:
- `pages/modules/common-components/concept.tsx` → `TrackedInteraction` (auto-increment logic for learning interactions)
- `pages/modules/common-components/SlideComponentWrapper.tsx` → collection and save-on-unmount
- `pages/api/user-interactions.ts` and `amplify/functions/studentApiFunction/handler.ts` → persistence pipeline 