# Multiple Choice Questions (MCQ)

This document describes how to define MCQ interactions in the interaction schema and how to implement them in the UI.

## Interaction Schema

Use the `question` object with `type: 'mcq'`. The `options` field must be a non-empty array of strings.

Example interaction in a slide's `slideInteractions` array:

```ts
{
  id: 'velocity-quiz',
  conceptId: 'velocity-understanding',
  conceptName: 'Velocity Quiz',
  type: 'judging',
  description: 'Testing understanding of velocity concepts',
  question: {
    type: 'mcq',
    question: 'Given displacement and time, what is the average velocity?',
    options: [
      'displacement ÷ time',
      'time ÷ displacement',
      'displacement × time',
      'displacement − time'
    ]
  }
}
```

Required fields:
- `id`: unique interaction id within the slide
- `type`: must be `judging` for evaluative questions
- `question.type`: must be `'mcq'`
- `question.question`: string prompt
- `question.options`: non-empty string array

## Capturing Interaction Responses

When the learner selects an option, capture the interaction with:

```ts
handleInteractionComplete({
  interactionId: 'velocity-quiz',
  value: 'displacement ÷ time', // EXACT selected option text (not id/index)
  isCorrect: true,
  timestamp: Date.now(),
  conceptId: 'velocity-understanding',
  conceptName: 'Velocity Quiz',
  conceptDescription: 'Testing understanding of velocity concepts',
  question: {
    type: 'mcq',
    question: 'Given displacement and time, what is the average velocity?',
    options: [
      'displacement ÷ time',
      'time ÷ displacement',
      'displacement × time',
      'displacement − time'
    ]
  }
});
```

Notes:
- `value` must be the exact selected option text. Do NOT send option letters/ids (e.g., 'A', 'B') or indexes. This ensures analytics and review UIs show the precise learner choice even if options are reordered.
- If your UI renders formatted JSX (e.g., math) and also keeps a plain string, store both and send the plain string as `value` (e.g., `text` for value, `displayText` for UI).
- For multi-select MCQs, send an array of exact option strings in `value`.
- Include the `question` snapshot used for the attempt to aid downstream analytics.

## Caveats and Conventions

- Exact text in value:
  - Always send the exact visible option text string in the `value` field.
  - Example: If the learner clicks “It doubles”, `value` should be `"It doubles"` rather than `"B"` or `1`.

- JSX vs text:
  - When options are rendered with JSX/Math (e.g., subscripts/superscripts), keep a plain string alongside for storage.
  - Convention: `text` (plain string) for storage/telemetry; `displayText` (JSX/ReactNode) for UI.

- Multi-select:
  - For multi-select questions, send `value` as an array of the exact selected option strings, e.g., `['Option A', 'Option D']` or more descriptive strings.

- Integer-like MCQs:
  - If an integer question is presented with discrete buttons (options), treat it as MCQ and send the exact button label as text (e.g., `"62.5 meters"`), not just a numeric id.

- Backwards compatibility:
  - Some legacy slides may send ids/letters. New/updated slides must follow the text-as-value rule.

## Minimal UI Implementation Example

Below is a simple MCQ UI pattern used across slides.

```tsx
import { useState } from 'react';

export function Mcq({
  interaction,
  onComplete
}: {
  interaction: {
    id: string;
    conceptId: string;
    conceptName: string;
    description: string;
    question: { type: 'mcq'; question: string; options: string[] };
  };
  onComplete: (payload: {
    interactionId: string;
    value: string; // EXACT selected option text (not id/index)
    isCorrect?: boolean; // optional if you compute correctness client-side
    timestamp: number;
    conceptId: string;
    conceptName: string;
    conceptDescription: string;
    question: { type: 'mcq'; question: string; options: string[] };
  }) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const hasAnswered = selected !== null;

  const submit = () => {
    if (selected === null) return;
    onComplete({
      interactionId: interaction.id,
      value: interaction.question.options[selected], // send exact option text
      timestamp: Date.now(),
      conceptId: interaction.conceptId,
      conceptName: interaction.conceptName,
      conceptDescription: interaction.description,
      question: interaction.question
    });
  };

  return (
    <div className="space-y-3">
      <p className="font-medium">{interaction.question.question}</p>
      <div className="space-y-2">
        {interaction.question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-full text-left p-3 rounded border ${
              selected === idx ? 'bg-blue-100 border-blue-400' : 'bg-gray-100 border-gray-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        disabled={!hasAnswered}
        onClick={submit}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
```

## Best Practices
- Keep 3–5 options; avoid ambiguous wording.
- Ensure exactly one correct answer for single-answer MCQs.
- Record the `question` snapshot with each submission for auditability.
- Avoid empty `options` arrays; validate before rendering. 