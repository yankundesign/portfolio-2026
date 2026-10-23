from PIL import Image, ImageDraw, ImageFilter
import numpy as np, json
from hfill import harmonic_fill
L='layers/'; meta={}
cov=Image.open('site-cover.png').convert('RGB'); cov.save(L+'cover.png')
a=np.asarray(cov).astype(int)
phones={'L':(401,73,875,1049),'R':(997,168,1470,1145)}
m=np.zeros((1200,1920),bool)
for k,(x0,y0,x1,y1) in phones.items():
    m[y0-3:y1+3,x0-8:x1+8]=True
    # soft rounded mask for the phone group
    W,H=x1-x0+24,y1-y0+24
    mk=Image.new('L',(W,H),0); d=ImageDraw.Draw(mk)
    d.rounded_rectangle((12-4,12,W-12+4,H-12),radius=80,fill=255)
    mk=mk.filter(ImageFilter.GaussianBlur(1.2))
    rgba=cov.crop((x0-12,y0-12,x1+12,y1+12)).convert('RGBA'); rgba.putalpha(mk); rgba.save(L+f'phone{k}.png')
    meta['phone'+k]=(x0-12,y0-12,W,H)
harmonic_fill(cov,m).save(L+'bg.png')
# right phone wave pieces (cover coords)
wx0,wy0,wx1,wy1=1180,708,1404,778
cov.crop((wx0,wy0,wx1,wy1)).save(L+'wave.png')
col=np.asarray(cov.crop((1170,wy0,1171,wy1)))
patch=np.repeat(col,wx1-wx0,axis=1); Image.fromarray(patch).save(L+'wave-patch.png')
meta['wave']=(wx0,wy0,wx1,wy1)
curve=[]
for x in range(1186,1398):
    c=a[712:776,x].mean(1); curve.append(int(712+np.argmin(c)))
meta['curve']={'x0':1186,'ys':curve}
meta['dot']=(1396,770); meta['redColor']=[int(v) for v in a[770,1396]]
meta['tickColor']=[int(v) for v in a[760,1128]]
meta['turnBack']=(1045,954,1116,957)
# left record: bars
bars=[(459,465,343,378),(492,498,318,353),(525,532,318,353),(559,565,318,353),(592,598,343,378),(625,632,318,353),(658,666,318,353),(692,698,343,378),(725,732,343,378),(759,765,318,353),(792,798,306,356)]
meta['bars']=bars
rx0,ry0,rx1,ry1=452,300,806,386
col=np.asarray(cov.crop((475,ry0,476,ry1)))  # a column between bars: paper + baseline
Image.fromarray(np.repeat(col,rx1-rx0,axis=1)).save(L+'rec-patch.png')
meta['rec']=(rx0,ry0,rx1,ry1)
json.dump(meta,open(L+'meta.json','w'),indent=1)
print(meta['redColor'],meta['tickColor'])
# keep real texture everywhere the phone layer doesn't fully cover
fill=Image.open(L+'bg.png').convert('RGB')
full=Image.new('L',(1920,1200),0)
for k in 'LR':
    x,y,W,H=meta['phone'+k]
    ph=Image.open(L+f'phone{k}.png').split()[3].filter(ImageFilter.MinFilter(5))
    full.paste(ph,(x,y))
Image.composite(fill,cov,full).save(L+'bg.png')
