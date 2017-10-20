// @flow

export type GlossaryItem = {
  matches: Array<string>,
  name: string,
  definition: string,
};

type Definition = string;

export type Glossary = Array<Definition>;

export type RulebookType = { title: string, name: string, tags: [] };
