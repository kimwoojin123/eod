(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[886],{9785:function(e,t,r){Promise.resolve().then(r.bind(r,9289))},9289:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return d}});var a=r(3827),n=r(4095),o=r(4090),s=r(8245),i=r.n(s),l=r(8792);function c(e){let{teamId:t}=e,[r,n]=(0,o.useState)([]);(0,o.useEffect)(()=>{!async function(){try{let e=await fetch("/api/request-list/".concat(t));if(!e.ok)throw Error("Failed to fetch idea requests");let r=await e.json();n(r)}catch(e){console.error("Error fetching idea requests:",e)}}()},[t]);let s=async(e,t)=>{try{if(console.log("전송하는 데이터:",{approved:t}),!(await fetch("/api/approve-request/".concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({approved:!t})})).ok)throw Error("Failed to update approval status");let a=r.map(r=>r._id===e?{...r,approved:!t}:r);n(a)}catch(e){console.error("Error updating approval status:",e)}};return(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"요청 아이디어 목록"}),(0,a.jsx)("ul",{children:r.map(e=>(0,a.jsxs)("li",{className:"mb-4",children:[(0,a.jsx)("p",{children:(0,a.jsxs)(l.default,{href:"/ideaSearch/".concat(e._id),children:[(0,a.jsx)("strong",{children:"제목:"})," ",e.title]})}),(0,a.jsx)("button",{onClick:()=>s(e._id,e.approved),className:"rounded-md px-4 py-2 ".concat(e.approved?"bg-green-500 text-white":"bg-blue-500 text-white"),children:e.approved?"승인완료":"승인"})]},e._id))})]})}function d(){let[e,t]=(0,o.useState)([]),[r,s]=(0,o.useState)(!1),[l,d]=(0,o.useState)([]),[p,h]=(0,o.useState)(null),[x,u]=(0,o.useState)(!1),[f,m]=(0,o.useState)(!1),[y,g]=(0,o.useState)(!1),[b,w]=(0,o.useState)("");(0,o.useEffect)(()=>{!async function(){try{let e=(0,n.I)(),r=await fetch("/api/team-manage/".concat(e));if(!r.ok)throw Error("팀 데이터를 불러오는데 문제가 발생했습니다.");let a=await r.json();t(a)}catch(e){console.error("팀 데이터를 불러오는데 문제가 발생했습니다:",e)}}()},[]);let j=async e=>{try{let t=await fetch("/api/inquire-apply/".concat(e));if(!t.ok)throw Error("지원자 정보를 불러오는데 문제가 발생했습니다.");let r=await t.json();d(r.applicants.map(e=>({...e,...e.user_info}))),s(!0)}catch(e){console.error("지원자 정보를 불러오는데 문제가 발생했습니다:",e)}},v=()=>{s(!1),d([])},N=async(e,t)=>{try{if(!(await fetch("/api/approve-applicant/".concat(e),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({team_id:t})})).ok)throw Error("지원자 승인에 실패했습니다.");u(!0),m(!0)}catch(e){console.error("지원자 승인 중 오류 발생:",e)}},C=e=>{h(e===p?null:e)};(0,o.useEffect)(()=>{(async()=>{try{if(!p)return;let e=await fetch("/api/get-approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({team_id:p.team_id})});if(!e.ok)throw Error("Failed to fetch approval status");let t=(await e.json()).approved;h(e=>({...e,approved:t}))}catch(e){console.error("Failed to fetch approval status:",e)}})()},[]);let k=e=>{w(e),g(!0)};return(0,a.jsxs)("div",{className:"flex flex-col items-center mt-20",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"내 팀 관리"}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"팀 이름"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"지원신청 보기"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"요청 아이디어"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"팀 정보 수정"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:e.map(e=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:e.name}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("button",{className:"py-2 px-4 rounded-lg bg-blue-500 text-white",onClick:()=>j(e._id),children:"지원신청 보기"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("button",{className:"py-2 px-4 rounded-lg bg-blue-500 text-white",onClick:()=>k(e._id),children:"요청 아이디어"})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("button",{className:"py-2 px-4 rounded-lg bg-blue-500 text-white",children:"팀 정보 수정"})})]},e._id))})]})}),(0,a.jsxs)(i(),{isOpen:r,onRequestClose:v,ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"720px",height:"600px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"지원자 정보 모달",children:[(0,a.jsx)("div",{className:"modal",children:(0,a.jsxs)("div",{className:"modal-content",children:[(0,a.jsx)("h2",{children:"지원자 정보"}),(0,a.jsx)("ul",{children:l.map(e=>(0,a.jsxs)("li",{children:[(0,a.jsxs)("div",{className:"flex justify-between items-center w-full mb-4",children:[(0,a.jsxs)("p",{children:["유저명 : ",e.username]}),(0,a.jsx)("button",{className:"w-32 h-8 rounded-2xl bg-gray-200 ml-5",onClick:()=>C(e),children:"자세히 보기"})]}),p===e&&(0,a.jsxs)("div",{className:"flex flex-col mt-3 mb-4",children:[(0,a.jsxs)("p",{children:["이름 : ",e.name]}),(0,a.jsxs)("p",{children:["이메일 : ",e.email]}),(0,a.jsxs)("p",{children:["전화번호 : ",e.phoneNumber]}),(0,a.jsxs)("p",{children:["스택: ",e.stack]}),(0,a.jsxs)("p",{children:["지원내용: ",e.content]}),e.approved?(0,a.jsx)("div",{className:"flex justify-center items-center ml-16 w-40 h-10 rounded-2xl bg-gray-200 mt-5",children:"승인완료"}):(0,a.jsx)("button",{className:"ml-16 w-40 h-10 rounded-2xl bg-green-200 mt-5",onClick:()=>N(e._id,e.team_id),children:"승인"})]})]},e._id))})]})}),(0,a.jsx)("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:v,children:"닫기"})]}),(0,a.jsx)(i(),{isOpen:x,onRequestClose:()=>u(!1),ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"420px",height:"200px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"승인 완료 모달",children:(0,a.jsx)("div",{className:"modal",children:(0,a.jsxs)("div",{className:"modal-content",children:[(0,a.jsx)("h2",{children:"승인이 완료되었습니다!"}),(0,a.jsx)("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:()=>u(!1),children:"확인"})]})})}),(0,a.jsxs)(i(),{isOpen:y,onRequestClose:()=>g(!1),ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"720px",height:"600px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"요청 아이디어 목록 모달",children:[(0,a.jsx)(c,{teamId:b}),(0,a.jsx)("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:()=>g(!1),children:"닫기"})]})]})}},4095:function(e,t,r){"use strict";r.d(t,{I:function(){return n}});var a=r(4849);function n(){let e=localStorage.getItem("token");if(e)try{let t=e.split(".")[1],r=(0,a.Jx)(t);return JSON.parse(r).username}catch(e){console.error("Error parsing token:",e)}return null}},8792:function(e,t,r){"use strict";r.d(t,{default:function(){return n.a}});var a=r(5250),n=r.n(a)},4849:function(e,t,r){"use strict";let a;r.d(t,{Jx:function(){return w}});var n=r(3663).lW;let o="function"==typeof atob,s="function"==typeof n,i="function"==typeof TextDecoder?new TextDecoder:void 0;"function"==typeof TextEncoder&&new TextEncoder;let l=(a={},Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=").forEach((e,t)=>a[e]=t),a),c=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,d=String.fromCharCode.bind(String),p="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),h=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),x=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,u=e=>{switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return d((t>>>10)+55296)+d((1023&t)+56320);case 3:return d((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return d((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},f=e=>e.replace(x,u),m=o?e=>atob(h(e)):s?e=>n.from(e,"base64").toString("binary"):e=>{if(e=e.replace(/\s+/g,""),!c.test(e))throw TypeError("malformed base64.");e+="==".slice(2-(3&e.length));let t,r="",a,n;for(let o=0;o<e.length;)t=l[e.charAt(o++)]<<18|l[e.charAt(o++)]<<12|(a=l[e.charAt(o++)])<<6|(n=l[e.charAt(o++)]),r+=64===a?d(t>>16&255):64===n?d(t>>16&255,t>>8&255):d(t>>16&255,t>>8&255,255&t);return r},y=s?e=>p(n.from(e,"base64")):e=>p(m(e).split("").map(e=>e.charCodeAt(0))),g=s?e=>n.from(e,"base64").toString("utf8"):i?e=>i.decode(y(e)):e=>f(m(e)),b=e=>h(e.replace(/[-_]/g,e=>"-"==e?"+":"/")),w=e=>g(b(e))}},function(e){e.O(0,[245,250,663,971,69,744],function(){return e(e.s=9785)}),_N_E=e.O()}]);