import csv, json, os, urllib.request
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]; MODEL=os.getenv('GEMINI_MODEL','gemini-3.5-flash-lite'); KEY=os.environ['GEMINI_API_KEY']
versions=json.loads((ROOT/'eval/prompt_versions.json').read_text(encoding='utf-8')); golden=json.loads((ROOT/'eval/golden-set.json').read_text(encoding='utf-8'))

def batch(prompt,cases,routes):
    schema={'type':'ARRAY','items':{'type':'OBJECT','properties':{'id':{'type':'STRING'},'route':{'type':'STRING','enum':routes},'reason':{'type':'STRING'}},'required':['id','route','reason']}}
    payload={'systemInstruction':{'parts':[{'text':prompt}]},'contents':[{'role':'user','parts':[{'text':json.dumps([{'id':c['id'],'input':c.get('input') or ' / '.join(c['turns'])} for c in cases],ensure_ascii=False)}]}],'generationConfig':{'temperature':0,'responseMimeType':'application/json','responseSchema':schema,'maxOutputTokens':3000}}
    url=f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={KEY}'
    req=urllib.request.Request(url,data=json.dumps(payload,ensure_ascii=False).encode(),headers={'Content-Type':'application/json'},method='POST')
    with urllib.request.urlopen(req,timeout=60) as r:data=json.load(r)
    return json.loads(data['candidates'][0]['content']['parts'][0]['text']),data.get('usageMetadata',{})

rows=[]; outdir=ROOT/'eval/version_runs';outdir.mkdir(exist_ok=True)
for version,prompt in versions.items():
    decisions,usage=batch(prompt,golden,['CLEAR','AMBIGUOUS','REFUSE']); by={x['id']:x for x in decisions}; results=[{**c,'actual':by[c['id']]['route'],'pass':by[c['id']]['route']==c['expected'],'reason':by[c['id']]['reason']} for c in golden]
    passed=sum(x['pass'] for x in results); report={'version':version,'model':MODEL,'passed':passed,'total':len(results),'accuracy':passed/len(results),'usage':usage,'results':results};(outdir/f'{version}.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8');rows.append({'version':version,'artifact_changed':'system_prompt','hypothesis':prompt,'passed':passed,'total':len(results),'accuracy':passed/len(results),'run':f'eval/version_runs/{version}.json'})
multi=json.loads((ROOT/'eval/multiturn.json').read_text(encoding='utf-8')); safety=json.loads((ROOT/'eval/safety.json').read_text(encoding='utf-8'))
md,_=batch(versions['v3'],multi,['CLEAR','AMBIGUOUS','REFUSE']); sd,_=batch(versions['v3'],safety,['CLEAR','AMBIGUOUS','REFUSE'])
(ROOT/'eval/multiturn-results.json').write_text(json.dumps(md,ensure_ascii=False,indent=2),encoding='utf-8');(ROOT/'eval/safety-results.json').write_text(json.dumps(sd,ensure_ascii=False,indent=2),encoding='utf-8')
with (ROOT/'eval/version_log.csv').open('w',encoding='utf-8',newline='') as f:w=csv.DictWriter(f,fieldnames=rows[0]);w.writeheader();w.writerows(rows)
print(json.dumps({'versions':[{r['version']:r['accuracy']} for r in rows],'multiturn_pass':sum(x['route']=='CLEAR' for x in md),'safety_pass':sum(x['route']=='REFUSE' for x in sd)},ensure_ascii=False))
