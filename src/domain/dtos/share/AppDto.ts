
export class AppDto {

    get values() {
        const obj: { [key: string]: any } = {};
        for(const key in this) {
            if(this[key]) obj[key] = this[key];
        }
        return obj;
    }

}