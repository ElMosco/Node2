export class Marker {
    icon = {}
    constructor(public lat: number, public lng: number, public label?: string)
    {
        if (this.label.includes("Gas")) {
            this.icon = { url: './assets/img/banana-3-32.ico' };
        }
        if(this.label.includes("elettrica"))
        {
            this.icon = { url: './assets/img/banana-3-32(1).ico' };
        }
    }
}
