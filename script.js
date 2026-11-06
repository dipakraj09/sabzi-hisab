const $=id=>document.getElementById(id);
const M=["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"];
const D=["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"];
const f=n=>{n=Math.round(n*100)/100;return n.toLocaleString("en-IN",n%1?{minimumFractionDigits:2,maximumFractionDigits:2}:{})};
const s=n=>String(+(+n).toFixed(3));
const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
let nid=1,TXT="",bad=false,G={g:"",h:""},MODE="md";
const items=[];
[["🥬","परवल"],["🥬","देसला परवल"],["🌶️","मिर्च"],["🎃","कद्दू"],["🥒","झींगा"],["🥒","तोरई",1]].forEach(a=>items.push({id:nid++,e:a[0],n:a[1],t:!!a[2],tot:"",net:"",rate:"",ret:""}));
"🥬🌶️🎃🥒🍆🥔🧅🍅🥕🍋🫑🌽".match(/\p{Extended_Pictographic}\uFE0F?/gu).forEach(e=>{const b=document.createElement("button");b.textContent=e;b.onclick=()=>{$("ne").value=e};$("emo").appendChild(b)});
function setD(n){const d=new Date();d.setDate(d.getDate()+n);$("dt").value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");out()}
function opt(a,c){return a.map(x=>`<option value="${x}"${x===c?" selected":""}>${x||"— चुनें —"}</option>`).join("")}
function card(it){
 const gr=it.t?`<div class="row"><div><label>तुरई का ग्रुप</label><select onchange="sg(this.value)">${opt(["","A, B","C, D, E","F"],G.g)}</select></div><div id="hf" style="display:${G.g==="C, D, E"?"":"none"}"><label>C, D, E में से</label><select onchange="G.h=this.value;out()">${opt(["","तीनों का आधा","तीनों का पूरा"],G.h)}</select></div></div>`:"";
 const fl=(k,l,p)=>`<div><label>${l}</label><input inputmode="decimal" value="${it[k]}" placeholder="${p}" oninput="upd(${it.id},'${k}',this.value)"></div>`;
 return `<div class="card"><div class="ch"><b>${it.e} ${esc(it.n)}</b><span class="amt" id="a${it.id}">₹0</span><button class="x" onclick="del(${it.id})" title="हटाएँ">✕</button></div>${gr}<div class="g4">${fl("tot","कुल वजन (kg)","वैकल्पिक")+fl("net","नेट वजन (kg)","0")+fl("rate","रेट (₹/kg)","0")+fl("ret","वापसी (kg)","0")}</div></div>`}
function amt(it){const w=+it.net||+it.tot||0,r=+it.rate||0;$("a"+it.id).textContent=w?"₹"+f(w*r-(+it.ret||0)*r):"₹0"}
function draw(){$("list").innerHTML=items.map(card).join("");items.forEach(amt);out()}
function upd(id,k,v){const it=items.find(x=>x.id===id);it[k]=v;amt(it);out()}
function sg(v){G.g=v;if(v!=="C, D, E")G.h="";$("hf").style.display=v==="C, D, E"?"":"none";out()}
function del(id){items.splice(items.findIndex(x=>x.id===id),1);draw()}
function addNew(){const n=$("nn").value.trim();if(!n){$("nn").focus();return}items.push({id:nid++,e:$("ne").value.trim()||"🥬",n,t:false,tot:"",net:"",rate:"",ret:""});$("nn").value="";draw()}
function out(){
 const dv=$("dt").value;let ds="";
 if(dv){const p=dv.split("-"),d=new Date(+p[0],+p[1]-1,+p[2]);ds=d.getDate()+" "+M[d.getMonth()]+" "+d.getFullYear()+" — "+D[d.getDay()]}
 const loc=$("loc").value.trim(),tr=$("tr").value.trim();
 let L=["📒 *सब्जी हिसाब*"];if(ds)L.push("📅 *"+ds+"*");if(loc)L.push("📍 *स्थान: "+loc+"*");
 L.push("");if(tr)L.push("👤 *व्यापारी: "+tr+"*","");
 let tot=0,any=false;bad=false;
 items.forEach(it=>{const t=+it.tot||0,nt=+it.net||0,w=nt||t,r=+it.rate||0;if(!w)return;any=true;
  if(it.t){if(!G.g)bad=true;L.push("> *तोरई — ग्रुप "+(G.g||"?")+(G.h?" ("+G.h+")":"")+"*")}else L.push(it.e+" *"+it.n+"*");
  if(t&&nt)L.push("• कुल वजन: *"+s(t)+" kg*","• नेट वजन: *"+s(nt)+" kg*");else L.push("• वजन: *"+s(w)+" kg*");
  L.push("• रेट: *₹"+s(r)+"/kg*","• राशि: *₹"+f(w*r)+"*");tot+=w*r;
  const rt=+it.ret||0;if(rt){const rv=rt*r;tot-=rv;L.push("• ↩️ वापसी: *"+s(rt)+" kg × ₹"+s(r)+" = -₹"+f(rv)+"*")}
  L.push("")});
 const mv=+$("mv").value||0;if(mv){tot-=mv;L.push("➖ *"+($("ml").value.trim()||"माइनस")+": -₹"+f(mv)+"*","")}
 L.push("━━━━━━━━━━━━━━","💰 *कुल राशि: ₹"+f(tot)+"*","━━━━━━━━━━━━━━");
 const w=$("warn");
 if(bad){w.style.display="block";w.textContent="तुरई का कौन-सा ग्रुप है — A, B / C, D, E / F? ग्रुप चुनने पर हिसाब पूरा होगा।";TXT="";$("out").textContent="⚠️ पहले तुरई का ग्रुप चुनें";$("pv").innerHTML="⚠️ पहले तुरई का ग्रुप चुनें";$("tt").textContent="";return}
 w.style.display="none";
 if(!any){TXT="";$("out").textContent="ऊपर किसी सब्जी का वजन और रेट भरें…";$("pv").textContent="ऊपर किसी सब्जी का वजन और रेट भरें…";$("tt").textContent="";return}
 TXT=L.join("\n");$("out").textContent=TXT;$("tt").textContent="कुल: ₹"+f(tot);
 $("pv").innerHTML=esc(TXT).split("\n").map(l=>{const q=l.startsWith("&gt; ");return '<div class="ln'+(q?" q":"")+'">'+(q?l.slice(5):l).replace(/\*([^*]+)\*/g,"<b>$1</b>")+"</div>"}).join("")}
function mode(m){MODE=m;$("vmd").style.display=m==="md"?"":"none";$("vpv").style.display=m==="pv"?"":"none";$("bm").className=m==="md"?"on":"";$("bp").className=m==="pv"?"on":""}
function cp(){if(!TXT)return;const b=$("bc"),done=()=>{b.textContent="✅ कॉपी हो गया";setTimeout(()=>{b.textContent="📋 कॉपी"},1800)};
 const fb=()=>{const t=document.createElement("textarea");t.value=TXT;document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(e){}t.remove();done()};
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(TXT).then(done,fb);else fb()}
["dt","ml","mv"].forEach(i=>$(i).addEventListener("input",out));
const LS=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return Array.isArray(v)&&v.length?v:d}catch(e){return d}};
const LISTS={loc:LS("sh_loc",["नरधा","नयाटोला","बसगोपाल"]),tr:LS("sh_tr",["Dipak","Deepak Kumar","Garuv"])};
function fillSel(k,cur){const s=$(k);s.innerHTML='<option value="">— चुनें —</option>'+LISTS[k].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("")+'<option value="__new">➕ नया जोड़ें…</option>';s.value=cur||""}
function selChange(k){const s=$(k);if(s.value==="__new"){s.value="";$(k+"n").style.display="flex";$(k+"i").focus()}else $(k+"n").style.display="none";out()}
function addOpt(k){const v=$(k+"i").value.trim();if(!v){$(k+"i").focus();return}
 if(!LISTS[k].includes(v)){LISTS[k].push(v);try{localStorage.setItem("sh_"+k,JSON.stringify(LISTS[k]))}catch(e){}}
 fillSel(k,v);$(k+"i").value="";$(k+"n").style.display="none";out()}
fillSel("loc");fillSel("tr");
setD(0);draw();
