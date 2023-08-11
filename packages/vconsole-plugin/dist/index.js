class t{constructor(t,e="newPlugin"){this.id=t,this.name=e,this.isReady=!1,this.eventList={}}get id(){return this._id}set id(t){if(!t)throw"Plugin ID cannot be empty";this._id=t.toLowerCase()}get name(){return this._name}set name(t){if(!t)throw"Plugin name cannot be empty";this._name=t}get vConsole(){return this._vConsole||void 0}set vConsole(t){if(!t)throw"vConsole cannot be empty";this._vConsole=t}on(t,e){return this.eventList[t]=e,this}trigger(t,e){if("function"==typeof this.eventList[t])this.eventList[t].call(this,e);else{let n="on"+t.charAt(0).toUpperCase()+t.slice(1);"function"==typeof this[n]&&this[n].call(this,e)}return this}}class e extends t{constructor(t,e,n,o){super(t,e),this.CompClass=n,this.initialProps=o}onReady(){this.isReady=!0}onRenderTab(t){const e=document.createElement("div"),n=this.compInstance=new this.CompClass({target:e,props:this.initialProps});t(e.firstElementChild,n.options)}onRemove(){super.onRemove&&super.onRemove(),this.compInstance&&this.compInstance.$destroy()}}function n(){}function o(t){return t()}function r(){return Object.create(null)}function i(t){t.forEach(o)}function s(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function f(){return p(" ")}function h(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function v(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t,e){e=""+e,t.data!==e&&(t.data=e)}function g(t,e){t.value=null==e?"":e}function _(t,e,n,o){null==n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}let $;function y(t){$=t}const x=[],b=[];let w=[];const C=[],k=Promise.resolve();let E=!1;function P(t){w.push(t)}const j=new Set;let N=0;function R(){if(0!==N)return;const t=$;do{try{for(;N<x.length;){const t=x[N];N++,y(t),L(t.$$)}}catch(t){throw x.length=0,N=0,t}for(y(null),x.length=0,N=0;b.length;)b.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];j.has(e)||(j.add(e),e())}w.length=0}while(x.length);for(;C.length;)C.pop()();E=!1,j.clear(),y(t)}function L(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const I=new Set;function O(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];w.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),w=e}(n.after_update),i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function T(t,e){-1===t.$$.dirty[0]&&(x.push(t),E||(E=!0,k.then(R)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function S(t,e,a,c,u,d,p,f=[-1]){const h=$;y(t);const v=t.$$={fragment:null,ctx:[],props:d,update:n,not_equal:u,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(h?h.$$.context:[])),callbacks:r(),dirty:f,skip_bound:!1,root:e.target||h.$$.root};p&&p(v.root);let m=!1;if(v.ctx=a?a(t,e.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return v.ctx&&u(v.ctx[e],v.ctx[e]=r)&&(!v.skip_bound&&v.bound[e]&&v.bound[e](r),m&&T(t,e)),n})):[],v.update(),m=!0,i(v.before_update),v.fragment=!!c&&c(v.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);v.fragment&&v.fragment.l(t),t.forEach(l)}else v.fragment&&v.fragment.c();e.intro&&((g=t.$$.fragment)&&g.i&&(I.delete(g),g.i(_))),function(t,e,n){const{fragment:r,after_update:a}=t.$$;r&&r.m(e,n),P((()=>{const e=t.$$.on_mount.map(o).filter(s);t.$$.on_destroy?t.$$.on_destroy.push(...e):i(e),t.$$.on_mount=[]})),a.forEach(P)}(t,e.target,e.anchor),R()}var g,_;y(h)}class A{$$=void 0;$$set=void 0;$destroy(){O(this,1),this.$destroy=n}$on(t,e){if(!s(e))return n;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(e),()=>{const t=o.indexOf(e);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function z(t){let e;return{c(){e=d("div"),e.innerHTML='<span style="color:red">Note:</span> <span style="color:red">Cover mode will cover the coverage data to the server, and the server will cover the coverage data to the database.</span>',_(e,"margin-top","10px")},m(t,n){u(t,e,n)},d(t){t&&l(e)}}}function B(t){let e,o,r,s,a,$,y,x,b,w,C,k,E,P,j,N,R,L,I,O,T,S,A,B,M,D=1===t[3]&&z();return A=function(t){let e;return{p(...n){e=n,e.forEach((e=>t.push(e)))},r(){e.forEach((e=>t.splice(t.indexOf(e),1)))}}}(t[7][0]),{c(){e=d("div"),o=d("div"),r=p("Report to project: "),s=p(t[1]),a=p(", Server: "),$=p(t[0]),y=f(),x=d("div"),b=d("input"),w=f(),C=d("div"),k=d("span"),k.textContent="Merge",E=f(),P=d("input"),j=f(),N=d("span"),N.textContent="Cover",R=f(),L=d("input"),I=f(),O=d("div"),T=d("button"),T.textContent="Report",S=f(),D&&D.c(),v(b,"placeholder","Input your Feature ID"),_(x,"margin-top","10px"),v(x,"class","line"),v(P,"type","radio"),P.__value=0,g(P,P.__value),v(L,"type","radio"),L.__value=1,g(L,L.__value),_(C,"margin-top","10px"),_(T,"padding","5px 10px"),_(T,"margin-top","10px"),v(e,"class","vc-table"),_(e,"padding","10px"),_(e,"font-size","20px"),_(e,"line-height","28px"),A.p(P,L)},m(n,i){u(n,e,i),c(e,o),c(o,r),c(o,s),c(o,a),c(o,$),c(e,y),c(e,x),c(x,b),g(b,t[2]),c(e,w),c(e,C),c(C,k),c(C,E),c(C,P),P.checked=P.__value===t[3],c(C,j),c(C,N),c(C,R),c(C,L),L.checked=L.__value===t[3],c(e,I),c(e,O),c(O,T),c(e,S),D&&D.m(e,null),B||(M=[h(b,"input",t[5]),h(P,"change",t[6]),h(L,"change",t[8]),h(T,"click",t[4])],B=!0)},p(t,[n]){2&n&&m(s,t[1]),1&n&&m($,t[0]),4&n&&b.value!==t[2]&&g(b,t[2]),8&n&&(P.checked=P.__value===t[3]),8&n&&(L.checked=L.__value===t[3]),1===t[3]?D||(D=z(),D.c(),D.m(e,null)):D&&(D.d(1),D=null)},i:n,o:n,d(t){t&&l(e),D&&D.d(),A.r(),B=!1,i(M)}}}function M(t,e,n){let{server:o}=e,{projectName:r}=e,i="",s=0;return t.$$set=t=>{"server"in t&&n(0,o=t.server),"projectName"in t&&n(1,r=t.projectName)},[o,r,i,s,async function(t){const e=`${o}/report-cov`,n={featureId:i,projectName:r,data:window.__coverage__,cover:s},a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);const c=await a.json();console.log(c)},function(){i=this.value,n(2,i)},function(){s=this.__value,n(3,s)},[[]],function(){s=this.__value,n(3,s)}]}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");class D extends A{constructor(t){super(),S(this,t,M,B,a,{server:0,projectName:1})}}class H extends e{constructor(t,e,n){super(t,e,D,n),this.initialProps=n}}const q=function(t,e){var n=new H("Bizantine","Bizantine",e);t.addPlugin(n)};var F={initPlugin:q};export{F as default,q as initPlugin};
