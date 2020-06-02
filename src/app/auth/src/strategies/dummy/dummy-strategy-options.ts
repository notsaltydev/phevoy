import { AuthStrategyOptions } from '../auth-strategy-options';
import { AuthSimpleToken } from '../../services/token/token';

export class DummyAuthStrategyOptions extends AuthStrategyOptions {
    token? = {
        class: AuthSimpleToken,
    };
    delay? = 1000;
    alwaysFail? = false;
}

export const dummyStrategyOptions: DummyAuthStrategyOptions = new DummyAuthStrategyOptions();
