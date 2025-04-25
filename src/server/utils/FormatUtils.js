export default class FormartUtils{
    static encodeBase64(value) {
        console.log(value)
        return Buffer.from(value, 'utf-8').toString('base64');
    }   
    static decodeBase64(value){
        return Buffer.from(value, 'base64').toString('utf-8');
    }
}