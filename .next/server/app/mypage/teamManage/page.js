(()=>{var e={};e.id=2886,e.ids=[2886],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4058:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>x,originalPathname:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c});var a=r(50482),n=r(69108),s=r(62563),o=r.n(s),i=r(68300),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let c=["",{children:["mypage",{children:["teamManage",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,39536)),"C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\mypage\\teamManage\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,91017)),"C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],d=["C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\mypage\\teamManage\\page.tsx"],p="/mypage/teamManage/page",x={require:r,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/mypage/teamManage/page",pathname:"/mypage/teamManage",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},14535:(e,t,r)=>{Promise.resolve().then(r.bind(r,40401))},77359:(e,t,r)=>{Promise.resolve().then(r.bind(r,30210))},51632:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,26840,23)),Promise.resolve().then(r.t.bind(r,38771,23)),Promise.resolve().then(r.t.bind(r,13225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,43982,23))},40401:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var a=r(95344),n=r(34365),s=r(3729),o=r(72681),i=r.n(o),l=r(56506);function c({teamId:e}){let[t,r]=(0,s.useState)([]);(0,s.useEffect)(()=>{(async function(){try{let t=await fetch(`/api/request-list/${e}`);if(!t.ok)throw Error("Failed to fetch idea requests");let a=await t.json();r(a)}catch(e){console.error("Error fetching idea requests:",e)}})()},[e]);let n=async(e,a)=>{try{if(console.log("전송하는 데이터:",{approved:a}),!(await fetch(`/api/approve-request/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({approved:!a})})).ok)throw Error("Failed to update approval status");let n=t.map(t=>t._id===e?{...t,approved:!a}:t);r(n)}catch(e){console.error("Error updating approval status:",e)}};return(0,a.jsxs)("div",{children:[a.jsx("h1",{className:"text-2xl font-bold mb-4",children:"요청 아이디어 목록"}),a.jsx("ul",{children:t.map(e=>(0,a.jsxs)("li",{className:"mb-4",children:[a.jsx("p",{children:(0,a.jsxs)(l.default,{href:`/ideaSearch/${e._id}`,children:[a.jsx("strong",{children:"제목:"})," ",e.title]})}),a.jsx("button",{onClick:()=>n(e._id,e.approved),className:`rounded-md px-4 py-2 ${e.approved?"bg-green-500 text-white":"bg-blue-500 text-white"}`,children:e.approved?"승인완료":"승인"})]},e._id))})]})}function d(){let[e,t]=(0,s.useState)([]),[r,o]=(0,s.useState)(!1),[l,d]=(0,s.useState)([]),[p,x]=(0,s.useState)(null),[u,h]=(0,s.useState)(!1),[m,f]=(0,s.useState)(!1),[g,y]=(0,s.useState)(!1),[b,j]=(0,s.useState)("");(0,s.useEffect)(()=>{(async function(){try{let e=(0,n.I)(),r=await fetch(`/api/team-manage/${e}`);if(!r.ok)throw Error("팀 데이터를 불러오는데 문제가 발생했습니다.");let a=await r.json();t(a)}catch(e){console.error("팀 데이터를 불러오는데 문제가 발생했습니다:",e)}})()},[]);let w=async e=>{try{let t=await fetch(`/api/inquire-apply/${e}`);if(!t.ok)throw Error("지원자 정보를 불러오는데 문제가 발생했습니다.");let r=await t.json();d(r.applicants.map(e=>({...e,...e.user_info}))),o(!0)}catch(e){console.error("지원자 정보를 불러오는데 문제가 발생했습니다:",e)}},v=()=>{o(!1),d([])},C=async(e,t)=>{try{if(!(await fetch(`/api/approve-applicant/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({team_id:t})})).ok)throw Error("지원자 승인에 실패했습니다.");h(!0),f(!0)}catch(e){console.error("지원자 승인 중 오류 발생:",e)}},N=e=>{x(e===p?null:e)};(0,s.useEffect)(()=>{(async()=>{try{if(!p)return;let e=await fetch("/api/get-approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({team_id:p.team_id})});if(!e.ok)throw Error("Failed to fetch approval status");let t=(await e.json()).approved;x(e=>({...e,approved:t}))}catch(e){console.error("Failed to fetch approval status:",e)}})()},[]);let S=e=>{j(e),y(!0)};return(0,a.jsxs)("div",{className:"flex flex-col items-center mt-20",children:[a.jsx("h1",{className:"text-2xl font-bold mb-4",children:"내 팀 관리"}),a.jsx("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[a.jsx("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[a.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"팀 이름"}),a.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"지원신청 보기"}),a.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"요청 아이디어"}),a.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"팀 정보 수정"})]})}),a.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:e.map(e=>(0,a.jsxs)("tr",{children:[a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.name}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("button",{className:"py-2 px-4 rounded-lg bg-blue-500 text-white",onClick:()=>w(e._id),children:"지원신청 보기"})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("button",{className:"py-2 px-4 rounded-lg bg-blue-500 text-white",onClick:()=>S(e._id),children:"요청 아이디어"})}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:a.jsx("button",{className:"py-2 px-4 rounded-lg bg-blue-500 text-white",children:"팀 정보 수정"})})]},e._id))})]})}),(0,a.jsxs)(i(),{isOpen:r,onRequestClose:v,ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"720px",height:"600px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"지원자 정보 모달",children:[a.jsx("div",{className:"modal",children:(0,a.jsxs)("div",{className:"modal-content",children:[a.jsx("h2",{children:"지원자 정보"}),a.jsx("ul",{children:l.map(e=>(0,a.jsxs)("li",{children:[(0,a.jsxs)("div",{className:"flex justify-between items-center w-full mb-4",children:[(0,a.jsxs)("p",{children:["유저명 : ",e.username]}),a.jsx("button",{className:"w-32 h-8 rounded-2xl bg-gray-200 ml-5",onClick:()=>N(e),children:"자세히 보기"})]}),p===e&&(0,a.jsxs)("div",{className:"flex flex-col mt-3 mb-4",children:[(0,a.jsxs)("p",{children:["이름 : ",e.name]}),(0,a.jsxs)("p",{children:["이메일 : ",e.email]}),(0,a.jsxs)("p",{children:["전화번호 : ",e.phoneNumber]}),(0,a.jsxs)("p",{children:["스택: ",e.stack]}),(0,a.jsxs)("p",{children:["지원내용: ",e.content]}),e.approved?a.jsx("div",{className:"flex justify-center items-center ml-16 w-40 h-10 rounded-2xl bg-gray-200 mt-5",children:"승인완료"}):a.jsx("button",{className:"ml-16 w-40 h-10 rounded-2xl bg-green-200 mt-5",onClick:()=>C(e._id,e.team_id),children:"승인"})]})]},e._id))})]})}),a.jsx("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:v,children:"닫기"})]}),a.jsx(i(),{isOpen:u,onRequestClose:()=>h(!1),ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"420px",height:"200px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"승인 완료 모달",children:a.jsx("div",{className:"modal",children:(0,a.jsxs)("div",{className:"modal-content",children:[a.jsx("h2",{children:"승인이 완료되었습니다!"}),a.jsx("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:()=>h(!1),children:"확인"})]})})}),(0,a.jsxs)(i(),{isOpen:g,onRequestClose:()=>y(!1),ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"720px",height:"600px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"요청 아이디어 목록 모달",children:[a.jsx(c,{teamId:b}),a.jsx("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:()=>y(!1),children:"닫기"})]})]})}},30210:(e,t,r)=>{"use strict";r.r(t),r.d(t,{AuthButton:()=>d,MyPageButton:()=>c,ReloadButton:()=>l});var a=r(95344),n=r(56506),s=r(3729),o=r(72681),i=r.n(o);function l(){return a.jsx("button",{onClick:()=>{window.location.href="/"},children:"EveryOneDeveloper"})}function c(){let[e,t]=(0,s.useState)(!1),[r,n]=(0,s.useState)(""),[o,l]=(0,s.useState)(!1),c=()=>l(!0),d=()=>l(!1);return(0,s.useEffect)(()=>{t(!!localStorage.getItem("token"))},[]),(0,a.jsxs)("div",{children:[a.jsx("button",{onClick:()=>{e?window.location.href="/mypage":(n("로그인이 필요합니다."),c())},children:"마이페이지"}),(0,a.jsxs)(i(),{isOpen:o,onRequestClose:d,ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"360px",height:"180px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"로그인 요구 모달",children:[a.jsx("p",{children:r}),a.jsx("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:d,children:"닫기"})]})]})}function d(){let[e,t]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{t(!!localStorage.getItem("token"))},[]),a.jsx("div",{children:e?a.jsx("div",{className:"cursor-pointer",onClick:()=>{localStorage.removeItem("token"),t(!1),window.location.href="/"},children:a.jsx("span",{children:"로그아웃"})}):a.jsx(a.Fragment,{children:(0,a.jsxs)("div",{className:"w-40 flex justify-between",children:[a.jsx(n.default,{href:"login",children:"로그인"}),a.jsx(n.default,{href:"signup",children:"회원가입"})]})})})}},34365:(e,t,r)=>{"use strict";r.d(t,{I:()=>n});var a=r(4707);function n(){let e=localStorage.getItem("token");if(e)try{let t=e.split(".")[1],r=(0,a.Jx)(t);return JSON.parse(r).username}catch(e){console.error("Error parsing token:",e)}return null}},91017:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m,metadata:()=>h});var a=r(25036),n=r(80265),s=r.n(n);r(67272);var o=r(86843);let i=(0,o.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx`),{__esModule:l,$$typeof:c}=i;i.default;let d=(0,o.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#ReloadButton`),p=(0,o.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#MyPageButton`),x=(0,o.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#AuthButton`);function u(){return(0,a.jsxs)("div",{className:"flex w-screen h-14 bg-gray-300 justify-between items-center",children:[a.jsx("div",{className:"ml-10",children:a.jsx(d,{})}),(0,a.jsxs)("div",{className:"w-96 flex justify-between mr-20",children:[a.jsx(p,{}),a.jsx(x,{})]})]})}let h={title:"Create Next App",description:"Generated by create next app"};function m({children:e}){return a.jsx("html",{lang:"en",children:(0,a.jsxs)("body",{className:s().className,children:[a.jsx(u,{}),e]})})}},39536:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>s,__esModule:()=>n,default:()=>o});let a=(0,r(86843).createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\mypage\teamManage\page.tsx`),{__esModule:n,$$typeof:s}=a,o=a.default},67272:()=>{},4707:(e,t,r)=>{"use strict";r.d(t,{Jx:()=>y});let a="function"==typeof atob,n="function"==typeof Buffer,s="function"==typeof TextDecoder?new TextDecoder:void 0;"function"==typeof TextEncoder&&new TextEncoder;let o=(e=>{let t={};return e.forEach((e,r)=>t[e]=r),t})(Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=")),i=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,l=String.fromCharCode.bind(String),c="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),d=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),p=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,x=e=>{switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return l((t>>>10)+55296)+l((1023&t)+56320);case 3:return l((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return l((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},u=e=>e.replace(p,x),h=a?e=>atob(d(e)):n?e=>Buffer.from(e,"base64").toString("binary"):e=>{if(e=e.replace(/\s+/g,""),!i.test(e))throw TypeError("malformed base64.");e+="==".slice(2-(3&e.length));let t,r="",a,n;for(let s=0;s<e.length;)t=o[e.charAt(s++)]<<18|o[e.charAt(s++)]<<12|(a=o[e.charAt(s++)])<<6|(n=o[e.charAt(s++)]),r+=64===a?l(t>>16&255):64===n?l(t>>16&255,t>>8&255):l(t>>16&255,t>>8&255,255&t);return r},m=n?e=>c(Buffer.from(e,"base64")):e=>c(h(e).split("").map(e=>e.charCodeAt(0))),f=n?e=>Buffer.from(e,"base64").toString("utf8"):s?e=>s.decode(m(e)):e=>u(h(e)),g=e=>d(e.replace(/[-_]/g,e=>"-"==e?"+":"/")),y=e=>f(g(e))}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[1638,9838],()=>r(4058));module.exports=a})();