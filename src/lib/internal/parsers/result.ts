/**
 * @module parjs/internal/implementation/parsers
 */
/** */

import {ResultKind} from "../../reply";
import {ParsingState} from "../state";
import {Parjser} from "../../parjser";
import {ParjserBase} from "../parser";

export function result<T>(x: T): Parjser<T> {
    return new class Result extends ParjserBase {
        expecting = "anything";
        type = "result";
        _apply(ps: ParsingState): void {
            ps.value = x;
            ps.kind = ResultKind.Ok;
        }

    }();
}
