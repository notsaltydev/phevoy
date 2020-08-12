import { IS_SERVER_PLATFORM } from './is-server';

export function ServerOnly(): MethodDecorator {
    return (
        target: any,
        property: string | symbol,
        descriptor: PropertyDescriptor
    ): void => {
        if (!IS_SERVER_PLATFORM) {
            descriptor.value = () =>
                new Proxy(
                    {},
                    {
                        get() {
                            return () => {
                            };
                        }
                    }
                );
        }
    };
}
