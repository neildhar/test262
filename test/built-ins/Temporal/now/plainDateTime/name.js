// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-temporal.now.plainDateTime
description: Temporal.now.plainDateTime.name is "plainDateTime".
includes: [propertyHelper.js]
features: [Temporal]
---*/

assert.sameValue(Temporal.now.plainDateTime.name, 'plainDateTime');

verifyProperty(Temporal.now.plainDateTime, 'name', {
  enumerable: false,
  writable: false,
  configurable: true
});
