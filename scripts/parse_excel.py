import sys
import io
import json
import zipfile
import xml.etree.ElementTree as ET

with zipfile.ZipFile('SIH.xlsx', 'r') as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            txt = ''.join([node.text for node in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if node.text])
            shared_strings.append(txt)
    
    wb_tree = ET.fromstring(z.read('xl/workbook.xml'))
    sheets = wb_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheets/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet')
    sheet_names = [s.attrib['name'] for s in sheets]

    all_data = []

    for sheet_idx, sheet_name in enumerate(sheet_names, 1):
        sheet_path = f'xl/worksheets/sheet{sheet_idx}.xml'
        if sheet_path in z.namelist():
            sh_tree = ET.fromstring(z.read(sheet_path))
            rows = sh_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
            if not rows: continue
            
            for r in rows[1:]:
                row_vals = []
                for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                    val = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                    v_text = val.text if val is not None else ''
                    if c.attrib.get('t') == 's' and v_text.isdigit() and int(v_text) < len(shared_strings):
                        row_vals.append(shared_strings[int(v_text)].strip())
                    else:
                        row_vals.append(v_text.strip())
                
                if row_vals and row_vals[0] and row_vals[0].startswith('SIH26'):
                    reg_id = row_vals[0]
                    is_pool = 'POOL' in reg_id or 'Solo' in sheet_name
                    
                    if sheet_name == 'Sheet1':
                        all_data.append({
                            'registrationId': reg_id,
                            'type': 'full_team',
                            'teamName': row_vals[2] if len(row_vals) > 2 else '',
                            'teamLeader': row_vals[3] if len(row_vals) > 3 else '',
                            'leaderPhone': '7702202906',
                            'memberCount': 6,
                            'problemStatementId': row_vals[6] if len(row_vals) > 6 else 'SIH26001',
                            'problemStatementTitle': row_vals[7] if len(row_vals) > 7 else 'Smart Technology Prototype',
                            'problemStatementDomain': row_vals[8] if len(row_vals) > 8 else 'General',
                            'membersText': row_vals[17] if len(row_vals) > 17 else (row_vals[-1] if len(row_vals) > 5 else '')
                        })
                    elif sheet_name == 'Complete Teams':
                        all_data.append({
                            'registrationId': reg_id,
                            'type': 'full_team',
                            'teamName': row_vals[2] if len(row_vals) > 2 else '',
                            'teamLeader': row_vals[3] if len(row_vals) > 3 else '',
                            'leaderPhone': row_vals[4] if len(row_vals) > 4 else '',
                            'memberCount': 6,
                            'problemStatementId': row_vals[7] if len(row_vals) > 7 else 'SIH26002',
                            'problemStatementTitle': row_vals[8] if len(row_vals) > 8 else 'AI / Software Solution',
                            'problemStatementDomain': row_vals[9] if len(row_vals) > 9 else 'Software',
                            'membersText': row_vals[16] if len(row_vals) > 16 else ''
                        })
                    else:
                        all_data.append({
                            'registrationId': reg_id,
                            'type': 'matchmaking',
                            'teamName': f'Solo ({row_vals[2]})' if len(row_vals) > 2 else 'Solo Participant',
                            'teamLeader': row_vals[2] if len(row_vals) > 2 else '',
                            'leaderPhone': row_vals[3] if len(row_vals) > 3 else '',
                            'memberCount': int(float(row_vals[4])) if len(row_vals) > 4 and row_vals[4].replace('.','',1).isdigit() else 1,
                            'skills': row_vals[5] if len(row_vals) > 5 else 'General',
                            'teamNeedNote': row_vals[6] if len(row_vals) > 6 else 'Looking for teammates',
                            'problemStatementId': 'N/A',
                            'problemStatementTitle': 'To be chosen after team formation',
                            'problemStatementDomain': 'N/A',
                            'membersText': row_vals[16] if len(row_vals) > 16 else (row_vals[-1] if len(row_vals) > 10 else '')
                        })

    out = '// Pre-loaded official registrations from SIH.xlsx\n'
    out += 'export type ExistingRegistrationRecord = {\n'
    out += '  registrationId: string;\n'
    out += '  type: "full_team" | "matchmaking";\n'
    out += '  teamName: string;\n'
    out += '  teamLeader: string;\n'
    out += '  leaderPhone: string;\n'
    out += '  memberCount: number;\n'
    out += '  skills?: string;\n'
    out += '  teamNeedNote?: string;\n'
    out += '  problemStatementId: string;\n'
    out += '  problemStatementTitle: string;\n'
    out += '  problemStatementDomain?: string;\n'
    out += '  membersText?: string;\n'
    out += '};\n\n'
    out += 'export const EXISTING_REGISTRATIONS: ExistingRegistrationRecord[] = ' + json.dumps(all_data, indent=2, ensure_ascii=False) + ';\n'
    
    with open('src/data/existingRegistrations.ts', 'w', encoding='utf-8') as f:
        f.write(out)
    print(f'Successfully generated src/data/existingRegistrations.ts with {len(all_data)} records.')
