// Copyright (C) 2018 Amal Hussein.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.wait
description: >
  Returns "not-equal" when value arg does not match an index in the typedArray
info: |
  Atomics.wait( typedArray, index, value, timeout )

  3.Let v be ? ToBigInt64(value).
    ...
  14.If v is not equal to w, then
    a.Perform LeaveCriticalSection(WL).
    b. Return the String "not-equal".

includes: [atomicsHelper.js]
features: [Atomics, BigInt, SharedArrayBuffer, TypedArray]
---*/

const value = 42n;

$262.agent.start(`
  $262.agent.receiveBroadcast(function(sab) {
    const i64a = new BigInt64Array(sab);
    Atomics.add(i64a, 1, 1);
    $262.agent.report(Atomics.store(i64a, 0, ${value}));
    $262.agent.report(Atomics.wait(i64a, 0, 0));
    $262.agent.leaving();
  });
`);

const i64a = new BigInt64Array(
  new SharedArrayBuffer(BigInt64Array.BYTES_PER_ELEMENT * 8)
);

$262.agent.broadcast(i64a.buffer);
$262.agent.waitUntil(i64a, 1, 1);

assert.sameValue(
  $262.agent.getReport(),
  '42',
  '$262.agent.getReport() returns "42"'
);
assert.sameValue(
  $262.agent.getReport(),
  'not-equal',
  '$262.agent.getReport() returns "not-equal"'
);
