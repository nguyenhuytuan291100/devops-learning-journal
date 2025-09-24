export class ShortCodeService {
    generate(originUrl: string): string{
        if(!/^https?:\/\//i.test(originUrl)){
            throw new Error('Invalid URL. Must start with http:// or https://');
        }
        return Math.random().toString(36).slice(2,8);
    }
}