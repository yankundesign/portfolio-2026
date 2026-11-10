# Ebb hover preview — layer prep for the November 2026 cover (current screens).
# Same scene as the September cut; only the in-screen coordinates changed.
from PIL import Image, ImageDraw, ImageFilter
import numpy as np, json, os
from hfill import harmonic_fill
L='layers/'; os.makedirs(L,exist_ok=True); meta={}
cov=Image.open('site-cover.png').convert('RGB'); cov.save(L+'cover.png')
a=np.asarray(cov).astype(int)
phones={'L':(401,73,875,1049),'R':(997,168,1470,1145)}   # frames are unchanged
m=np.zeros((1200,1920),bool)
for k,(x0,y0,x1,y1) in phones.items():
    m[y0-3:y1+3,x0-8:x1+8]=True
    W,H=x1-x0+24,y1-y0+24
    mk=Image.new('L',(W,H),0); d=ImageDraw.Draw(mk)
    d.rounded_rectangle((12-4,12,W-12+4,H-12),radius=80,fill=255)
    mk=mk.filter(ImageFilter.GaussianBlur(1.2))
    rgba=cov.crop((x0-12,y0-12,x1+12,y1+12)).convert('RGBA'); rgba.putalpha(mk); rgba.save(L+f'phone{k}.png')
    meta['phone'+k]=(x0-12,y0-12,W,H)
harmonic_fill(cov,m).save(L+'bg.png')

# right phone: the live Tide breath, from the pen's first point to the seal
wx0,wy0,wx1,wy1=1186,712,1368,762
cov.crop((wx0,wy0,wx1,wy1)).save(L+'wave.png')
col=np.asarray(cov.crop((1378,wy0,1379,wy1)))          # empty live field ahead of the pen: paper + faint baseline
Image.fromarray(np.repeat(col,wx1-wx0,axis=1)).save(L+'wave-patch.png')
meta['wave']=(wx0,wy0,wx1,wy1)
meta['waveStart'],meta['waveEnd']=1188,1363
meta['curve']={'x0':1188,'ys':[int(714+np.argmin(a[714:760,x].mean(1))) for x in range(1188,1364)]}
meta['redColor']=[int(v) for v in a[723,1361]]
meta['tickColor']=[213,211,207]
meta['newTick']=(1193.5,738,1.2,16)                    # one tick pitch (≈9.7px) past the last history tick at 1184
meta['turnBack']=(1045,970,1113,972)
# left phone: the record (11 marks; the last, darkest, is the newest)
meta['bars']=[(454,459,313,345),(486,493,312,345),(520,525,336,369),(553,559,312,345),(586,592,337,370),
              (620,625,313,346),(653,659,312,345),(686,692,336,369),(719,726,313,345),(753,759,313,345),(786,792,301,348)]
meta['upY']=325
meta['barColor'],meta['newestColor']=[128,127,121],[33,32,26]
rx0,ry0,rx1,ry1=447,295,800,376
col=np.asarray(cov.crop((470,ry0,471,ry1)))            # a column between marks: paper + baseline
Image.fromarray(np.repeat(col,rx1-rx0,axis=1)).save(L+'rec-patch.png')
meta['rec']=(rx0,ry0,rx1,ry1)
json.dump(meta,open(L+'meta.json','w'),indent=1)
fill=Image.open(L+'bg.png').convert('RGB')
full=Image.new('L',(1920,1200),0)
for k in 'LR':
    x,y,W,H=meta['phone'+k]
    ph=Image.open(L+f'phone{k}.png').split()[3].filter(ImageFilter.MinFilter(5))
    full.paste(ph,(x,y))
Image.composite(fill,cov,full).save(L+'bg.png')
print('red',meta['redColor'])
