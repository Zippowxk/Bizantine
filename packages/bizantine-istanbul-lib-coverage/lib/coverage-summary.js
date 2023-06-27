/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const percent = require('./percent');
const dataProperties = require('./data-properties');

function blankSummary() {
    const empty = (pct = 'Unknown') => ({
        total: 0,
        covered: 0,
        skipped: 0,
        pct: pct
    });

    return {
        lines: empty(),
        statements: empty(),
        functions: empty(),
        branches: empty(),
        branchesTrue: empty(),
        increments: empty('100'),
    };
}

// asserts that a data object "looks like" a summary coverage object
function assertValidSummary(obj) {
    const valid =
        obj && obj.lines && obj.statements && obj.functions && obj.branches && obj.increments;
    if (!valid) {
        throw new Error(
            'Invalid summary coverage object, missing keys, found:' +
                Object.keys(obj).join(',')
        );
    }
}

/**
 * CoverageSummary provides a summary of code coverage . It exposes 4 properties,
 * `lines`, `statements`, `branches`, and `functions`. Each of these properties
 * is an object that has 4 keys `total`, `covered`, `skipped` and `pct`.
 * `pct` is a percentage number (0-100).
 */
class CoverageSummary {
    /**
     * @constructor
     * @param {Object|CoverageSummary} [obj=undefined] an optional data object or
     * another coverage summary to initialize this object with.
     */
    constructor(obj) {
        if (!obj) {
            this.data = blankSummary();
        } else if (obj instanceof CoverageSummary) {
            this.data = obj.data;
            // this.data.increments = obj.increments
        } else {
            // throw new Error('stop')
            // console.log('==================');
            // console.log(obj)
            this.data = obj;
            // this.data.increments = obj.increments
        }
        assertValidSummary(this.data);
    }

    /**
     * merges a second summary coverage object into this one
     * @param {CoverageSummary} obj - another coverage summary object
     */
    merge(obj) {
        const keys = [
            'lines',
            'statements',
            'branches',
            'functions',
            'branchesTrue',
            'increments',
        ];
        keys.forEach(key => {
            if (obj[key]) {
                this[key].total += obj[key].total;
                this[key].covered += obj[key].covered;
                this[key].skipped += obj[key].skipped;
                this[key].pct = percent(this[key].covered, this[key].total);
            }
        });

        return this;
    }

    /**
     * returns a POJO that is JSON serializable. May be used to get the raw
     * summary object.
     */
    toJSON() {
        return this.data;
    }

    /**
     * return true if summary has no lines of code
     */
    isEmpty() {
        return this.lines.total === 0;
    }
}

dataProperties(CoverageSummary, [
    'lines',
    'statements',
    'functions',
    'branches',
    'branchesTrue',
    'increments',
]);

module.exports = {
    CoverageSummary
};
