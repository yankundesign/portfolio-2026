from PIL import Image, ImageFilter, ImageDraw
import numpy as np, json
from scipy import ndimage
L='layers/'
meta={}
cov=Image.open('cover-src.png').convert('RGB')
cov.save(L+'cover.png')
# ---- clean background: inpaint panel areas by normalized blur
c=np.asarray(cov).astype(float)
mask=np.ones(c.shape[:2])
for (x0,y0,x1,y1) in [(85,234,373,866),(397,234,686,866),(710,403,1834,1035)]:
    mask[y0-2:y1+2,x0-2:x1+2]=0
import scipy.sparse as sp, scipy.sparse.linalg as spl
f=4
cs=np.asarray(cov.resize((1920//f,1200//f),Image.BOX)).astype(float)
ms=mask[::f,::f].copy()
# shrink known region slightly (panel edge contamination)
ms=ndimage.binary_erosion(ms>0.5,iterations=2).astype(float)
h,w=ms.shape; idx=-np.ones((h,w),int); unk=np.argwhere(ms<0.5); idx[tuple(unk.T)]=np.arange(len(unk))
rows=[];cols=[];vals=[];rhs=np.zeros((len(unk),3))
for k,(y,x) in enumerate(unk):
    rows.append(k);cols.append(k);vals.append(4.0)
    for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
        yy,xx=min(max(y+dy,0),h-1),min(max(x+dx,0),w-1)
        if idx[yy,xx]>=0: rows.append(k);cols.append(idx[yy,xx]);vals.append(-1.0)
        else: rhs[k]+=cs[yy,xx]
A=sp.csr_matrix((vals,(rows,cols)),shape=(len(unk),len(unk)))
sol=np.stack([spl.spsolve(A,rhs[:,i]) for i in range(3)],-1)
fs=cs.copy(); fs[tuple(unk.T)]=sol
fill=np.asarray(Image.fromarray(np.clip(fs,0,255).astype(np.uint8)).resize((1920,1200),Image.BICUBIC)).astype(float)
soft=ndimage.gaussian_filter(ndimage.binary_erosion(mask>0.5,iterations=6).astype(float),2)[...,None]
out=c*soft+fill*(1-soft)
rng=np.random.default_rng(1); out+= (rng.normal(0,1.0,out.shape[:2])[...,None])*(1-soft)
Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(L+'bg.png')

def rebuild_bars(img, bars, bottom, gapcols):
    a=np.asarray(img.convert('RGBA')).astype(float).copy()
    src=a.copy()
    for (x0,x1,top) in bars:
        rs=src[top-2:bottom+3][:, gapcols].mean(axis=1)
        # column sample: median of rows above top
        above=src[max(top-40,0):top-4, x0-1:x1+2]
        colmed=np.median(above,axis=0)
        for i,x in enumerate(range(x0-1,x1+2)):
            for j,y in enumerate(range(top-2,bottom+3)):
                px=rs[j].copy()
                cm=colmed[i]
                if cm[:3].mean()<246:  # vertical gridline
                    px[:3]=np.minimum(px[:3],cm[:3])
                a[y,x]=px
    return Image.fromarray(np.clip(a,0,255).astype(np.uint8))

# ---- panel 2 bars
p2=Image.open('p2.png')
b2=np.asarray(p2.convert('RGB')).astype(int)
bars2=[]
for (x0,x1) in [(190,228),(270,308),(350,388),(430,468)]:
    col=b2[:,(x0+x1)//2]; ys=[y for y in range(500,840) if col[y][0]<40 and col[y][1]>140]
    bars2.append((x0,x1,min(ys)))
bottom2=max(y for y in range(800,860) if b2[y,209][0]<40 and b2[y,209][1]>140)
print('bars2',bars2,bottom2)
rebuild_bars(p2,bars2,bottom2,[182,262,342,422]).save(L+'p2-empty.png')
meta['bars2']=dict(bars=bars2,bottom=bottom2,color='rgb(0,163,181)')
# ---- panel 3 bars
p3=Image.open('p3.png')
b3=np.asarray(p3.convert('RGB')).astype(int)
bars3=[]
for (x0,x1) in [(853,920),(931,999),(1009,1077),(1088,1156),(1166,1234)]:
    col=b3[:,x0+3]; ys=[y for y in range(600,850) if col[y][2]>240 and col[y][0]<170 and col[y][0]>100]
    bars3.append((x0,x1,min(ys)))
bottom3=842
print('bars3',bars3)
p3e=rebuild_bars(p3,bars3,bottom3,[924,925,926,927,928,1002,1003,1004,1005,1006,1080,1081,1082,1083,1084,1159,1160,1161,1162])
# ---- timeline
row=b3[757]
dark=[x for x in range(1300,1950) if abs(row[x][0]-29)<6 and abs(row[x][1]-105)<6 and abs(row[x][2]-204)<6]
runs=[];s=dark[0];p=dark[0]
for x in dark[1:]:
    if x!=p+1: runs.append((s,p)); s=x
    p=x
runs.append((s,p))
dots=[((s+e)/2) for s,e in runs if e-s>6]
# hollow dot: gray ring near 1900
gray=[x for x in range(1850,1950) if abs(row[x][0]-140)<25 and row[x][2]>row[x][0]]
print('runs',runs,'gray',gray[:3],gray[-3:])
hollow=(gray[0]+gray[-1])/2 if gray else 1900
dots.append(hollow)
cy=757
print('dots',dots)
a3=np.asarray(p3e.convert('RGBA')).copy()
orig=np.asarray(p3.convert('RGBA')).copy()
x0s=int(dots[0]-14); x1s=int(hollow+14); y0s=cy-14; y1s=cy+14
# line-only strip: line column sample between dot1 and dot2
gapx=int((dots[0]+dots[1])/2)
linecol=orig[y0s:y1s, gapx].copy()
strip=orig[y0s:y1s, x0s:x1s].copy()
white=orig[y0s-20, gapx].copy()
R=12
for i,d in enumerate(dots):
    for x in range(int(d-R),int(d+R)+1):
        xi=x-x0s
        if i==len(dots)-1:
            strip[:,xi]=white if x>d-R+2 else strip[:,xi]
        else:
            strip[:,xi]=linecol
# first dot: left of first dot should be white (line starts at dot)
for x in range(x0s,int(dots[0])+1): strip[:,x-x0s]=white
Image.fromarray(strip).save(L+'tl-line.png')
# erase timeline from empty plate
a3[y0s:y1s, x0s:x1s]=white
Image.fromarray(a3).save(L+'p3-empty.png')
# dot sprites with circular alpha
dotimgs=[]
for i,d in enumerate(dots):
    cx=int(round(d)); crop=orig[cy-R:cy+R+1, cx-R:cx+R+1].copy()
    yy,xx=np.mgrid[-R:R+1,-R:R+1]; dist=np.sqrt(xx**2+yy**2)
    rr=10.2
    al=np.clip((rr-dist)+0.5,0,1)*255
    crop[...,3]=al.astype(np.uint8)
    Image.fromarray(crop).save(L+f'dot{i}.png'); dotimgs.append([cx-R,cy-R])
meta['bars3']=dict(bars=bars3,bottom=bottom3,color='rgb(125,138,255)')
meta['timeline']=dict(x=x0s,y=y0s,w=x1s-x0s,h=y1s-y0s,dots=dotimgs,size=2*R+1,centers=dots)
# ---- pins: label crops (detect label bounds around pin icon by non-map pixels)
m=(b3[...,0]>200)&(b3[...,1]<120)&(b3[...,2]<150)&(b3[...,2]>60)
lab,n=ndimage.label(m)
pins=[]
for s in ndimage.find_objects(lab):
    ys,xs=s
    if ys.stop-ys.start<6: continue
    icx=(xs.start+xs.stop)/2; icy=(ys.start+ys.stop)/2
    # label pill: scan right along row icy for white-ish pill until the number badge ends
    pins.append(dict(cx=icx,cy=icy))
meta['pins']=pins
json.dump(meta,open(L+'meta.json','w'),indent=1)
print(pins)
# ---- logo sprite (panel 2 header) + erase from base
p2e=np.asarray(Image.open(L+'p2-empty.png').convert('RGBA')).copy()
p2o=np.asarray(Image.open('p2.png').convert('RGBA'))
lcx,lcy,LR=59,361,26
bgc=p2o[lcy, 30].copy()
print('logo bg', bgc, p2o[335,59], p2o[390,59])
spr=p2o[lcy-LR:lcy+LR+1, lcx-LR:lcx+LR+1].copy()
yy,xx=np.mgrid[-LR:LR+1,-LR:LR+1]; dist=np.sqrt(xx**2+yy**2)
spr[...,3]=(np.clip(LR-1-dist,0,1)*255).astype(np.uint8)
Image.fromarray(spr).save(L+'logo.png')
region=p2e[lcy-LR:lcy+LR+1, lcx-LR:lcx+LR+1]
inside=dist<LR-0.5
region[inside]=bgc
Image.fromarray(p2e).save(L+'p2-empty.png')
meta['logo']=dict(x=lcx-LR,y=lcy-LR,size=2*LR+1)
json.dump(meta,open(L+'meta.json','w'),indent=1)
