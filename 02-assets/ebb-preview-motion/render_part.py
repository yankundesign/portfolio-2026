import asyncio, sys, os
from playwright.async_api import async_playwright
SUB=480; a,b=int(sys.argv[1]),int(sys.argv[2])
async def main():
    async with async_playwright() as p:
        br=await p.chromium.launch(args=['--force-device-scale-factor=1'])
        pg=await br.new_page(viewport={'width':1280,'height':800})
        await pg.goto('file://'+os.path.abspath('scene_built.html')); await pg.wait_for_load_state('networkidle')
        await pg.evaluate('Promise.all([...document.images].map(i=>i.decode()))')
        for i in range(a,b):
            fn=f'frames/f{i:05d}.png'
            if os.path.exists(fn) and os.path.getsize(fn)>0: continue
            await pg.evaluate(f'render({i/SUB})')
            await pg.screenshot(path=fn, clip={'x':0,'y':0,'width':1280,'height':800})
        await br.close()
asyncio.run(main())
