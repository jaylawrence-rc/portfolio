import assert from "node:assert/strict";
import test from "node:test";
import {
  checkProfileReadability,
  createDesignProfile,
  defaultDesignProfile,
  parseDesignProfile,
  profileFromQuery,
  profileUrl,
  validateDesignProfile,
} from "./design-profile.ts";

test("every approved palette passes AA normal text contrast", () => {
  for (const colorSet of ["ember", "garden", "dusk"]) {
    const profile = createDesignProfile("ship-onwards", {
      ...defaultDesignProfile("ship-onwards").controls,
      colorSet,
    });
    assert.equal(checkProfileReadability(profile).passes, true, colorSet);
  }
});

test("profile exports round-trip without changing visible choices or tokens", () => {
  for (const target of ["ship-onwards", "journal-retrofit"]) {
    const profile = createDesignProfile(target, {
      colorSet: "dusk",
      fontPair: "journal",
      radius: "rounded",
      density: "compact",
    });
    const exported = JSON.stringify(profile, null, 2);
    assert.deepEqual(parseDesignProfile(exported), profile);
    const reordered = {
      tokens: {
        shape: { spacingFactor: profile.tokens.shape.spacingFactor, radius: profile.tokens.shape.radius },
        typography: { mono: profile.tokens.typography.mono, body: profile.tokens.typography.body, display: profile.tokens.typography.display },
        colors: Object.fromEntries(Object.entries(profile.tokens.colors).reverse()),
      },
      controls: Object.fromEntries(Object.entries(profile.controls).reverse()),
      target: profile.target,
      schemaVersion: profile.schemaVersion,
    };
    assert.deepEqual(parseDesignProfile(JSON.stringify(reordered)), profile);
    const url = new URL(profileUrl("https://lab.example/sites/demo", profile));
    assert.deepEqual(profileFromQuery(url.searchParams.get("profile"), target), profile);
  }
});

test("import rejects unsupported versions and token tampering", () => {
  const profile = defaultDesignProfile("ship-onwards");
  assert.equal(validateDesignProfile({ ...profile, schemaVersion: 2 }).ok, false);
  assert.equal(validateDesignProfile({ ...profile, tokens: { ...profile.tokens, colors: { ...profile.tokens.colors, text: "#000000" } } }).ok, false);
  assert.deepEqual(profileFromQuery("not-json", "ship-onwards"), profile);
  assert.deepEqual(profileFromQuery(JSON.stringify(profile), "journal-retrofit"), defaultDesignProfile("journal-retrofit"));
});
