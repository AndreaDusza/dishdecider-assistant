import { evaluateCardText } from "../src/logic";
import { LikeLevel, UserConfig } from "../src/userconfig";

export function testsForUser(
    userConfig: UserConfig,
    testcases: Record<string, LikeLevel>, 
) {
    for (const [text, expected] of Object.entries(testcases)) {
        it(text, () => {
            expect(evaluateCardText(text, userConfig, 2)).toEqual(expected);
        });
    }
}

