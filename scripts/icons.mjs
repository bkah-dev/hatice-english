import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
const svg=await readFile('public/icon.svg');
for(const [name,size]of [['icon-192.png',192],['icon-512.png',512],['apple-touch-icon.png',180]])await sharp(svg).resize(size,size).png().toFile(`public/${name}`);
await sharp({create:{width:512,height:512,channels:4,background:'#28564b'}}).composite([{input:await sharp(svg).resize(340,340).png().toBuffer(),gravity:'center'}]).png().toFile('public/icon-maskable.png');
