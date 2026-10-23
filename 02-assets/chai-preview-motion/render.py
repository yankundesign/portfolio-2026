import asyncio, json, sys, os
from playwright.async_api import async_playwright
FPS_SUB=int(os.environ.get('SUBFPS','120'))
times=[float(x) for x in sys.argv[1].split(',')] if len(sys.argv)>1 and sys.argv[1]!='all' else None
outdir=sys.argv[2] if len(sys.argv)>2 else 'frames'
os.makedirs(outdir,exist_ok=True)
html=open('scene.html').read().replace('META_JSON',open('layers/meta.json').read())
open('scene_built.html','w').write(html)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--force-device-scale-factor=1'])
        pg=await b.new_page(viewport={'width':1280,'height':800})
        await pg.goto('file://'+os.path.abspath('scene_built.html'))
        await pg.wait_for_load_state('networkidle')
        await pg.evaluate('Promise.all([...document.images].map(i=>i.decode()))')
        vp=await pg.query_selector('#vp')
        ts = times if times else [i/FPS_SUB for i in range(int(6*FPS_SUB))]
        for i,t in enumerate(ts):
            await pg.evaluate(f'render({t})')
            name = f'{outdir}/f{i:05d}.png' if not times else f'{outdir}/t{t:.2f}.png'
            await pg.screenshot(path=name, clip={'x':0,'y':0,'width':1280,'height':800})
        await b.close()
asyncio.run(main())
