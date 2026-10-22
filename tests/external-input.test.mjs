import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {validateExternalInput} from '../scripts/build/external-input.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));
test('external approval/key boundary is independent of cwd and rejects source paths',async()=>{
 const outside=await fs.mkdtemp(path.join(os.tmpdir(),'frostveil-input-'));
 const inside=path.join(repo,'.local','containment-test.json');
 await fs.mkdir(path.dirname(inside),{recursive:true});await fs.writeFile(inside,'{}');
 const valid=path.join(outside,'approval.json');await fs.writeFile(valid,'{}');
 const previous=process.cwd();try{process.chdir(outside);await assert.rejects(validateExternalInput(inside),/outside repository/);assert.equal(await validateExternalInput(valid),await fs.realpath(valid));}finally{process.chdir(previous);await fs.unlink(inside);await fs.unlink(valid);await fs.rmdir(outside);}
});
test('linked ancestors are rejected before approval/key reads',async()=>{
 const outside=await fs.mkdtemp(path.join(os.tmpdir(),'frostveil-link-'));
 const target=path.join(outside,'target');const link=path.join(outside,'linked');await fs.mkdir(target);await fs.writeFile(path.join(target,'input.json'),'{}');await fs.symlink(target,link,process.platform==='win32'?'junction':'dir');
 try{await assert.rejects(validateExternalInput(path.join(link,'input.json')),/linked ancestor/);}finally{await fs.unlink(link);await fs.unlink(path.join(target,'input.json'));await fs.rmdir(target);await fs.rmdir(outside);}
});
