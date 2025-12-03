import os

def create_logo(filename):
    width, height = 512, 512
    stroke_w = 110
    pad = 80
    
    # 坐标点
    p1 = (pad, pad)             # 左上
    p2 = (pad, height - pad)    # 左下
    p3 = (width - pad, height - pad) # 右下
    p4 = (width - pad, pad)     # 右上
    
    # 构建 SVG 字符串 (直接写 XML)
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
    <defs>
        <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0d9488" /> <stop offset="100%" stop-color="#34d399" /> </linearGradient>
    </defs>
    
    <path d="M {p2[0]},{p2[1]} L {p1[0]},{p1[1]} L {p3[0]},{p3[1]} L {p4[0]},{p4[1]}" 
          stroke="url(#tealGrad)" 
          stroke-width="{stroke_w}" 
          fill="none" 
          stroke-linecap="round" 
          stroke-linejoin="round" />
          
    <circle cx="{p1[0]}" cy="{p1[1]}" r="{stroke_w/3.5}" fill="white" />
    <circle cx="{p3[0]}" cy="{p3[1]}" r="{stroke_w/3.5}" fill="white" />
</svg>'''

    # 确保目录存在
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    # 写入文件
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print(f"Generated [Zero-Dependency]: {filename}")

if __name__ == '__main__':
    # 生成主 Logo
    create_logo('public/logo.svg')
    # 生成 Favicon (同样也是 SVG，浏览器支持更好)
    create_logo('public/favicon.svg')
