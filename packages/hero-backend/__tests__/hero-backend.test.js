'use strict';

const heroBackend = require('..');
const assert = require('assert').strict;

assert.strictEqual(heroBackend(), 'Hello from heroBackend');
console.info('heroBackend tests passed');
