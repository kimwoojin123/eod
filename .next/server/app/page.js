(()=>{var e={};e.id=1931,e.ids=[1931],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},12111:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>c,routeModule:()=>x,tree:()=>d});var s=r(50482),a=r(69108),n=r(62563),i=r.n(n),l=r(68300),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,96461)),"C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,91017)),"C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\page.tsx"],u="/page",h={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},77359:(e,t,r)=>{Promise.resolve().then(r.bind(r,30210))},5429:(e,t,r)=>{Promise.resolve().then(r.bind(r,52064)),Promise.resolve().then(r.bind(r,22564)),Promise.resolve().then(r.bind(r,77360)),Promise.resolve().then(r.t.bind(r,61476,23))},51632:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,26840,23)),Promise.resolve().then(r.t.bind(r,38771,23)),Promise.resolve().then(r.t.bind(r,13225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,43982,23))},30210:(e,t,r)=>{"use strict";r.r(t),r.d(t,{AuthButton:()=>c,MyPageButton:()=>d,ReloadButton:()=>o});var s=r(95344),a=r(56506),n=r(3729),i=r(72681),l=r.n(i);function o(){return s.jsx("button",{onClick:()=>{window.location.href="/"},children:"EveryOneDeveloper"})}function d(){let[e,t]=(0,n.useState)(!1),[r,a]=(0,n.useState)(""),[i,o]=(0,n.useState)(!1),d=()=>o(!0),c=()=>o(!1);return(0,n.useEffect)(()=>{t(!!localStorage.getItem("token"))},[]),(0,s.jsxs)("div",{children:[s.jsx("button",{onClick:()=>{e?window.location.href="/mypage":(a("로그인이 필요합니다."),d())},children:"마이페이지"}),(0,s.jsxs)(l(),{isOpen:i,onRequestClose:c,ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"360px",height:"180px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"로그인 요구 모달",children:[s.jsx("p",{children:r}),s.jsx("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:c,children:"닫기"})]})]})}function c(){let[e,t]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{t(!!localStorage.getItem("token"))},[]),s.jsx("div",{children:e?s.jsx("div",{className:"cursor-pointer",onClick:()=>{localStorage.removeItem("token"),t(!1),window.location.href="/"},children:s.jsx("span",{children:"로그아웃"})}):s.jsx(s.Fragment,{children:(0,s.jsxs)("div",{className:"w-40 flex justify-between",children:[s.jsx(a.default,{href:"login",children:"로그인"}),s.jsx(a.default,{href:"signup",children:"회원가입"})]})})})}},52064:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(95344),a=r(3729),n=r(8428);let i=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{d:"M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z"}),a.createElement("path",{fillRule:"evenodd",d:"M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z",clipRule:"evenodd"}))});function l(){let[e,t]=(0,a.useState)([]),r=(0,n.useRouter)();(0,a.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/get-funding");if(!e.ok)throw Error("Failed to fetch popular fundings");let r=(await e.json()).sort((e,t)=>t.amount-e.amount).slice(0,10);t(r)}catch(e){console.error("Error fetching popular fundings:",e)}})()},[]);let l=e=>{r.push(`/funding/${e}`)};return(0,s.jsxs)("div",{className:"w-1/5 mt-10",children:[s.jsx("h1",{className:"text-xl font-bold mb-4",children:"인기 펀딩 리스트"}),s.jsx("div",{className:"border border-gray-300 p-4",style:{height:"580px"},children:e.map((e,t)=>s.jsx("div",{className:"py-2 cursor-pointer",onClick:()=>l(e._id),children:(0,s.jsxs)("p",{className:"hover:underline flex items-center",children:[`${t+1}. ${e.title}`," ",s.jsx(i,{className:"w-5 h-5 ml-2"})," ",e.amount]})},e._id))})]})}},22564:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var s=r(95344),a=r(3729),n=r(8428),i=r(39447),l=r(14899);function o(){let[e,t]=(0,a.useState)([]),r=(0,n.useRouter)();(0,a.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/board-list");if(!e.ok)throw Error("Failed to fetch popular ideas");let r=await e.json();if(r&&Array.isArray(r)){let e=r.sort((e,t)=>t.likes-e.likes).slice(0,10);t(e)}else throw Error("Invalid data structure: ideas field not found")}catch(e){console.error("Error fetching popular ideas:",e)}})()},[]);let o=e=>{r.push(`/ideaSearch/${e}`)};return(0,s.jsxs)("div",{className:"w-1/5 mt-10",children:[s.jsx("h1",{className:"text-xl font-bold mb-4",children:"인기 아이디어"}),s.jsx("div",{className:"border border-gray-300 p-4 flex flex-col justify-start",style:{height:"580px"},children:e.map((e,t)=>s.jsx("div",{className:"py-2 cursor-pointer ",onClick:()=>o(e._id),children:(0,s.jsxs)("p",{className:"flex hover:underline",children:[`${t+1}. ${e.username} - ${e.title}`,s.jsx(i.Z,{className:"w-4 h-4 text-red-500 ml-2 mt-1"}),e.likes,s.jsx(l.Z,{className:"w-4 h-4 ml-3 mt-1"}),e.replies?.length||0]})},e._id))})]})}},77360:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(95344),a=r(3729),n=r(8428);let i=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{d:"M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z"}))});function l(){let[e,t]=(0,a.useState)([]),r=(0,n.useRouter)();(0,a.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/get-teamApply");if(!e.ok)throw Error("Failed to fetch popular teams");let r=await e.json();t(r)}catch(e){console.error("Error fetching popular teams:",e)}})()},[]);let l=e=>{r.push(`/teamSearch/${e}`)};return(0,s.jsxs)("div",{className:"w-1/5 mt-10",children:[s.jsx("h1",{className:"text-xl font-bold mb-4",children:"지원자 많은 팀"}),s.jsx("div",{className:"border border-gray-300 p-4",style:{height:"580px"},children:e.map((e,t)=>s.jsx("div",{className:"py-2 cursor-pointer",onClick:()=>l(e._id),children:(0,s.jsxs)("p",{className:"hover:underline flex",children:[`${t+1}. ${e.name}`,s.jsx(i,{className:"w-5 h-5 ml-2 mt-0.5"})," ",e.applicants]})},e._id))})]})}},8428:(e,t,r)=>{"use strict";var s=r(14767);r.o(s,"usePathname")&&r.d(t,{usePathname:function(){return s.usePathname}}),r.o(s,"useRouter")&&r.d(t,{useRouter:function(){return s.useRouter}})},91017:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f,metadata:()=>p});var s=r(25036),a=r(80265),n=r.n(a);r(67272);var i=r(86843);let l=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx`),{__esModule:o,$$typeof:d}=l;l.default;let c=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#ReloadButton`),u=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#MyPageButton`),h=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#AuthButton`);function x(){return(0,s.jsxs)("div",{className:"flex w-screen h-14 bg-gray-300 justify-between items-center",children:[s.jsx("div",{className:"ml-10",children:s.jsx(c,{})}),(0,s.jsxs)("div",{className:"w-96 flex justify-between mr-20",children:[s.jsx(u,{}),s.jsx(h,{})]})]})}let p={title:"Create Next App",description:"Generated by create next app"};function f({children:e}){return s.jsx("html",{lang:"en",children:(0,s.jsxs)("body",{className:n().className,children:[s.jsx(x,{}),e]})})}},96461:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>P});var s=r(25036),a=r(16274);function n(){return s.jsx(a.default,{href:"/ideaApply",className:"flex justify-center items-center w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400",children:s.jsx("p",{children:"아이디어 등록"})})}function i(){return s.jsx(a.default,{href:"/ideaSearch",className:"flex justify-center items-center w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400",children:s.jsx("p",{children:"아이디어 검색"})})}function l(){return s.jsx(a.default,{href:"/teamSearch",className:"flex justify-center items-center w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400",children:s.jsx("p",{children:"팀 찾기"})})}function o(){return s.jsx(a.default,{href:"/funding",className:"flex justify-center items-center w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400",children:s.jsx("p",{children:"펀딩"})})}function d(){return(0,s.jsxs)("div",{className:"flex h-32 bg-gray-100 justify-around items-center",children:[s.jsx(n,{}),s.jsx(i,{}),s.jsx(l,{}),s.jsx(o,{})]})}var c=r(86843);let u=(0,c.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\main\popularFunding.tsx`),{__esModule:h,$$typeof:x}=u,p=u.default,f=(0,c.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\main\popularIdeas.tsx`),{__esModule:m,$$typeof:g}=f,v=f.default,j=(0,c.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\main\popularTeams.tsx`),{__esModule:w,$$typeof:y}=j,b=j.default;function P(){return(0,s.jsxs)("div",{className:"w-screen",children:[s.jsx("div",{children:s.jsx(d,{})}),(0,s.jsxs)("div",{className:"flex justify-around",children:[s.jsx(v,{}),s.jsx(b,{}),s.jsx(p,{})]})]})}},16274:(e,t,r)=>{"use strict";r.d(t,{default:()=>a.a});var s=r(48026),a=r.n(s)},48026:(e,t,r)=>{"use strict";let{createProxy:s}=r(86843);e.exports=s("C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\node_modules\\next\\dist\\client\\link.js")},67272:()=>{},14899:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"}))})},39447:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(3729);let a=s.forwardRef(function({title:e,titleId:t,...r},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{d:"m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"}))})}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[1638,9838],()=>r(12111));module.exports=s})();