export class Indicadores {
    id : string;
    name : string;


    constructor(indicadoresJson? : any) {
        this.id = indicadoresJson && indicadoresJson.id || null;
        this.name = indicadoresJson && indicadoresJson.name || null;
    }

}

