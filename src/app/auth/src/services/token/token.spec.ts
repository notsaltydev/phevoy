import { AuthJWTToken, AuthOAuth2JWTToken, AuthOAuth2Token, AuthSimpleToken } from './token';


describe('auth token', () => {
    describe('AuthJWTToken', () => {
        const now = new Date();

        // tslint:disable
        const simpleToken = new AuthSimpleToken('token', 'strategy');
        const validJWTToken = new AuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MjUzMjM1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Rgkgb4KvxY2wp2niXIyLJNJeapFp9z3tCF-zK6Omc8c', 'strategy');

        const noIatJWTToken = new AuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJleHAiOjE1MzI0MzcyMDAsInN1YiI6IkFsYWluIENIQVJMRVMiLCJhZG1pbiI6dHJ1ZX0.cfwQlKo6xomXkE-U-SOqse2GjdxncOuhdd1VWIOiYzA', 'strategy');

        const noExpJWTToken = new AuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsInN1YiI6IkFsYWluIENIQVJMRVMiLCJhZG1pbiI6dHJ1ZX0.heHVXkHexwqbPCPUAvkJlXO6tvxzxTKf4iP0OWBbp7Y', 'strategy');

        const expiredJWTToken = new AuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773', 'strategy');

        // tslint:enable

        it('JWT Token constructor, not valid JWT token, must consist of three parts', () => {
            expect(() => {
                new AuthJWTToken('.', 'strategy');
            })
                .toThrow(new Error(
                    `The payload . is not valid JWT payload and must consist of three parts.`));
        });

        it('JWT Token constructor,, not valid JWT token, cannot be decoded', () => {
            expect(() => {
                new AuthJWTToken('..', 'strategy');
            })
                .toThrow(new Error(
                    `The payload .. is not valid JWT payload and cannot be decoded.`));
        });

        it('getPayload, not valid base64 in JWT token, cannot be decoded', () => {
            expect(() => {
                new AuthJWTToken('h%2BHY.h%2BHY.h%2BHY', 'strategy');
            })
                .toThrow(new Error(
                    `The payload h%2BHY.h%2BHY.h%2BHY is not valid JWT payload and cannot be parsed.`));
        });

        it('getPayload success', () => {
            expect(validJWTToken.getPayload())
                // tslint:disable-next-line
                .toEqual(JSON.parse('{"iss":"cerema.fr","iat":1532350800,"exp":2532350800,"sub":"Alain CHARLES","admin":true}'));
        });


        it('getCreatedAt success : now for simpleToken', () => {
            // we consider dates are the same if differing from minus than 10 ms
            expect(simpleToken.getCreatedAt().getTime() - now.getTime() < 10);
        });

        it('getCreatedAt success : exp for validJWTToken', () => {
            const date = new Date();
            date.setTime(1532350800000);
            expect(validJWTToken.getCreatedAt()).toEqual(date);
        });

        it('getCreatedAt success : now for noIatJWTToken', () => {
            // we consider dates are the same if differing from minus than 10 ms
            expect(noIatJWTToken.getCreatedAt().getTime() - now.getTime() < 10);
        });

        it('getCreatedAt success : now for simpleToken', () => {
            // we consider dates are the same if differing from minus than 10 ms
            expect(simpleToken.getCreatedAt().getTime() - now.getTime() < 10);
        });

        it('getCreatedAt success : exp for validJWTToken', () => {
            const date = new Date();
            date.setTime(1532350800000);
            expect(validJWTToken.getCreatedAt()).toEqual(date);
        });

        it('getCreatedAt success : now for noIatJWTToken', () => {
            // we consider dates are the same if differing from minus than 10 ms
            expect(noIatJWTToken.getCreatedAt().getTime() - now.getTime() < 10);
        });

        it('getTokenExpDate success', () => {
            const date = new Date(0);
            date.setTime(2532350800000);
            expect(validJWTToken.getTokenExpDate()).toEqual(date);
        });

        it('getTokenExpDate is empty', () => {
            expect(noExpJWTToken.getTokenExpDate()).toBeNull();
        });

        it('no exp date token is valid', () => {
            expect(noExpJWTToken.isValid()).toEqual(true);
        });

        it('isValid success', () => {
            expect(validJWTToken.isValid()).toEqual(true);
        });

        it('isValid fail', () => {
            // without token
            expect(new AuthJWTToken('', 'strategy', new Date()).isValid()).toBeFalsy();


            // expired date
            expect(expiredJWTToken.isValid()).toBeFalsy();
        });

        it('AuthJWTToken name', () => {
            // without token
            expect(AuthJWTToken.NAME).toEqual(validJWTToken.getName());
        });

        it('AuthSimpleToken name', () => {
            // without token
            expect(AuthSimpleToken.NAME).toEqual(simpleToken.getName());
        });

        it('AuthSimpleToken has payload', () => {
            // without token
            expect(simpleToken.getPayload()).toEqual(null);
        });

        it('getPayload success', () => {
            expect(validJWTToken.getPayload())
                // tslint:disable-next-line
                .toEqual(JSON.parse('{"iss":"cerema.fr","iat":1532350800,"exp":2532350800,"sub":"Alain CHARLES","admin":true}'));
        });

        it('AuthJWTToken name', () => {
            // without token
            expect(AuthJWTToken.NAME).toEqual(validJWTToken.getName());
        });

        it('AuthSimpleToken name', () => {
            // without token
            expect(AuthSimpleToken.NAME).toEqual(simpleToken.getName());
        });

        it('AuthSimpleToken has payload', () => {
            // without token
            expect(simpleToken.getPayload()).toEqual(null);
        });
    });

    describe('AuthOAuth2Token', () => {

        const token = {
            access_token: '2YotnFZFEjr1zCsicMWpAA',
            expires_in: 3600,
            refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
            token_type: 'bearer',
            example_parameter: 'example_value',
        };


        let validToken = new AuthOAuth2Token(token, 'strategy');

        const noExpToken = new AuthOAuth2Token({
            access_token: '2YotnFZFEjr1zCsicMWpAA',
            refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
            example_parameter: 'example_value',
        }, 'strategy');

        it('getPayload success', () => {
            expect(validToken.getPayload()).toEqual(token);
        });

        it('empty token constructor, not valid token, cannot be decoded', () => {
            expect(() => {
                new AuthOAuth2Token({}, 'strategy');
            })
                .toThrow(new Error(
                    `Cannot extract payload from an empty token.`));
        });

        it('getExpDate success', () => {
            // recreate it here if we want to be in the same second
            validToken = new AuthOAuth2Token(token, 'strategy');
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000);
            expect(validToken.getTokenExpDate().getTime() - date.getTime() < 10);
        });

        it('getTokenExpDate is empty', () => {
            expect(noExpToken.getTokenExpDate()).toBeNull();
        });

        it('toString is json', () => {
            expect(String(validToken)).toEqual(JSON.stringify(token));
        });

        it('getTokenExpDate is empty', () => {
            expect(validToken.getType()).toEqual(token.token_type);
        });

        it('getTokenExpDate is empty', () => {
            expect(noExpToken.getRefreshToken()).toEqual(token.refresh_token);
        });

        it('no exp date token is valid', () => {
            expect(noExpToken.isValid()).toEqual(true);
        });

        it('isValid success', () => {
            expect(validToken.isValid()).toEqual(true);
        });

        it('name', () => {
            expect(AuthOAuth2Token.NAME).toEqual(validToken.getName());
        });
    });

    describe('AuthOAuth2JWTToken', () => {

        const exp = 2532350800;
        const iat = 1532350800;
        const expires_in = 1000000000;

        const accessTokenPayload = {
            'iss': 'cerema.fr',
            'iat': 1532350800,
            'exp': 2532350800,
            'sub': 'Alain CHARLES',
            'admin': true,
        };

        const validPayload = {
            // tslint:disable-next-line
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MjUzMjM1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Rgkgb4KvxY2wp2niXIyLJNJeapFp9z3tCF-zK6Omc8c',
            expires_in: 1000000000,
            refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
            token_type: 'bearer',
            example_parameter: 'example_value',
        };

        const noExpButIatPayload = {
            // tslint:disable-next-line
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsInN1YiI6IkFsYWluIENIQVJMRVMiLCJhZG1pbiI6dHJ1ZX0.heHVXkHexwqbPCPUAvkJlXO6tvxzxTKf4iP0OWBbp7Y',
            expires_in: expires_in,
            refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
            token_type: 'bearer',
            example_parameter: 'example_value',
        };

        const noExpNoIatPayload = {
            // tslint:disable-next-line
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJzdWIiOiJBbGFpbiBDSEFSTEVTIiwiYWRtaW4iOnRydWV9.LKZggkN-r_5hnEcCg5GzbSqZz5_SUHEB1Bf9Sy1qJd4',
            expires_in: expires_in,
            refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
            token_type: 'bearer',
            example_parameter: 'example_value',
        };

        const permanentPayload = {
            // tslint:disable-next-line
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJzdWIiOiJBbGFpbiBDSEFSTEVTIiwiYWRtaW4iOnRydWV9.LKZggkN-r_5hnEcCg5GzbSqZz5_SUHEB1Bf9Sy1qJd4',
            token_type: 'bearer',
            example_parameter: 'example_value',
        };

        const validToken = new AuthOAuth2JWTToken(validPayload, 'strategy');
        let noExpButIatToken = new AuthOAuth2JWTToken(noExpButIatPayload, 'strategy');
        const permanentToken = new AuthOAuth2JWTToken(permanentPayload, 'strategy');

        it('getPayload success', () => {
            expect(validToken.getPayload()).toEqual(validPayload);
        });

        it('getAccessTokenPayload success', () => {
            expect(validToken.getAccessTokenPayload()).toEqual(accessTokenPayload);
        });

        it('empty token constructor, not valid token, cannot be decoded', () => {
            expect(() => {
                new AuthOAuth2JWTToken({}, 'strategy');
            })
                .toThrow(new Error(
                    `Cannot extract payload from an empty token.`));
        });

        it('getCreatedAt success for valid token', () => {
            const date = new Date(0);
            date.setUTCSeconds(iat);
            expect(validToken.getCreatedAt()).toEqual(date);
        });

        it('getCreatedAt success for no iat token', () => {
            noExpButIatToken = new AuthOAuth2JWTToken(noExpButIatPayload, 'strategy');
            const date = new Date();
            expect(noExpButIatToken.getTokenExpDate().getTime() - date.getTime() < 10);
        });

        it('getExpDate success when exp is set', () => {
            const date = new Date(0);
            date.setUTCSeconds(exp);
            expect(validToken.getTokenExpDate()).toEqual(date);
        });

        it('getExpDate success when exp is not set but iat and expires_in are set', () => {
            const date = new Date(0);
            date.setUTCSeconds(iat + expires_in);
            expect(noExpButIatToken.getTokenExpDate()).toEqual(date);
        });

        it('getExpDate success when only expires_in is set', () => {
            const NoExpNoIatToken = new AuthOAuth2JWTToken(noExpNoIatPayload, 'strategy');
            const date = new Date();
            date.setTime(date.getTime() + expires_in * 1000);
            expect(NoExpNoIatToken.getTokenExpDate().getTime() - date.getTime() < 10);
        });

        it('getTokenExpDate is empty', () => {
            expect(permanentToken.getTokenExpDate()).toBeNull();
        });

        it('name', () => {
            expect(AuthOAuth2JWTToken.NAME).toEqual(validToken.getName());
        });
    });

});
