# Integer Questions

This document describes how to define integer (numeric input) interactions and how to implement them in the UI.

## Interaction Schema

Use the `question` object with `type: 'integer'`. Do not include `options` for this type.

Example interaction in a slide's `slideInteractions` array:

```ts
{
  id: 'distance-quiz',
  conceptId: 'distance-calculation',
  conceptName: 'Distance Calculation Quiz',
  type: 'judging',
  description: 'Calculate the total path length (distance)',
  question: {
    type: 'integer',
    question: 'A person walks 5m East, then 3m West. What is the total distance traveled? (in m)'
  }
}
```

Required fields:
- `id`: unique interaction id within the slide
- `type`: must be `judging` for evaluative questions
- `question.type`: must be `'integer'`
- `question.question`: string prompt

## Capturing Interaction Responses

For integer questions, capture the numeric response as a string or number. Include the `question` snapshot.

```ts
handleInteractionComplete({
  interactionId: 'distance-quiz',
  value: '8', // or a number like 8
  isCorrect: true, // set after validation if applicable
  timestamp: Date.now(),
  conceptId: 'distance-calculation',
  conceptName: 'Distance Calculation Quiz',
  conceptDescription: 'Calculate the total path length (distance)',
  question: {
    type: 'integer',
    question: 'A person walks 5m East, then 3m West. What is the total distance traveled? (in m)'
  }
});
```

Notes:
- Always validate and normalize inputs (trim, disallow non-numeric characters where appropriate).
- If units are involved, include them in the prompt and validate only the numeric part.

## Minimal UI Implementation Example

Below is a simple UI for integer input with basic validation.

```tsx
import { useMemo, useState } from 'react';

export function IntegerQuestion({
  interaction,
  onComplete
}: {
  interaction: {
    id: string;
    conceptId: string;
    conceptName: string;
    description: string;
    question: { type: 'integer'; question: string };
  };
  onComplete: (payload: {
    interactionId: string;
    value: string;
    isCorrect?: boolean;
    timestamp: number;
    conceptId: string;
    conceptName: string;
    conceptDescription: string;
    question: { type: 'integer'; question: string };
  }) => void;
}) {
  const [value, setValue] = useState<string>('');

  const isValid = useMemo(() => /^-?\d+$/.test(value.trim()), [value]);

  const submit = () => {
    if (!isValid) return;
    onComplete({
      interactionId: interaction.id,
      value: value.trim(),
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
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        inputMode="numeric"
        className="p-2 border rounded w-full"
        placeholder="Enter an integer"
      />
      {!isValid && value.length > 0 && (
        <p className="text-sm text-red-600">Please enter a valid integer.</p>
      )}
      <button
        disabled={!isValid}
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
- Do not include `options` for integer questions.
- Provide clear unit instructions in the prompt if applicable.
- Consider tolerances for answers when validating numeric responses (e.g., accept 9.8 or 10 for g depending on context). 