# Matching Questions

This document describes how to define matching-type interactions and how to implement them in the UI.

## Interaction Schema

Use the `question` object with `type: 'matching'`. Provide a `matching` object with `left` and `right` arrays.

Example interaction in a slide's `slideInteractions` array:

```ts
{
  id: 'scalars-vectors-drag-drop',
  conceptId: 'scalars-vectors-interaction',
  conceptName: 'Scalars vs Vectors Drag and Drop',
  type: 'judging',
  description: 'Interactive classification of scalar and vector quantities',
  question: {
    type: 'matching',
    question: 'Match each quantity to Scalar or Vector',
    matching: {
      left: [
        '5 meters',
        '5 m/s East',
        '10 seconds',
        '25 degrees Celsius',
        '30 N downward',
        '2 kg',
        '15 m/s² upward',
        'position (3,4)'
      ],
      right: ['scalar', 'vector']
    }
  }
}
```

Required fields:
- `id`: unique interaction id within the slide
- `type`: must be `judging` for evaluative questions
- `question.type`: must be `'matching'`
- `question.question`: string prompt
- `question.matching.left`: array of items to classify or pair
- `question.matching.right`: array of categories or targets

## Capturing Interaction Responses

For matching, capture a mapping of left-items to selected right-category/target. A simple, consistent shape is a list of `{ key, value }` pairs.

```ts
handleInteractionComplete({
  interactionId: 'scalars-vectors-drag-drop',
  value: [
    { key: '5 meters', value: 'scalar' },
    { key: '5 m/s East', value: 'vector' }
    // ...
  ],
  isCorrect: true, // or compute after checking
  timestamp: Date.now(),
  conceptId: 'scalars-vectors-interaction',
  conceptName: 'Scalars vs Vectors Drag and Drop',
  conceptDescription: 'Interactive classification of scalar and vector quantities',
  question: {
    type: 'matching',
    question: 'Match each quantity to Scalar or Vector',
    matching: {
      left: [/* snapshot the same left items shown */],
      right: ['scalar', 'vector']
    }
  }
});
```

Notes:
- `value` should include only those items the learner has placed; for partial submissions, include the subset and mark `isCorrect` accordingly.
- Include the `question` snapshot used in the attempt to support downstream analytics.

## Minimal UI Implementation Example (select-based)

Below is a simple, accessible matching UI using select inputs. Use this for non drag-and-drop contexts.

```tsx
import { useMemo, useState } from 'react';

export function Matching({
  interaction,
  onComplete
}: {
  interaction: {
    id: string;
    conceptId: string;
    conceptName: string;
    description: string;
    question: {
      type: 'matching';
      question: string;
      matching: { left: string[]; right: string[] };
    };
  };
  onComplete: (payload: {
    interactionId: string;
    value: Array<{ key: string; value: string }>;
    isCorrect?: boolean;
    timestamp: number;
    conceptId: string;
    conceptName: string;
    conceptDescription: string;
    question: { type: 'matching'; question: string; matching: { left: string[]; right: string[] } };
  }) => void;
}) {
  const left = interaction.question.matching.left;
  const right = interaction.question.matching.right;
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const allAnswered = useMemo(
    () => left.every(item => answers[item] && answers[item].length > 0),
    [left, answers]
  );

  const submit = () => {
    const payload = left
      .filter(item => answers[item])
      .map(item => ({ key: item, value: answers[item] }));

    onComplete({
      interactionId: interaction.id,
      value: payload,
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
        {left.map(item => (
          <div key={item} className="flex items-center gap-3">
            <div className="flex-1 p-2 rounded bg-gray-100">{item}</div>
            <select
              className="p-2 border rounded"
              value={answers[item] || ''}
              onChange={e => setAnswers(prev => ({ ...prev, [item]: e.target.value }))}
            >
              <option value="" disabled>
                Select
              </option>
              {right.map(r => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        disabled={!allAnswered}
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
- Ensure each `left` item is uniquely identifiable (use stable strings or include IDs).
- If you randomize order, record the randomization seed or include the question snapshot in the response.
- Validate that all required matches are selected before enabling submit.
- For drag-and-drop UIs, send the same `{ key, value }` structure on completion. 