
export interface Image {
    data : string
    name : string,
    type : string,
    size : number,
}

export interface Location {
    name : string,
    city : string,
    address : string,
    images : Array<Image>
    description : string
    owner : string // email
}