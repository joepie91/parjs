/**
 * @module parjs
 */
/** */

import {ParsingState} from "../state";
import {ResultKind} from "../result";
import {ParjserBase} from "../parser";
import {Parjser} from "../parjser";

/**
 * Returns a parser that will parse the string `str` and yield the text
 * that was parsed. If it can't, it will fail softly without consuming input.
 * @param str The string to parse.
 */
export function string(str: string): Parjser<string> {

    return new class ParseString extends ParjserBase {
        expecting = `expecting '${str}'`;
        type = "string";
        _apply(ps: ParsingState): void {
            let {position, input} = ps;
            let i;
            if (position + str.length > input.length) {
                ps.kind = ResultKind.SoftFail;
                return;
            }
            // This should create a StringSlice object instead of actually
            // copying a whole string.
            let substr = input.slice(position, position + str.length);

            // Equality test is very very fast.
            if (substr !== str) {
                ps.kind = ResultKind.SoftFail;
                return;
            }
            ps.position += str.length;
            ps.value = str;
            ps.kind = ResultKind.Ok;
        }

    }();
}
