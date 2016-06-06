/**
 * Created by Julien Guilmont on 31/01/2016.
 */
"use strict";
const _ = require('lodash');
const crypto = require('crypto');
const secret = 'abcdefg';

function MerkleTree(data) {
    let merkle = {
        tree: [],
        /**
         * Create first hash blocks from datas
         * @param data
         */
        treatData: function (data) {
            if (!_.isArray(data)) {
                data = [data];
            }
            //Remove all string empty & remove all duplicate items
            data = _.union(_.compact(data));

            if (data.length === 0) {
                throw new Error('No data detected from parameters')
            }

            let depth = 0;

            let retenue = 0;
            let count = data.length;

            // Count all levels for the tree
            while( count > 1) {
                count = count + retenue;
                retenue = count % 2;
                count = (count-retenue) / 2;
                depth++;
            }

            depth+=retenue;

            this.tree[depth] = [];

            let self = this;
            _.each(data, function (value) {
                let obj = self.addItem(value);
                self.tree[depth].push(obj);
            });
            this.makeTree(depth);
        },
        /**
         * Loop on each level
         * @param depth
         */
        makeTree: function (depth) {
            while (depth !== 0) {
                this.makeBranches(--depth);
            }
        },
        /**
         * Create all branches for the current level
         * @param depth
         */
        makeBranches: function (depth) {
            if (this.tree[depth] === undefined) {
                this.tree[depth] = [];
            }

            // Count all items for the level + 1
            let length = this.tree[depth + 1].length;

            for (var i = 0; i < length; i = i + 2) {
                let left = this.tree[depth + 1][i];

                // If only the left item exist, the parent have the same hash
                if (this.tree[depth + 1][i + 1] === undefined) {
                    this.tree[depth].push({hash: left.hash, children: [left]});
                    continue;
                }

                let right = this.tree[depth + 1][i + 1];

                this.tree[depth].push(this.addItem(left.hash + right.hash, [left, right]));
            }
        },
        /**
         * Crypt the data and return them
         * @param data
         * @returns {*}
         */
        hash: function (data) {
            return crypto.createHmac('sha256', secret)
                .update(data+'')
                .digest('hex');
        },
        /**
         * Create the object who contains his hash and childrens
         * @param data
         * @param children
         * @returns {{hash: *}}
         */
        addItem: function (data, children) {
            let obj = {hash: this.hash(data)};
            if (typeof children !== 'undefined') {
                obj.children = children;
            }
            return obj;
        },
        /**
         * return the hash of root merkle
         * @returns {*}
         */
        root: function () {
            if (this.tree[0] !== undefined && this.tree[0][0] !== undefined) {
                return this.tree[0][0].hash;
            }

            return null;
        },
        /**
         * return the number of level of Merkle tree
         * @returns {Number}
         */
        height: function () {
            return this.tree.length;
        },
        /**
         * return an array with all hash for the level
         * @param level
         * @returns {Array}
         */
        level: function (level) {
            return _.map(this.tree[level], 'hash');
        }
    };
    merkle.treatData(data);

    return merkle
};

module.exports = MerkleTree;
