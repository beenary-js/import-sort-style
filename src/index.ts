import { IImport } from "import-sort-parser"
import { IStyleAPI, IStyleItem } from "import-sort-style"

function isTypeImport(importItem: IImport): boolean {
  return importItem.type === "import-type"
}

export function style(styleApi: IStyleAPI): IStyleItem[] {
  const {
    and,
    hasDefaultMember,
    hasNamedMembers,
    hasNamespaceMember,
    hasNoMember,
    hasOnlyDefaultMember,
    hasOnlyNamedMembers,
    hasOnlyNamespaceMember,
    isAbsoluteModule,
    isInstalledModule,
    isRelativeModule,
    moduleName,
    name,
    naturally,
    unicode,
  } = styleApi

  return [
    // import type {foo, bar, …} from "baz";
    {
      match: isTypeImport,
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import * as foo from "bar";
    {
      match: and(
        hasOnlyNamespaceMember,
        isAbsoluteModule,
        isInstalledModule(".")
      ),
      sort: moduleName(naturally),
    },
    // import foo, * as bar from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamespaceMember,
        isAbsoluteModule,
        isInstalledModule(".")
      ),
      sort: moduleName(naturally),
    },

    // import foo from "bar";
    {
      match: and(
        hasOnlyDefaultMember,
        isAbsoluteModule,
        isInstalledModule(".")
      ),
      sort: moduleName(naturally),
    },
    // import foo, {bar, …} from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isAbsoluteModule,
        isInstalledModule(".")
      ),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },
    // import {foo, bar, …} from "baz";
    {
      match: and(hasOnlyNamedMembers, isAbsoluteModule, isInstalledModule(".")),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    // import * as foo from "bar";
    {
      match: and(hasOnlyNamespaceMember, isAbsoluteModule),
      sort: moduleName(naturally),
    },
    // import foo, * as bar from "baz";
    {
      match: and(hasDefaultMember, hasNamespaceMember, isAbsoluteModule),
      sort: moduleName(naturally),
    },

    // import foo from "bar";
    {
      match: and(hasOnlyDefaultMember, isAbsoluteModule),
      sort: moduleName(naturally),
    },
    // import foo, {bar, …} from "baz";
    {
      match: and(hasDefaultMember, hasNamedMembers, isAbsoluteModule),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },
    // import {foo, bar, …} from "baz";
    {
      match: and(hasOnlyNamedMembers, isAbsoluteModule),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    // import * as foo from "./bar";
    {
      match: and(hasOnlyNamespaceMember, isRelativeModule),
      sort: moduleName(naturally),
    },

    // import foo, * as bar from "./baz";
    {
      match: and(hasDefaultMember, hasNamespaceMember, isRelativeModule),
      sort: moduleName(naturally),
    },

    // import foo from "./bar";
    {
      match: and(hasOnlyDefaultMember, isRelativeModule),
      sort: moduleName(naturally),
    },

    // import foo, {bar, …} from "./baz";
    {
      match: and(hasDefaultMember, hasNamedMembers, isRelativeModule),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },

    // import {foo, bar, …} from "./baz";
    {
      match: and(hasOnlyNamedMembers, isRelativeModule),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },

    { separator: true },
  ]
}

export default style
