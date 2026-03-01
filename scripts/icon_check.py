import json
import re

with open('content/8_digital/master_universe.json', encoding='utf-8') as f:
    data = json.load(f)
    digital_icons = set([n['icon'] for n in data])

with open('components/UniverseGraph.tsx', encoding='utf-8') as f:
    content = f.read()
    importe_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'\"]lucide-react[\'\"]', content)
    imported_icons = set([i.strip() for i in importe_match.group(1).split(',')])

missing = digital_icons - imported_icons
print('Missing:', ', '.join(missing))
