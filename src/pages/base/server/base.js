import Server from "./index.js"

const ENTITY = "/api/articles";

const category = "/api/categories";

function articlelist({current=1,pageSize=5,keyword=''}){
    return Server.get(ENTITY+"?pageNum="+current+"&pageSize="+pageSize+"&keyword="+keyword);
}

function fenlei(){
    return Server.get(category);
}

export default {
    articlelist,
    fenlei
}