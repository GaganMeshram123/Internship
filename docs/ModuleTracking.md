# Module Interaction Tracking

This document summarizes how to instrument slides and where to find the canonical data format. For the complete interaction data schema and backend flow, see `interactions.md` in the repo root.

## Overview

We track two broad classes of interactions:

1. **Learning interactions**: Engagement without correctness (e.g., clicks, exploration). Typically counted as a numeric value (counter).
2. **Judging interactions**: Questions/exercises with correctness. Use the new typed `value` by question type (mcq, multiselect, integer, matching) and include `question` metadata.

Time spent on each slide is also tracked and sent together with the interactions.

## Implementation Details

### Key Components

1. **Type definitions & helpers**
   - `pages/modules/common-components/concept.tsx`: Interaction interfaces and `InteractionResponse` (new typed values by question type)
   - `pages/modules/common-components/SlideUtils.tsx`: Utilities (save helper, `createInteractionResponse`)
2. **SlideComponentWrapper**
   - Tracks time on slide
   - Collects current slide interactions
   - Saves to backend on unmount via the API route
3. **TrackedInteraction**
   - Handy wrapper for learning interactions
   - For judging interactions, provide the `question` metadata and send a typed `value`

### File Structure

- `concept.tsx`: Interfaces for interactions and question metadata
- `SlideUtils.tsx`: Helpers for saving interactions
- `SlideComponentWrapper.tsx`: Collects and persists on unmount
- `interactions.md`: Canonical schema, examples, and backend storage details (READ THIS FIRST)

## How to Use in Your Slides

### 1. Define Interactions

```tsx
const slideInteractions: Interaction[] = [
  {
    id: 'unique-id',
    conceptId: 'concept-001',
    conceptName: 'Concept Name',
    type: 'learning', // or 'judging'
    description: 'What this interaction evaluates'
  }
];
```

### 2. Track Interactions

```tsx
const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

const handleInteractionComplete = (response: InteractionResponse) => {
  setLocalInteractions(prev => ({
    ...prev,
    [response.interactionId]: response
  }));
};
```

### 3. Wrap Your Slide Content

```tsx
return (
  <SlideComponentWrapper
    slideId="your-slide-id"
    slideTitle="Your Slide Title"
    moduleId="your-module-id"
    submoduleId="your-submodule-id"
    interactions={localInteractions}
  >
    {content}
  </SlideComponentWrapper>
);
```

### Learning interactions (telemetry)

- Use `type: 'learning'` with a clear `description`.
- Do not attach a `question` block.
- Capture meaningful events with a small structured payload or a numeric counter. Prefer counters unless you need richer context.
- Example capture:

```ts
handleInteractionComplete({
  interactionId: 'vector-components-interaction',
  value: 1, // increment counter or send an object if needed
  timestamp: Date.now(),
  conceptId: 'vector-components',
  conceptName: 'Vector Components Interactive',
  conceptDescription: 'User adjusted magnitude slider'
});
```

See `docs/interactions.md` for canonical examples and the full schema. 

## Data Storage & API

- The client posts to `POST /api/user-interactions` (see `interactions.md` for exact payload)
- The API route validates auth, enriches with `studentId` (if not provided), and forwards to Amplify API (`studentApi → module-interactions`)
- Lambda persists the document into MongoDB collection `module_interactions`

## Best Practices

1. Use the typed value per question type
   - mcq → `value: string` (option id)
   - multiselect → `value: string[]`
   - integer → `value: number`
   - matching → `value: { key, value }[]` and include `question.matching.left/right`
2. Always include `question` for judging: Enables consistent analytics
3. Include concept metadata: `conceptId`, `conceptName`, `conceptDescription`
4. Avoid stringified payloads in `value`: Use the canonical types
5. Keep attempts ordered: Use numeric keys ("0", "1", "2", …) when multiple attempts exist for the same interaction

## Migration Reference

- Old payloads used stringified JSON in `value`; new payloads use typed values and `question`
- Dual interactions (e.g., distance & displacement) are split into `distance-quiz` and `displacement-quiz`
- Drag-and-drop classification is now a `matching` interaction

For full details, examples, and canonical structure, see `interactions.md`. 