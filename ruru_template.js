function templateProcess(inp,out,vars){
    let tpl = document.getElementById(inp).innerHTML;
    document.getElementById(out).innerHTML = templatePass2(templatePass1(tpl));
    function templatePass1(tpl){
        function stage2(match,p1,p2,p3){
            let res = vars,path='', html = '', re = new RegExp('\\${'+p1+'\\.(.*?)}','gms');
            p2.split('.').forEach(e => {
                    if( res!==false && e in res ){
                        res = res[e];
                        path += `${e}.`;
                    } else res = false;
                });
            if( !res ) return false;
            path = path.slice(0, -1);
            for( e in res ) html += p3.replace(re,(match2,m1) => `\${${path}.${e}.${m1}}`);
            return html;
        }
        return tpl.replace(/\<!--\s*ForEach\s*([a-zA-Z0-9]*)\s*in\s*([a-zA-Z0-9|\.]*)\s*--\>(.*)\<!--\/\s?ForEach\s*-->/gms, stage2);
    }
    function templatePass2(tpl) {
        function stage2(match,p1){
            let defaultVar = String(p1).split('|'), hasDefault = defaultVar.length>1, res = vars;
            if( hasDefault ) p1 = defaultVar[0], defaultVar = defaultVar[1];
            p1.split('.').forEach(e => res!==false && e in res?res = res[e]:res = false );
            return res!==false?res:hasDefault?defaultVar:false.undefined;
        }
        return tpl.replace(/\${(.*?)}/g, stage2);;
    }
}