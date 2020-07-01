import memoize from 'lodash/memoize';
import { FunctionSeeker } from '@lightning/typing';

export const getFunctionSeeker = (sourceFunctions: Array<{ [key: string]: Function }>) => memoize((functionName: string): FunctionSeeker => {
    return sourceFunctions.reduce((acc, currentSource) => {
        const func = currentSource[functionName];
        if (func) return func;
        return acc;
    }, null) as FunctionSeeker;
});
