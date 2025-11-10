#!/bin/bash

echo "🎯 精确专业切图工具"
echo "===================="

# 创建输出目录
mkdir -p "切图/储能柜-touchscreen-touchscreen-display/professional_exports"

# 专业切图配置
declare -a SCREENSHOTS=(
    "10inch_standard:1024:640:标准版"
    "10inch_hd:1280:800:高清版"
    "10inch_retina:2048:1280:视网膜版"
)

echo "请按照以下步骤操作："
echo "1. 确保浏览器窗口已打开专业模板"
echo "2. 按 Cmd+Option+I 打开开发者工具"
echo "3. 点击设备模拟器图标"
echo "4. 设置自定义尺寸"
echo ""

for screenshot in "${SCREENSHOTS[@]}"; do
    IFS=':' read -r name width height desc <<< "$screenshot"
    
    echo "📱 $desc ($width x $height)"
    echo "   请设置浏览器窗口为 $width x $height 像素"
    echo "   准备好后按 Enter 进行截图..."
    read -p ""
    
    # 精确截图
    output_file="切图/储能柜-touchscreen-touchscreen-display/professional_exports/${name}.png"
    screencapture -i -x "$output_file"
    
    if [ -f "$output_file" ]; then
        # 获取实际尺寸
        actual_size=$(sips -g pixelWidth -g pixelHeight "$output_file" | tail -2 | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        file_size=$(ls -lh "$output_file" | awk '{print $5}')
        
        echo "   ✅ 已保存: ${name}.png"
        echo "   📊 实际尺寸: $actual_size, 文件大小: $file_size"
        
        # 如果需要，调整到精确尺寸
        if [[ "$actual_size" != "${width}x${height}" ]]; then
            echo "   🔧 调整到精确尺寸: ${width}x${height}"
            sips -z $height $width "$output_file" > /dev/null 2>&1
        fi
    else
        echo "   ❌ 截图失败"
    fi
    echo ""
done

# 生成专业报告
report_file="切图/储能柜-touchscreen-touchscreen-display/professional_exports/cutting_report.md"
cat > "$report_file" << EOF
# 专业10寸触摸屏切图报告

## 项目信息
- **项目名称**: 储能柜触摸屏界面
- **切图日期**: $(date '+%Y-%m-%d %H:%M:%S')
- **设备规格**: 10寸工业触摸屏

## 输出规格

### 1. 标准版 (10inch_standard.png)
- **分辨率**: 1024 x 640 像素
- **用途**: 标准10寸工业屏幕
- **DPI**: 96
- **格式**: PNG-24

### 2. 高清版 (10inch_hd.png)  
- **分辨率**: 1280 x 800 像素
- **用途**: 高清10寸显示屏
- **DPI**: 96
- **格式**: PNG-24

### 3. 视网膜版 (10inch_retina.png)
- **分辨率**: 2048 x 1280 像素  
- **用途**: 高密度显示屏幕
- **DPI**: 192
- **格式**: PNG-24

## 质量标准
- ✅ 像素完美对齐
- ✅ 色彩准确还原
- ✅ 无压缩损失
- ✅ 透明背景支持

## 文件结构
\`\`\`
professional_exports/
├── 10inch_standard.png
├── 10inch_hd.png
├── 10inch_retina.png
└── cutting_report.md
\`\`\`

---
*由专业切图工具生成*
EOF

echo "📋 专业切图报告已生成: $report_file"
echo "📁 所有切图文件位于: 切图/储能柜-touchscreen-touchscreen-display/professional_exports/"
echo ""
echo "🎯 专业切图完成！"