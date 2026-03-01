import json, os, re, sys

try:
    base = r'd:\000_portfolio_2025\Portfolio\1_curiosity-os\curiosity-os'
    path = os.path.join(base, 'content', '8_digital')
    with open(os.path.join(path, 'master_universe.json'), 'r', encoding='utf-8') as f:
        data = json.load(f)

    for node in data:
        frontmatter = f"---\ntitle: \"{node.get('title')}\"\nicon: \"{node.get('icon', 'Hexagon')}\"\ndomain: \"{node.get('domain')}\"\n---\n\n"
        content = ""
        for k, v in node.items():
            if k not in ['id', 'title', 'icon', 'domain', 'linked_nodes']:
                heading = " ".join([w.capitalize() for w in k.split('_')])
                v = str(v)
                v = re.sub(r'\s*\.?\s*cite(turn\d+search\d+)+\.?', '', v)
                content += f"## {heading}\n{v}\n\n"
        content += "## Linked Possibilities\n"
        for link in node.get('linked_nodes', []):
            content += f"- [[{link}]]\n"
        with open(os.path.join(path, f'{node["id"]}.md'), 'w', encoding='utf-8') as f:
            f.write(frontmatter + content)
        
    with open(os.path.join(base, 'debug_success.txt'), 'w') as f:
        f.write('Success generated '+str(len(data))+' files')
except Exception as e:
    with open(r'd:\000_portfolio_2025\Portfolio\1_curiosity-os\curiosity-os\debug_error.txt', 'w') as f:
        f.write(str(e))
