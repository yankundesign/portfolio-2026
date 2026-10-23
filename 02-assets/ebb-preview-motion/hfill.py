from PIL import Image
import numpy as np
from scipy import ndimage
import scipy.sparse as sp, scipy.sparse.linalg as spl
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

