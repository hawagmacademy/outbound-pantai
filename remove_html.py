import os
import re

directory = r"d:\GM\Tour-pro\Tour-pro"

pattern1 = re.compile(r'\.html"')
pattern2 = re.compile(r'\.html#')
pattern3 = re.compile(r'\.html\'')

count = 0
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = pattern1.sub('"', content)
        new_content = pattern2.sub('#', new_content)
        new_content = pattern3.sub("'", new_content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
            count += 1

print(f"Total files updated: {count}")
