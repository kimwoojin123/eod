(()=>{var e={};e.id=2626,e.ids=[2626],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},50904:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var n=r(50482),s=r(69108),o=r(62563),i=r.n(o),a=r(68300),l={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let d=["",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,43015)),"C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\login\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,91017)),"C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\login\\page.tsx"],u="/login/page",x={require:r,loadChunk:()=>Promise.resolve()},p=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},91831:(e,t,r)=>{Promise.resolve().then(r.bind(r,89928))},77359:(e,t,r)=>{Promise.resolve().then(r.bind(r,30210))},51632:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,26840,23)),Promise.resolve().then(r.t.bind(r,38771,23)),Promise.resolve().then(r.t.bind(r,13225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,43982,23))},89928:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(95344),s=r(3729),o=r(56506);function i(){let[e,t]=(0,s.useState)(""),[r,i]=(0,s.useState)(""),a=async t=>{t.preventDefault();try{let t=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:r})});if(t.ok){let{token:e}=await t.json();localStorage.setItem("token",JSON.stringify(e));let r=JSON.parse(localStorage.getItem("token")||"");if(r){let e=r.username;console.log(e)}alert("로그인이 완료되었습니다."),window.location.href="/"}else alert("로그인에 실패했습니다.")}catch(e){console.error("Error:",e)}};return(0,n.jsxs)("div",{className:"flex flex-col justify-center items-center h-screen w-screen",children:[n.jsx("h1",{className:"mb-10 text-3xl font-bold",children:"로그인 페이지"}),n.jsx("form",{className:"w-full max-w-md",onSubmit:a,children:(0,n.jsxs)("div",{className:"mb-4 flex flex-col",children:[n.jsx("input",{className:"border border-black p-2 mb-2",type:"text",value:e,placeholder:"아이디",onChange:e=>t(e.target.value)}),n.jsx("input",{className:"border border-black p-2 mb-4",type:"password",value:r,placeholder:"비밀번호",onChange:e=>i(e.target.value)}),n.jsx("button",{className:"border border-black p-2 bg-blue-500 text-white rounded",type:"submit",children:"로그인"})]})}),(0,n.jsxs)("div",{className:"flex w-full max-w-md justify-between",children:[(0,n.jsxs)("div",{children:[n.jsx(o.default,{href:"/login/findUsername",children:"아이디 찾기"}),n.jsx("span",{style:{margin:"0 10px"}}),n.jsx(o.default,{href:"/login/findPassword",children:"비밀번호 찾기"})]}),n.jsx(o.default,{className:"ml-auto",href:"/",children:"메인페이지로"})]})]})}},30210:(e,t,r)=>{"use strict";r.r(t),r.d(t,{AuthButton:()=>c,MyPageButton:()=>d,ReloadButton:()=>l});var n=r(95344),s=r(56506),o=r(3729),i=r(72681),a=r.n(i);function l(){return n.jsx("button",{onClick:()=>{window.location.href="/"},children:"EveryOneDeveloper"})}function d(){let[e,t]=(0,o.useState)(!1),[r,s]=(0,o.useState)(""),[i,l]=(0,o.useState)(!1),d=()=>l(!0),c=()=>l(!1);return(0,o.useEffect)(()=>{t(!!localStorage.getItem("token"))},[]),(0,n.jsxs)("div",{children:[n.jsx("button",{onClick:()=>{e?window.location.href="/mypage":(s("로그인이 필요합니다."),d())},children:"마이페이지"}),(0,n.jsxs)(a(),{isOpen:i,onRequestClose:c,ariaHideApp:!1,style:{overlay:{backgroundColor:" rgba(0, 0, 0, 0.4)",width:"100%",height:"100vh",zIndex:"10",position:"fixed",top:"0",left:"0"},content:{display:"flex",flexDirection:"column",alignItems:"center",width:"360px",height:"180px",zIndex:"150",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",borderRadius:"10px",boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.25)",backgroundColor:"white",justifyContent:"center",overflow:"auto",whiteSpace:"pre-line"}},contentLabel:"로그인 요구 모달",children:[n.jsx("p",{children:r}),n.jsx("button",{className:"w-40 h-10 rounded-2xl bg-gray-200 mt-5",onClick:c,children:"닫기"})]})]})}function c(){let[e,t]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{t(!!localStorage.getItem("token"))},[]),n.jsx("div",{children:e?n.jsx("div",{className:"cursor-pointer",onClick:()=>{localStorage.removeItem("token"),t(!1),window.location.href="/"},children:n.jsx("span",{children:"로그아웃"})}):n.jsx(n.Fragment,{children:(0,n.jsxs)("div",{className:"w-40 flex justify-between",children:[n.jsx(s.default,{href:"login",children:"로그인"}),n.jsx(s.default,{href:"signup",children:"회원가입"})]})})})}},91017:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m,metadata:()=>h});var n=r(25036),s=r(80265),o=r.n(s);r(67272);var i=r(86843);let a=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx`),{__esModule:l,$$typeof:d}=a;a.default;let c=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#ReloadButton`),u=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#MyPageButton`),x=(0,i.createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\ui\Buttons\headButtons.tsx#AuthButton`);function p(){return(0,n.jsxs)("div",{className:"flex w-screen h-14 bg-gray-300 justify-between items-center",children:[n.jsx("div",{className:"ml-10",children:n.jsx(c,{})}),(0,n.jsxs)("div",{className:"w-96 flex justify-between mr-20",children:[n.jsx(u,{}),n.jsx(x,{})]})]})}let h={title:"Create Next App",description:"Generated by create next app"};function m({children:e}){return n.jsx("html",{lang:"en",children:(0,n.jsxs)("body",{className:o().className,children:[n.jsx(p,{}),e]})})}},43015:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>s,default:()=>i});let n=(0,r(86843).createProxy)(String.raw`C:\Users\fire1\OneDrive\바탕 화면\eod\app\login\page.tsx`),{__esModule:s,$$typeof:o}=n,i=n.default},67272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[1638,9838],()=>r(50904));module.exports=n})();