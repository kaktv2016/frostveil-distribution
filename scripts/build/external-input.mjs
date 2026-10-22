import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const sourceRoot=fileURLToPath(new URL('../../',import.meta.url));
const within=(root,file)=>{const relative=path.relative(root,file);return relative===''||(!relative.startsWith('..'+path.sep)&&!path.isAbsolute(relative));};
export async function validateExternalInput(input){
 const absolute=path.resolve(input);
 // Reject junctions/symlinks in every ancestor before reading sensitive bytes.
 let cursor=absolute;
 while(true){const stat=await fs.lstat(cursor);if(stat.isSymbolicLink())throw Error('Unsafe linked ancestor in approval/key input');const parent=path.dirname(cursor);if(parent===cursor)break;cursor=parent;}
 const canonical=await fs.realpath(absolute),repo=await fs.realpath(sourceRoot);
 const roots=[repo];
 try{roots.push(await fs.realpath(path.join(path.dirname(repo),'skyrim-rp-launcher')));}catch(error){if(error.code!=='ENOENT')throw error;}
 if(roots.some(root=>within(root,canonical)))throw Error('Approval/private key must be outside repository');
 const stat=await fs.lstat(canonical);if(!stat.isFile()||stat.nlink!==1||stat.size>32768)throw Error('Unsafe approval/key input');
 return canonical;
}
