export default class Player{
    id: number
    name: string
    image: string
    number: number
    position: string
    constructor (player:{
        id: number,
        name: string,
        image: string,
        number: number,
        position: string
    }){
        this.id = player.id
        this.name = player.name
        this.image = player.image
        this.number = player.number
        this.position = player.position
    }
}