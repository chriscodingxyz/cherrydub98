import { signal } from "@preact/signals-react";

const flicker = signal(true);
const activeComponents = signal(["Welcome", "Display"]);
