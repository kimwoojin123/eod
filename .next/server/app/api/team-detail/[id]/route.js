"use strict";(()=>{var e={};e.id=1964,e.ids=[1964],e.modules={38013:e=>{e.exports=require("mongodb")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},38573:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>h,originalPathname:()=>f,patchFetch:()=>w,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>g,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>v});var r={};o.r(r),o.d(r,{GET:()=>u});var n=o(95419),i=o(69108),a=o(99678),s=o(41989),c=o(78070),d=o(38013);async function u(e){try{await (0,s.connectDB)();let t=e.nextUrl.pathname.split("/").pop(),o=await s.client.db("eoddb").collection("teams").findOne({_id:new d.ObjectId(t)});if(!o)return c.Z.json({error:"해당하는 팀를 찾을 수 없습니다."},{status:404});return c.Z.json(o,{status:200})}catch(e){return console.error("Error fetching individual idea:",e),c.Z.json({error:"팀 정보를 불러오는 중에 오류가 발생했습니다."},{status:500})}}let l=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/team-detail/[id]/route",pathname:"/api/team-detail/[id]",filename:"route",bundlePath:"app/api/team-detail/[id]/route"},resolvedPagePath:"C:\\Users\\fire1\\OneDrive\\바탕 화면\\eod\\app\\api\\team-detail\\[id]\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:p,staticGenerationAsyncStorage:m,serverHooks:g,headerHooks:h,staticGenerationBailout:v}=l,f="/api/team-detail/[id]/route";function w(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:m})}},41989:(e,t,o)=>{let{MongoClient:r,ServerApiVersion:n}=o(38013),i=new r("mongodb+srv://kimwoojin:dnwls12@kimcluster.vi2fpad.mongodb.net/?retryWrites=true&w=majority",{serverApi:{version:n.v1,strict:!0,deprecationErrors:!0}});async function a(){try{return await i.connect(),console.log("Connected to MongoDB!"),i}catch(e){throw console.error("Error connecting to MongoDB:",e),e}}async function s(){try{await i.close(),console.log("Closed MongoDB connection.")}catch(e){console.error("Error closing MongoDB connection:",e)}}e.exports={connectDB:a,closeConnection:s,client:i}}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[1638,6206],()=>o(38573));module.exports=r})();