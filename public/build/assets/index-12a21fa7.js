import{d as u,f as l}from"./format-money-db0e5105.js";import{f as d,i as n}from"./vendor-0a0b4763.js";/* empty css                       */import{G as f}from"./get-f12826cc.js";const o=window.location.href.split("/"),h=o[o.length-1];let b=function(){return{notifications:{error:{show:!1,text:"",url:""},success:{show:!1,text:"",url:""},wait:{show:!1,text:""}},totalPages:1,page:1,tableColumns:{name:{enabled:!0}},sortingColumn:"",sortDirection:"",accounts:[],sort(a){return this.sortingColumn=a,this.sortDirection=this.sortDirection==="asc"?"desc":"asc",this.loadAccounts(),!1},formatMoney(a,e){return l(a,e)},format(a){return d(a,n.t("config.date_time_fns"))},init(){this.notifications.wait.show=!0,this.notifications.wait.text=n.t("firefly.wait_loading_data"),this.loadAccounts()},loadAccounts(){this.notifications.wait.show=!0,this.notifications.wait.text=n.t("firefly.wait_loading_data"),this.accounts=[];const a=[{column:this.sortingColumn,direction:this.sortDirection}];new f().index({sorting:a,type:h,page:this.page}).then(e=>{for(let i=0;i<e.data.data.length;i++)if(e.data.data.hasOwnProperty(i)){let t=e.data.data[i],c={id:parseInt(t.id),active:t.attributes.active,name:t.attributes.name,type:t.attributes.type,iban:t.attributes.iban===null?"":t.attributes.iban.match(/.{1,4}/g).join(" "),account_number:t.attributes.account_number===null?"":t.attributes.account_number,current_balance:t.attributes.current_balance,currency_code:t.attributes.currency_code,native_current_balance:t.attributes.native_current_balance,native_currency_code:t.attributes.native_currency_code};this.accounts.push(c)}this.notifications.wait.show=!1})}}},r={index:b,dates:u};function s(){Object.keys(r).forEach(a=>{console.log(`Loading page component "${a}"`);let e=r[a]();Alpine.data(a,()=>e)}),Alpine.start()}document.addEventListener("firefly-iii-bootstrapped",()=>{console.log("Loaded through event listener."),s()});window.bootstrapped&&(console.log("Loaded through window variable."),s());
