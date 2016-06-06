/**
 * Created by Julien Guilmont on 31/01/2016.
 */

"use strict";
const assert = require('chai').assert;

const MerkleTree = require('../MerkleTree.js');

describe('Merkle Tree Module', function () {
    describe('Create', function () {
        it ("No data exception thow", function () {
            assert.throw(function () {
                MerkleTree();
            }, Error, 'No data detected from parameters');
        });
        it ("Doesnt throw", function () {
            assert.doesNotThrow(function () {
                MerkleTree(['string']);
            }, Error, 'No data detected from parameters')
        });

        it ("Get level 3", function () {
            let merkle = new MerkleTree(['string1', 'string2', 'string3']);
            assert.equal(merkle.height(), 3, 'Level is not == 3');
        });
        it ("Get level 5", function () {
            let merkle = new MerkleTree(['string1', 'string2', 'string3','string4', 'string5', 'string6', 'string7', 'string8', 'string9']);
            assert.equal(merkle.height(), 5, 'Level is not == 5');
        });
    });

    describe('Hash', function () {
        it ("Hash String", function () {
            let merkle = MerkleTree(['string']);

            assert.equal(merkle.hash('string'), 'd659fdec82e8c7bafc6a9b42bfc812b12c5de0bb562d883b07fe3f27e13fc8e6', 'Hash not equal');
        });

        it ("Hash Number", function () {
            let merkle = MerkleTree(['string']);

            assert.equal(merkle.hash(123), 'a4f8d1682b29eb57cc0a4846b03630731673b2c49bd3d7eb418a1ab1908f6db3', 'Hash number not equal');
        });
    });

    describe('Root', function () {
        it ("Root level 6", function () {
            let merkle = new MerkleTree(['string1', 'string2', 'string3','string4', 'string5', 'string6', 'string7', 'string8', 'string9']);
            assert.equal(merkle.root(), '9e4b9f82c8cc90ee8e5c35a24763ca3e6a0ba32d0ce1228e3a5eff6b38d92711', 'merkle root is not equal');
        });
        it ("Root level 3", function () {
            let merkle = new MerkleTree(['string1', 'string2', 'string3']);
            assert.equal(merkle.root(), 'f4c1b81423c7537a16df0fd84af5e20dc78fd068985e5a208cdaa5286ac07a71', 'merkle root is not equal');
        });
    });
});