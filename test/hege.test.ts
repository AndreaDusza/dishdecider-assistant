import { LikeLevel } from '../src/userconfig';
import { HegeConfig } from '../src/userconfig.hege';
import { testsForUser } from './helpers';

describe("Hege", () => {
    testsForUser(HegeConfig, {
        "Rántott libamáj": "blacklist",
        "Rántott sertéskaraj": "neutral",
    });
});
