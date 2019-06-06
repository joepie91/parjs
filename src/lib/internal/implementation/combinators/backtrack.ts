/**
 * @module parjs/internal/implementation/combinators
 */
/** */

import {ParsingState} from "../state";
import {ParjsCombinator} from "../../../";
import {LoudParser} from "../../../loud";
import {BaseParjsParser} from "../parser";
import {rawCombinator} from "./combinator";


export function backtrack<T>(): ParjsCombinator<LoudParser<T>, LoudParser<T>> {
    return rawCombinator(source => {
        return new class Backtrack extends BaseParjsParser {
            displayName = "backtrack";
            expecting = source.expecting;

            _apply(ps: ParsingState): void {
                let {position} = ps;
                source.apply(ps);
                if (ps.isOk) {
                    //if inner succeeded, we backtrack.
                    ps.position = position;
                }
                //whatever code ps had, we return it.
            }

        }();
    });
}