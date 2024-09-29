export declare class CryptingService {
    cryptPassword(password: string): Promise<string>;
    comparePassword(original: string, hashed: string): any;
}
