// Copyright (C) 2018 Rick Waldron.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.wake
description: >
  Test that Atomics.wake on awoken waiter is a noop.
includes: [atomicsHelper.js]
features: [Atomics, SharedArrayBuffer, TypedArray]
---*/

$262.agent.start(`
  $262.agent.receiveBroadcast(function(sab) {
    const i32a = new Int32Array(sab);
    Atomics.add(i32a, 1, 1);
    $262.agent.report(Atomics.wait(i32a, 0, 0, 2000));
    $262.agent.leaving();
  });
`);

const i32a = new Int32Array(
  new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 2)
);

$262.agent.broadcast(i32a.buffer);

$262.agent.waitUntil(i32a, 1, 1);

assert.sameValue(Atomics.wake(i32a, 0, 1), 1, 'Atomics.wake(i32a, 0, 1) returns 1');

assert.sameValue($262.agent.getReport(), 'ok', '$262.agent.getReport() returns "ok"');

// Already awake, this should be a noop
assert.sameValue(Atomics.wake(i32a, 0, 1), 0, 'Atomics.wake(i32a, 0, 1) returns 0');
