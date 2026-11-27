import test from 'node:test';
import assert from 'node:assert/strict';
import {topics,people,suggest} from './catalog.js';
test('Every question opens three distinct sourced records',()=>{assert.equal(topics.length,8);for(const t of topics){assert.equal(new Set(t[3].map(r=>r[0])).size,3);for(const [id,title,q] of t[3])assert.ok(people[id][2]&&title&&q.endsWith('?'))}});
test('Suggest or explicitly ask the reader',()=>{assert.deepEqual(suggest('Take a semester off'),['leave']);assert.deepEqual(suggest('Hmmm'),[]);assert.deepEqual(suggest('major and gap year'),['leave','major'])});
