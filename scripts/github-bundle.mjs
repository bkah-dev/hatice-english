import {readdir,readFile} from 'node:fs/promises';
const roots=['src','public','scripts','tests','.github'];
const paths=['package.json','package-lock.json','index.html','tsconfig.json','vite.config.ts','playwright.config.ts','.gitignore','README.md','CONTENT_SOURCES.md','REFERENCE_ANALYSIS.md','QA_REPORT.md'];
async function scan(dir){for(const e of await readdir(dir,{withFileTypes:true})){const path=`${dir}/${e.name}`;if(e.isDirectory())await scan(path);else paths.push(path);}}
for(const root of roots)await scan(root);
const text=[],binary=[];
for(const path of paths){const buf=await readFile(path);if(path.endsWith('.png'))binary.push({path,content:buf.toString('base64')});else text.push({path,mode:'100644',type:'blob',content:buf.toString('utf8')});}
console.log(JSON.stringify(process.argv.includes('--text-only')?{text,binary:binary.map(b=>({path:b.path}))}:{text,binary}));
