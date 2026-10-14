import {build} from 'esbuild';
await build({entryPoints:['scripts/build/entry.ts'],outfile:'.build/core.cjs',bundle:true,platform:'node',format:'cjs',packages:'external'});
