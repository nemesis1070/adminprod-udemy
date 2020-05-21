export class Usuario {
    constructor(
        public Nombre: string,
        public Email: string,
        public Password: string,
        public Img?: string,
        public Role: string = 'USER_ROL',
        public Google: boolean = false,
        public IdUsuario?: number
    ) {}
}
