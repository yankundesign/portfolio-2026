import subprocess,os,sys
os.chdir(sys.argv[1])
VF="tmix=frames=4,select='eq(mod(n\\,8)\\,3)',setpts=N/60/TB,format=yuv420p"
run=lambda a: subprocess.run(["ffmpeg","-nostdin","-v","error","-y",*a],check=True)
run(["-framerate","480","-i","frames/f%05d.png","-vf",VF,"-r","60","-c:v","libvpx-vp9","-crf","41","-b:v","0","-row-mt","1","-an","ebb-next-preview.webm"])
run(["-framerate","480","-i","frames/f%05d.png","-vf",VF,"-r","60","-c:v","libx264","-preset","veryslow","-crf","23","-tune","animation","-movflags","+faststart","-an","ebb-next-preview.mp4"])
print("encoded")
