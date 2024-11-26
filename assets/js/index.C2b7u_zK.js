import{j as e,_ as t,Q as n,R as r,T as o,U as i,V as a,W as s,X as c,Y as l,Z as u,$ as p,a0 as d,a1 as m,a2 as f}from"./main.BYdgsmv9.js";import{s as h}from"./types.B4uo5GMd.js";import{m as v}from"./animation-vendor.DmVePRw9.js";import{R as y,r as g,u as w}from"./react-vendor.CGM0SB6t.js";var x=function(n){var r=n.service,o=n.index,i=n.className;return e.jsx(v.div,{variants:h,initial:"hidden",whileInView:"visible",viewport:{once:!0},custom:o,className:t("group relative",i),children:e.jsxs("div",{className:"h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300",children:[e.jsxs("div",{className:"relative w-16 h-16 mb-8",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"}),e.jsx("div",{className:"relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl",children:r.icon})]}),e.jsx("h3",{className:"text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300",children:r.title}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-8 leading-relaxed",children:r.description}),e.jsx("ul",{className:"space-y-4",children:r.features.map((function(t,n){return e.jsxs(v.li,{variants:h,custom:o+(n+1),whileHover:{x:4},className:"flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200",children:[e.jsx("span",{className:"w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 mr-3"}),e.jsx("span",{className:"text-sm",children:t})]},n)}))})]})})};x.displayName="ServiceCard";var b={Code:y.createElement(m,{className:"w-6 h-6"}),Desktop:y.createElement(d,{className:"w-6 h-6"}),Video:y.createElement(p,{className:"w-6 h-6"}),Cube:y.createElement(u,{className:"w-6 h-6"}),Support:y.createElement(l,{className:"w-6 h-6"}),Chart:y.createElement(c,{className:"w-6 h-6"})},j={title:"Expert Services",description:"Delivering precision-engineered solutions and comprehensive digital services that drive innovation, efficiency, and business growth",services:[{id:"technical-design",title:"Technical Design & CAD",icon:b.Cube,description:"Delivering precision-engineered technical drawings and 3D models using advanced CAD technologies. Specializing in industrial equipment, commercial systems, and detailed documentation.",features:["AutoCAD technical drawings and documentation","Industrial and commercial system design","3D modeling and visualization","Technical specifications compliance","Design optimization and revision control"]},{id:"virtual-assistance",title:"Virtual Assistance",icon:b.Support,description:"Comprehensive virtual support services focused on enhancing operational efficiency and digital transformation. Expertise in project coordination, documentation, and process optimization.",features:["Project management and coordination","Technical documentation and reporting","Process automation and optimization","Digital workflow implementation","Administrative systems management"]},{id:"web-development",title:"Web Development",icon:b.Code,description:"Creating modern, responsive web applications using cutting-edge technologies. Focus on performance optimization, user experience, and scalable solutions that drive business growth.",features:["React/Next.js application development","TypeScript and modern JavaScript solutions","Responsive design with Tailwind CSS","Performance optimization and SEO","API integration and documentation"]},{id:"multimedia",title:"Multimedia Production",icon:b.Video,description:"Professional multimedia content creation utilizing industry-standard tools for compelling visual storytelling. Expertise in video production, motion graphics, and content optimization.",features:["Professional video post-production","Motion graphics and animations","Visual content creation and editing","Audio enhancement and synchronization","Multi-platform content optimization"]},{id:"technical-support",title:"Technical Support",icon:b.Desktop,description:"Expert technical assistance and problem-solving services for businesses and individuals. Specializing in system optimization, troubleshooting, and technology implementation.",features:["System analysis and optimization","Technical troubleshooting","Software implementation and training","IT infrastructure management","Technical documentation and guides"]},{id:"project-management",title:"Project Management",icon:b.Chart,description:"Strategic project leadership focusing on efficient delivery, risk management, and quality assurance. Utilizing modern methodologies to ensure project success and stakeholder satisfaction.",features:["Project planning and execution","Resource allocation and optimization","Risk assessment and mitigation","Quality control and assurance","Stakeholder communication"]}],faqs:[{question:"What types of technical design services do you offer?",answer:"I offer comprehensive technical design services using AutoCAD, specializing in industrial equipment, commercial systems, and detailed documentation. This includes technical drawings, 3D modeling, system design, and specification compliance."},{question:"Can you help with virtual assistance and project management?",answer:"Yes, I provide comprehensive virtual assistance services including project coordination, technical documentation, process automation, digital workflow implementation, and administrative systems management. I also offer strategic project management services focusing on efficient delivery and stakeholder satisfaction."},{question:"What web development technologies do you work with?",answer:"I specialize in modern web development using React/Next.js, TypeScript, and Tailwind CSS. I focus on creating responsive, performant applications with optimized SEO and seamless API integrations."},{question:"Do you offer multimedia production services?",answer:"Yes, I provide professional multimedia production services including video post-production, motion graphics, visual content creation, audio enhancement, and content optimization for multiple platforms."},{question:"What kind of technical support do you provide?",answer:"I offer expert technical support services including system analysis and optimization, troubleshooting, software implementation and training, IT infrastructure management, and technical documentation."},{question:"How do you ensure project quality and timely delivery?",answer:"I employ modern project management methodologies with a focus on quality control, risk assessment, resource optimization, and clear stakeholder communication to ensure successful project delivery."}]};function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(){E=function(){return t};var e,t={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(e,t,n){e[t]=n.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(z){l=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var i=t&&t.prototype instanceof y?t:y,a=Object.create(i.prototype),s=new D(r||[]);return o(a,"_invoke",{value:O(e,n,s)}),a}function p(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=u;var d="suspendedStart",m="suspendedYield",f="executing",h="completed",v={};function y(){}function g(){}function w(){}var x={};l(x,a,(function(){return this}));var b=Object.getPrototypeOf,j=b&&b(b(T([])));j&&j!==n&&r.call(j,a)&&(x=j);var S=w.prototype=y.prototype=Object.create(x);function N(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function n(o,i,a,s){var c=p(e[o],e,i);if("throw"!==c.type){var l=c.arg,u=l.value;return u&&"object"==k(u)&&r.call(u,"__await")?t.resolve(u.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(u).then((function(e){l.value=e,a(l)}),(function(e){return n("throw",e,a,s)}))}s(c.arg)}var i;o(this,"_invoke",{value:function(e,r){function o(){return new t((function(t,o){n(e,r,t,o)}))}return i=i?i.then(o,o):o()}})}function O(t,n,r){var o=d;return function(i,a){if(o===f)throw Error("Generator is already running");if(o===h){if("throw"===i)throw a;return{value:e,done:!0}}for(r.method=i,r.arg=a;;){var s=r.delegate;if(s){var c=P(s,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===d)throw o=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=f;var l=p(t,n,r);if("normal"===l.type){if(o=r.done?h:m,l.arg===v)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=h,r.method="throw",r.arg=l.arg)}}}function P(t,n){var r=n.method,o=t.iterator[r];if(o===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,P(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),v;var i=p(o,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,v;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function I(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function D(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(I,this),this.reset(!0)}function T(t){if(t||""===t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}throw new TypeError(k(t)+" is not iterable")}return g.prototype=w,o(S,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:g,configurable:!0}),g.displayName=l(w,c,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,w):(e.__proto__=w,l(e,c,"GeneratorFunction")),e.prototype=Object.create(S),e},t.awrap=function(e){return{__await:e}},N(L.prototype),l(L.prototype,s,(function(){return this})),t.AsyncIterator=L,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new L(u(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},N(S),l(S,c,"Generator"),l(S,a,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=T,D.prototype={constructor:D,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(C),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return s.type="throw",s.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),C(n),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;C(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}function S(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return N(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(e,t):void 0}}(e))||t){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){s=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw i}}}}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){P(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function P(e,t,n){return(t=function(e){var t=function(e){if("object"!=k(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=k(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==k(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(l){return void n(l)}s.done?t(c):Promise.resolve(c).then(r,o)}var C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.getElementById(t.id||e);if(n)t.onLoad&&(n.hasAttribute("data-loaded")?t.onLoad():n.addEventListener("load",t.onLoad));else{var r=document.createElement("script");r.src=e,r.id=t.id||e,t.async&&(r.async=!0),t.defer&&(r.defer=!0),r.setAttribute("fetchpriority",t.async?"low":"high"),r.setAttribute("loading",t.async?"lazy":"eager");var o=document.createElement("link");o.rel="preconnect",o.href=new URL(e).origin,document.head.appendChild(o),r.addEventListener("load",(function(){r.setAttribute("data-loaded","true"),t.onLoad&&t.onLoad(),o.remove()})),r.addEventListener("error",(function(e){t.onError&&t.onError(e),o.remove()})),document.body.appendChild(r)}},D=function(){var e,t=(e=E().mark((function e(t){var n,r,o,i,a,s;return E().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=function(e){return new Promise((function(t,n){var r=setTimeout((function(){n(new Error("Script load timeout: ".concat(e.src)))}),1e4);C(e.src,O(O({},e.options),{},{onLoad:function(){var n;clearTimeout(r),t(),null!==(n=e.options)&&void 0!==n&&n.onLoad&&e.options.onLoad()},onError:function(t){var o;clearTimeout(r),n(t),null!==(o=e.options)&&void 0!==o&&o.onError&&e.options.onError(t)}}))}))},r=function(e){return new Promise((function(t){"requestIdleCallback"in window?window.requestIdleCallback((function(){n(e).then(t).catch(t)})):setTimeout((function(){n(e).then(t).catch(t)}),1)}))},o=S(t),e.prev=3,o.s();case 5:if((i=o.n()).done){e.next=21;break}if(s=i.value,null===(a=s.options)||void 0===a||!a.async){e.next=11;break}r(s).catch(console.error),e.next=19;break;case 11:return e.prev=11,e.next=14,n(s);case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(11);case 19:e.next=5;break;case 21:e.next=26;break;case 23:e.prev=23,e.t1=e.catch(3),o.e(e.t1);case 26:return e.prev=26,o.f(),e.finish(26);case 29:case"end":return e.stop()}}),e,null,[[3,23,26,29],[11,16]])})),function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){I(i,r,o,a,s,"next",e)}function s(e){I(i,r,o,a,s,"throw",e)}a(void 0)}))});return function(e){return t.apply(this,arguments)}}(),T=function(t){var n=t.title,r=void 0===n?"Ralph Serrano - Full Stack Developer":n,o=t.description,i=void 0===o?"Full Stack Developer specializing in React, TypeScript, and Node.js. Creating modern web applications with a focus on performance and user experience.":o,a=t.keywords,s=void 0===a?["Full Stack Developer","React","TypeScript","Node.js","Web Development"]:a,c=t.image,l=void 0===c?"/assets/images/og-image.jpg":c,u=t.url,p=void 0===u?"https://ralphserrano.dev":u;t.metaConfig;var d=t.route,m=t.servicesData;return d.meta,g.useEffect((function(){D([{src:"https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",options:{defer:!0}},{src:"https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js",options:{defer:!0}}]).catch(console.error)}),[]),e.jsxs(f,{children:[e.jsx("title",{children:r}),e.jsx("meta",{name:"title",content:r}),e.jsx("meta",{name:"description",content:i}),e.jsx("meta",{name:"keywords",content:s.join(", ")}),e.jsx("meta",{name:"author",content:"Ralph Bernard Serrano"}),e.jsx("meta",{name:"robots",content:"index, follow"}),e.jsx("meta",{name:"language",content:"English"}),e.jsx("meta",{name:"revisit-after",content:"7 days"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),e.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),e.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),e.jsx("link",{rel:"preconnect",href:"https://cdn.jsdelivr.net",crossOrigin:"anonymous"}),e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("link",{rel:"preload",href:"/fonts/Inter-Regular.woff2",as:"font",type:"font/woff2",crossOrigin:"anonymous"}),e.jsx("style",{children:"\n          @font-face {\n            font-family: 'Inter';\n            font-weight: 400;\n            font-display: swap;\n            font-style: normal;\n            src: url('/fonts/Inter-Regular.woff2') format('woff2');\n          }\n\n          @font-face {\n            font-family: 'Inter';\n            font-weight: 500;\n            font-display: swap;\n            font-style: normal;\n            src: url('/fonts/Inter-Medium.woff2') format('woff2');\n          }\n\n          @font-face {\n            font-family: 'Inter';\n            font-weight: 600;\n            font-display: swap;\n            font-style: normal;\n            src: url('/fonts/Inter-SemiBold.woff2') format('woff2');\n          }\n\n          @font-face {\n            font-family: 'Inter';\n            font-weight: 700;\n            font-display: swap;\n            font-style: normal;\n            src: url('/fonts/Inter-Bold.woff2') format('woff2');\n          }\n        "}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:p}),e.jsx("meta",{property:"og:title",content:r}),e.jsx("meta",{property:"og:description",content:i}),e.jsx("meta",{property:"og:image",content:l}),e.jsx("meta",{property:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{property:"twitter:url",content:p}),e.jsx("meta",{property:"twitter:title",content:r}),e.jsx("meta",{property:"twitter:description",content:i}),e.jsx("meta",{property:"twitter:image",content:l}),e.jsx("meta",{name:"theme-color",content:"#2ecc71"}),e.jsx("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),e.jsx("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),e.jsx("meta",{name:"apple-mobile-web-app-title",content:r}),m&&e.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:m.faqs.map((function(e){return{"@type":"Question",name:e.question,acceptedAnswer:{"@type":"Answer",text:e.answer}}}))})})]})},z={siteUrl:"https://ralphserrano.dev",title:"Ralph Serrano - Full Stack Developer",description:"Full Stack Developer specializing in React, TypeScript, and Node.js. Creating modern web applications with a focus on performance and user experience.",author:"Ralph Bernard Serrano",socialMedia:{github:"https://github.com/ralphs",linkedin:"https://linkedin.com/in/ralphserrano",youtube:"https://youtube.com/@ralphserrano",facebook:"https://facebook.com/ralphserrano",instagram:"https://instagram.com/ralphserrano",upwork:"https://www.upwork.com/freelancers/ralphserrano"}},A=function(n){var r=n.className,o={path:w().pathname,meta:{title:"Services - Technical Design, Web Development & Virtual Solutions | Ralph Serrano",description:"Professional services in AutoCAD Technical Design, Modern Web Development, and Virtual Assistance. Get expert solutions for your projects."}};return e.jsxs("section",{className:t("relative py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900",r),children:[e.jsx(T,{title:o.meta.title,description:o.meta.description,servicesData:j,route:o,metaConfig:z}),e.jsx("div",{className:"absolute inset-0 opacity-[0.03] dark:opacity-[0.02]",children:e.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",backgroundSize:"30px 30px"}})}),e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsxs(v.div,{variants:h,initial:"hidden",whileInView:"visible",viewport:{once:!0},className:"text-center mb-16",children:[e.jsx("span",{className:"inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4",children:"Professional Services"}),e.jsx("h2",{className:"text-4xl font-bold text-gray-900 dark:text-white mb-4",children:j.title}),e.jsx("p",{className:"text-gray-600 dark:text-gray-400 max-w-2xl mx-auto",children:j.description})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto",children:j.services.map((function(t,n){return e.jsx(x,{service:t,index:n,className:n>=2?"lg:col-span-1":""},t.id)}))}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"})]})]})};A.displayName="Services";export{x as ServiceCard,A as Services,h as serviceItemVariants,j as servicesData};
