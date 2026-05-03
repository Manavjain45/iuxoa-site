import base64, os
chunks = []
for i in range(10):
    fname = f'D:/Projects/IuXoa/1/imgchunk_{i:02d}.txt'
    with open(fname) as f:
        chunks.append(f.read().replace('\n','').replace('\r',''))
    os.remove(fname)
b64 = ''.join(chunks)
img = base64.b64decode(b64)
with open('D:/Projects/IuXoa/1/src/assets/team/team-group.jpg', 'wb') as f:
    f.write(img)
os.remove('D:/Projects/IuXoa/1/decode_img.py')
print(f'Done! Saved {len(img)} bytes')
