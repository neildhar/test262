// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.every
description: Instance buffer can be resized during iteration
includes: [testTypedArray.js, compareArray.js]
features: [TypedArray, resizable-arraybuffer]
---*/

testWithTypedArrayConstructors(function(TA) {
  var BPE = TA.BYTES_PER_ELEMENT;
  var buffer = new ArrayBuffer(BPE * 3, {maxByteLength: BPE * 3});
  var sample = new TA(buffer);
  var elements, indices, arrays;

  elements = [];
  indices = [];
  arrays = [];
  sample.every(function(element, index, array) {
    if (elements.length === 0) {
      buffer.resize(2 * BPE);
    }

    elements.push(element);
    indices.push(index);
    arrays.push(array);
    return true;
  });

  assert.compareArray(elements, [0, 0, undefined], 'elements (shrink)');
  assert.compareArray(indices, [0, 1, 2], 'indices (shrink)');
  assert.compareArray(arrays, [sample, sample, sample], 'arrays (shrink)');

  elements = [];
  indices = [];
  arrays = [];
  sample.every(function(element, index, array) {
    if (elements.length === 0) {
      buffer.resize(3 * BPE);
    }

    elements.push(element);
    indices.push(index);
    arrays.push(array);
    return true;
  });

  assert.compareArray(elements, [0, 0], 'elements (grow)');
  assert.compareArray(indices, [0, 1], 'indices (grow)');
  assert.compareArray(arrays, [sample, sample], 'arrays (grow)');
});
