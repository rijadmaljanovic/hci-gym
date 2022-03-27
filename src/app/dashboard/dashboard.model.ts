export class Model{
    id:number=0;
    ime:string='';
    jmbg:string='';
    adresa:string='';
    kategorijaId:number=0;
    godinaZaposlenja:number=0;
    aktivan:boolean=false;
    createdAt:Date=new Date();
    modifiedAt:Date=new Date();
}