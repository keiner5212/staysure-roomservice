

export class Habitacion{
    private id: string
    private titulo: string
    private descripcion: string
    private pais: string
    private ciudad: string
    private imagen: string
    private servicios: string

    public static COLLECCTION="Habitaciones"
    
    constructor(id:string,titulo:string,desc:string,pais:string,ciudad:string,imagen:string,servicios:string){
        this.id=id
        this.titulo=titulo
        this.descripcion=desc
        this.pais=pais
        this.ciudad=ciudad
        this.imagen=imagen
        this.servicios=servicios
    }

    // getters and setters
    
    public getId():string{
        return this.id
    }

    public setId(id:string):void{
        this.id=id
    }

    public getTitulo():string{
        return this.titulo
    }

    public setTitulo(titulo:string):void{
        this.titulo=titulo
    }

    public getDescripcion():string{
        return this.descripcion
    }

    public setDescripcion(desc:string):void{
        this.descripcion=desc
    }

    public getPais():string{
        return this.pais
    }

    public setPais(pais:string):void{
        this.pais=pais
    }

    public getCiudad():string{
        return this.ciudad
    }

    public setCiudad(ciudad:string):void{
        this.ciudad=ciudad
    }

    public getImagen():string{
        return this.imagen
    }

    public setImagen(imagen:string):void{
        this.imagen=imagen
    }

    public getServicios():string{
        return this.servicios
    }

    public setServicios(servicios:string):void{
        this.servicios=servicios
    }
    
}