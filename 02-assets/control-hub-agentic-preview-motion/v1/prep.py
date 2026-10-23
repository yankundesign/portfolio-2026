from PIL import Image
import numpy as np, json
from scipy import ndimage
import scipy.sparse as sp, scipy.sparse.linalg as spl
L='layers/'; meta={}

def harmonic_fill(img_rgb, unknown_mask, f=4):
    """Fill unknown_mask (True=unknown) smoothly from surroundings (Laplace)."""
    c=np.asarray(img_rgb).astype(float)
    H,W=unknown_mask.shape
    cs=np.asarray(img_rgb.resize((W//f,H//f),Image.BOX)).astype(float)
    ms=~ndimage.binary_dilation(unknown_mask,iterations=f*2)[::f,::f][:H//f,:W//f]
    h,w=ms.shape; idx=-np.ones((h,w),int); unk=np.argwhere(~ms); idx[tuple(unk.T)]=np.arange(len(unk))
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
    fill=np.asarray(Image.fromarray(np.clip(fs,0,255).astype(np.uint8)).resize((W,H),Image.BICUBIC)).astype(float)
    known=ndimage.binary_erosion(~unknown_mask,iterations=3).astype(float)
    soft=ndimage.gaussian_filter(known,1.5)[...,None]
    out=c*soft+fill*(1-soft)
    rng=np.random.default_rng(2); out+=rng.normal(0,0.8,out.shape[:2])[...,None]*(1-soft)
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8))

# background: cover minus window (211,161)-(1709,1038)
cov=Image.open('cover-src.png').convert('RGB'); cov.save(L+'cover.png')
m=np.zeros((1200,1920),bool); m[159:1040,209:1711]=True
harmonic_fill(cov,m).save(L+'bg.png')

# agents: empty page + card sprites
ag=Image.open('agents.png').convert('RGBA')
cards=[]
for (y0,y1) in [(396,764),(798,1167)]:
    for (x0,x1) in [(432,1210),(1237,2015),(2042,2820)]:
        cards.append((x0-2,y0-2,x1+3,y1+3))
m=np.zeros((ag.size[1],ag.size[0]),bool)
for i,(x0,y0,x1,y1) in enumerate(cards):
    m[y0:y1,x0:x1]=True
    ag.crop((x0,y0,x1,y1)).save(L+f'card{i}.png')
alpha=np.asarray(ag)[...,3]
empty=harmonic_fill(ag.convert('RGB'),m).convert('RGBA')
e=np.asarray(empty).copy(); e[...,3]=alpha; Image.fromarray(e).save(L+'agents-empty.png')
meta['cards']=cards

# detail: checked + unchecked sprites
dt=Image.open('detail.png').convert('RGBA'); dt.save(L+'detail.png')
meta['checks']=[(1129,1220),(1129,1268)]
dt.crop((1129,1220,1129+30,1220+30)).save(L+'cb-on0.png')
dt.crop((1129,1268,1129+30,1268+30)).save(L+'cb-on1.png')
dt.crop((1129,1316,1129+30,1316+30)).save(L+'cb-off.png')

# overview: prompt text sprite
ov=Image.open('overview.png').convert('RGBA'); ov.save(L+'overview.png')
meta['prompt']=(1434,654,2846,704)
ov.crop(meta['prompt']).save(L+'prompt.png')

# plan: badges
pl=Image.open('plan.png'); pl.save(L+'plan.png')
meta['badges']=[(1266,t,34,33) for t in [737,816,895,974,1052]]
meta['yesRow']=(1214,1446,2324,1502)
json.dump(meta,open(L+'meta.json','w'),indent=1)
print('ok')
