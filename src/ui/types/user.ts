export interface User {
    id:number,
    name:string,
    email:string,
    role: 'client' | 'vendor' | 'admin';
}