import getCleaner from 'get-clean-string';
import { parse } from 'node-html-parser';
import interpolator from 'pupa';

const cleaner = getCleaner();

function interpolateArray(arr, sourceValues) {
    return arr.map(val => {
        if (typeof val === 'string') return interpolator(val, sourceValues);
        return val;
    });
}

function interpolateObject(obj, sourceValues) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value === 'object') {
            acc[key] = interpolateObject(value, sourceValues);
        } else if (typeof value === 'string') {
            acc[key] = interpolator(value, sourceValues);
        } else if (Array.isArray(value)) {
            acc[key] = interpolateArray(value, sourceValues);
        } else {
            acc[key] = value;
        }
        return acc;
    }, {})
}

const interpolate = (valueToBeInterpolated) => (interpolateSourceValues) => {
    if (typeof valueToBeInterpolated === 'string' ) {
        return interpolator(valueToBeInterpolated, interpolateSourceValues);
    }
    if (typeof valueToBeInterpolated === 'object') {
        return interpolateObject(valueToBeInterpolated, interpolateSourceValues);
    }
    if (Array.isArray(valueToBeInterpolated)) {
        return interpolateArray(valueToBeInterpolated, interpolateSourceValues);
    }
    return valueToBeInterpolated;
}

export const seFunctions = {
    appendStart: startString => currentValue => startString + currentValue,
    appendEnd: finishString => currentValue => currentValue + finishString,
    clean: currentValue => cleaner(currentValue),
    select: queryPath => htmlElement => htmlElement.querySelector(queryPath),
    selectAll: queryPath => htmlElement => htmlElement.querySelectorAll(queryPath),
    getAttribute: propertyPath => htmlElement => htmlElement.getAttribute(propertyPath),
    getText: htmlElement => htmlElement.text,
    parseHtml: rawHtml => parse(rawHtml),
    interpolate,
};
