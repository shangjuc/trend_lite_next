(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(85)}])},1516:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(2648).Z,o=n(7273).Z,l=r(n(7294)),u=n(4532),a=n(3353),f=n(1410),i=n(9064),c=n(370),s=n(9955),d=n(4224),p=n(508),h=n(1516),v=n(4266);let y=new Set;function b(e,t,n,r,o){if(o||a.isLocalURL(t)){if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,l=t+"%"+n+"%"+o;if(y.has(l))return;y.add(l)}Promise.resolve(e.prefetch(t,n,r)).catch(e=>{})}}function _(e){return"string"==typeof e?e:f.formatUrl(e)}let g=l.default.forwardRef(function(e,t){let n,r;let{href:f,as:y,children:g,prefetch:j,passHref:m,replace:x,shallow:C,scroll:M,locale:E,onClick:k,onMouseEnter:w,onTouchStart:P,legacyBehavior:O=!1}=e,L=o(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=g,O&&("string"==typeof n||"number"==typeof n)&&(n=l.default.createElement("a",null,n));let T=!1!==j,N=l.default.useContext(s.RouterContext),R=l.default.useContext(d.AppRouterContext),A=null!=N?N:R,I=!N,{href:S,as:U}=l.default.useMemo(()=>{if(!N){let e=_(f);return{href:e,as:y?_(y):e}}let[e,t]=u.resolveHref(N,f,!0);return{href:e,as:y?u.resolveHref(N,y):t||e}},[N,f,y]),D=l.default.useRef(S),H=l.default.useRef(U);O&&(r=l.default.Children.only(n));let K=O?r&&"object"==typeof r&&r.ref:t,[B,X,Z]=p.useIntersection({rootMargin:"200px"}),q=l.default.useCallback(e=>{(H.current!==U||D.current!==S)&&(Z(),H.current=U,D.current=S),B(e),K&&("function"==typeof K?K(e):"object"==typeof K&&(K.current=e))},[U,K,S,Z,B]);l.default.useEffect(()=>{A&&X&&T&&b(A,S,U,{locale:E},I)},[U,S,X,E,T,null==N?void 0:N.locale,A,I]);let z={ref:q,onClick(e){O||"function"!=typeof k||k(e),O&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),A&&!e.defaultPrevented&&function(e,t,n,r,o,u,f,i,c,s){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!a.isLocalURL(n)))return;e.preventDefault();let h=()=>{"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:u,locale:i,scroll:f}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!s})};c?l.default.startTransition(h):h()}(e,A,S,U,x,C,M,E,I,T)},onMouseEnter(e){O||"function"!=typeof w||w(e),O&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),A&&(T||!I)&&b(A,S,U,{locale:E,priority:!0,bypassPrefetchedCheck:!0},I)},onTouchStart(e){O||"function"!=typeof P||P(e),O&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),A&&(T||!I)&&b(A,S,U,{locale:E,priority:!0,bypassPrefetchedCheck:!0},I)}};if(i.isAbsoluteUrl(U))z.href=U;else if(!O||m||"a"===r.type&&!("href"in r.props)){let e=void 0!==E?E:null==N?void 0:N.locale,t=(null==N?void 0:N.isLocaleDomain)&&h.getDomainLocale(U,e,null==N?void 0:N.locales,null==N?void 0:N.domainLocales);z.href=t||v.addBasePath(c.addLocale(U,e,null==N?void 0:N.defaultLocale))}return O?l.default.cloneElement(r,z):l.default.createElement("a",Object.assign({},L,z),n)});t.default=g,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:n,disabled:f}=e,i=f||!l,[c,s]=r.useState(!1),d=r.useRef(null),p=r.useCallback(e=>{d.current=e},[]);r.useEffect(()=>{if(l){if(i||c)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:o,elements:l}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=a.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=u.get(r)))return t;let o=new Map,l=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:l,elements:o},a.push(n),u.set(n,t),t}(n);return l.set(e,t),o.observe(e),function(){if(l.delete(e),o.unobserve(e),0===l.size){o.disconnect(),u.delete(r);let e=a.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=o.requestIdleCallback(()=>s(!0));return()=>o.cancelIdleCallback(e)}},[i,n,t,c,d.current]);let h=r.useCallback(()=>{s(!1)},[]);return[p,c,h]};var r=n(7294),o=n(29);let l="function"==typeof IntersectionObserver,u=new Map,a=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},85:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(5893),o=n(1664),l=n.n(o);function u(){return(0,r.jsxs)("main",{className:"flex min-h-screen flex-col items-center justify-between p-24",children:[(0,r.jsx)("div",{className:"aaa",children:(0,r.jsx)("a",{href:"/aaa",children:"AAA"})}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/",children:"Home"})}),(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/word-cloud",children:"WordCloud"})}),(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/about",children:"About Us"})}),(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/blog/hello-world",children:"Blog Post"})})]})]})}},1664:function(e,t,n){e.exports=n(5569)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);