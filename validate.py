import glob
import json
import re
import sys
import xml.etree.ElementTree as ET

fails = []

# 1. no nested button-in-anchor markup anywhere
for f in glob.glob('*.html'):
    s = open(f, encoding='utf-8').read()
    if '<button class="cta-button">' in s:
        fails.append((f, 'nested cta-button'))
    if re.search(r'<a [^>]*><button class="btn ', s):
        fails.append((f, 'nested btn'))
    if 'demo-duration' in s:
        fails.append((f, 'demo-duration left'))
    if 'aria-label="Back to top" aria-hidden' in s:
        fails.append((f, 'back-to-top aria-hidden'))
    if 'vertex-ai' in s.lower():
        fails.append((f, 'old domain/brand left'))
    if 'theme-color' not in s:
        fails.append((f, 'theme-color missing'))
    if 'dhqlimited.com' not in s:
        fails.append((f, 'dhqlimited.com missing'))

# 2. JSON-LD validity
blocks = 0
for f in glob.glob('*.html'):
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', open(f, encoding='utf-8').read(), re.S):
        blocks += 1
        try:
            json.loads(b)
        except Exception as e:
            fails.append((f, 'jsonld: ' + str(e)))

idx = open('index.html', encoding='utf-8').read()
if '"@type": "ItemList"' not in idx:
    fails.append(('index', 'ItemList missing'))
if 'youtube-nocookie.com' in idx:
    pass  # dns-prefetch present is fine

# 3. sitemap valid
try:
    t = ET.parse('sitemap.xml')
    urls = len(t.getroot().findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url'))
    print('sitemap urls:', urls)
except Exception as e:
    fails.append(('sitemap.xml', str(e)))

# 4. svgs parse
for p in ('assets/logo.svg', 'assets/favicon.svg'):
    try:
        ET.parse(p)
    except Exception as e:
        fails.append((p, str(e)))

# 5. script.js markers
js = open('script.js', encoding='utf-8').read()
for marker in ('youtube-nocookie.com/embed', 'lastFocused', 'live\\/'):
    if marker.replace('\\/', '/') not in js and marker not in js:
        fails.append(('script.js', 'missing ' + marker))

print('JSON-LD blocks:', blocks)
print('FAILS:', fails if fails else 'NONE')
sys.exit(0 if not fails else 1)
