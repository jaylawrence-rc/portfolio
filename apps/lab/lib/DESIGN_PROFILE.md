# Design Profile v1

The Lab Configurator exports a public, versioned JSON contract. The same JSON appears in its download, copy action, preview URL, and full-site URL. Both Ship Onwards and the refined Portfolio Journal read it through `parseDesignProfile` / `profileFromQuery` and apply the resolved semantic tokens through `profileStyle`.

## Shape

`DesignProfile` in [`design-profile.ts`](./design-profile.ts) is the TypeScript source of truth:

- `schemaVersion`: exactly `1`.
- `target`: `ship-onwards` or `journal-retrofit`.
- `controls`: approved `colorSet`, `fontPair`, `radius`, and `density` IDs.
- `tokens.colors`: explicit `background`, `surface`, `text`, `mutedText`, `action`, `actionText`, and `link` hex colors.
- `tokens.typography`: explicit `display`, `body`, and `mono` CSS font stacks.
- `tokens.shape`: explicit `radius` and `spacingFactor` CSS values.

Defaults are `ember` / `editorial` / `precise` / `spacious` for Ship Onwards and `garden` / `studio` / `softened` / `balanced` for the Journal retrofit. `dusk` is a third approved color set. A profile is target-specific, and the Configurator remembers each target's controls separately while the visitor switches previews.

The controls are bounded. Every color set passes a 4.5:1 contrast check for normal body text, secondary text, and links on backgrounds and surfaces, plus action labels. This checks color contrast only; the UI also asks readers to inspect type size, line length, and context in the full site.

## Validation and import behavior

`validateDesignProfile` rejects unsupported versions, targets, control IDs, token mismatches, and extra fields. It compares object structure without depending on JSON property order. `parseDesignProfile` throws a specific error for invalid JSON or an invalid profile. Public route query parsing falls back to that site's default profile if the query is invalid or targets the other site. The fixed Journal baseline accepts the query for return navigation but deliberately never applies its tokens.

The test in [`design-profile.test.mjs`](./design-profile.test.mjs) covers approved palette contrast, public export → parse → URL → route round trips for both targets, reordered JSON properties, and rejected unsupported or tampered profiles. Run it with:

```sh
node --experimental-strip-types --test apps/lab/lib/design-profile.test.mjs
```

This verifies the public contract and Lab application. A working private Design Skill has not yet been built in this repository or used to produce these demos, so import and application inside a customer's supported repository cannot be claimed or tested here. That cross-repository acceptance test remains a launch dependency for the paid skill.
