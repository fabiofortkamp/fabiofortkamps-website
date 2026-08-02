import { useState } from "preact/hooks";

export default function Greeting({ messages }) {
  const randomMessage = () =>
    messages[Math.floor(Math.random() * messages.length)];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div class="my-4">
      <h3 class="text-xl font-semibold text-ctp-text mb-3">
        {greeting}! Thank you for visiting!
      </h3>
      <button
        onClick={() => setGreeting(randomMessage())}
        style="background-color: var(--ctp-mauve); color: var(--ctp-base); border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-weight: bold; cursor: pointer;"
      >
        New Greeting
      </button>
    </div>
  );
}
