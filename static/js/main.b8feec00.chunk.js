(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{219:function(e,t,n){},221:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(20),i=n.n(a),s=(n(87),n(14)),c=n(15),l=n(17),u=n(16),h=n(18),m=n(29),p=n.n(m),d=n(49),b=n(23),f=n(22),g=n(2),w=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.treeIds,n=this.props.treeDict;return o.a.createElement(f.b,{type:"symbol",id:"trees",layout:{"icon-image":"billy"}},t.map(function(t){return o.a.createElement(f.a,{onMouseEnter:e.props.onTreeHover.bind(e,t),onMouseLeave:e.props.onTreeEndHover.bind(e),coordinates:n[t].geometry.coordinates,onClick:e.props.onTreeClick.bind(null,t),key:t})}))}}]),t}(r.Component),y=n(37),k=n(80),v=n.n(k);var D=Object(y.withStyles)(function(e){return{button:{margin:5}}})(function(e){var t=e.classes;return o.a.createElement("div",null,o.a.createElement(v.a,{size:"small",variant:"outlined",className:t.button,onClick:e.onClick},e.text))}),j=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.hoveredTree,t=this.props.onCloseButtonClick,n=this.props.onInfoButtonClick,r=this.props.isClicked;return o.a.createElement(f.c,{key:e.recordid,coordinates:e.geometry.coordinates,offset:15},o.a.createElement("div",{style:{overflowX:"auto"}},o.a.createElement("h3",{style:{fontFamily:"Roboto",fontSize:14,marginTop:5,marginBottom:5}},e.fields.libellefrancais),o.a.createElement("table",{style:{width:"100%"}},o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("td",{style:{fontFamily:"Roboto",fontSize:14,fontWeight:"medium"}},"Genre"),o.a.createElement("td",{style:{fontFamily:"Roboto",fontSize:14,textAlign:"right"}},e.fields.genre)),o.a.createElement("tr",null,o.a.createElement("td",{style:{fontFamily:"Roboto",fontSize:14,fontWeight:"medium"}},"Esp\xe8ce"),o.a.createElement("td",{style:{fontFamily:"Roboto",fontSize:14,textAlign:"right"}},e.fields.espece)),o.a.createElement("tr",null,o.a.createElement("td",{style:{fontFamily:"Roboto",fontSize:14,fontWeight:"medium"}},"Plant\xe9 en"),o.a.createElement("td",{style:{fontFamily:"Roboto",fontSize:14,textAlign:"right"}},e.fields.dateplantation.substr(0,4))))),r?o.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},o.a.createElement(D,{onClick:n,text:"Infos"}),o.a.createElement(D,{onClick:t,text:"Fermer"})):null))}}]),t}(r.Component),E=n(52),C=n.n(E),T=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement("div",null,o.a.createElement(C.a,{open:this.props.leftDrawer,onClose:this.props.toggleDrawer},o.a.createElement("div",{tabIndex:0,role:"button",onClick:this.props.toggleDrawer,onKeyDown:this.props.toggleDrawer})),o.a.createElement(C.a,{anchor:"bottom",open:this.props.bottomDrawer,onClose:this.props.toggleDrawer},o.a.createElement("div",{tabIndex:0,role:"button",onClick:this.props.toggleDrawer,onKeyDown:this.props.toggleDrawer},o.a.createElement("div",{className:e.wikiRow},o.a.createElement("img",{className:e.treeImg,src:this.props.thumbnailUrl,alt:"Wiki Thumbnail"})),o.a.createElement("div",{className:e.wikiTextContainer},o.a.createElement("p",null,this.props.wikiDesc)))))}}]),t}(o.a.Component),x=Object(y.withStyles)({list:{width:250},fullList:{width:"auto"},treeImg:{marginTop:10,marginBottom:10,marginRight:10,width:100,display:"inlineBlock",float:"left"},wikiRow:{marginLeft:10,marginRight:10},wikiTextContainer:{marginLeft:10,marginRight:10}})(T),O=n(53),I=Object(f.d)({minZoom:11,maxZoom:16,accessToken:O.b}),S=O.a,B={speed:.6},R=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onMapLoad=function(e){e.addControl(new g.GeolocateControl({positionOptions:{enableHighAccuracy:!0},trackUserLocation:!1}))},n.onTreeHover=function(e,t){t.map.getCanvas().style.cursor="pointer",n.setState({hoveredTreeID:n.state.clickedTreeID?"":e})},n.onTreeEndHover=function(e){e.map.getCanvas().style.cursor="",n.setState({hoveredTreeID:""})},n.onTreeClick=function(e){n.setState({hoveredTreeID:e,clickedTreeID:e})},n.onInfoButtonClick=function(){console.log("CLICKED"),n.setState({bottomDrawer:!0});var e=n.state.hoveredTreeID?n.state.hoveredTreeID:n.state.clickedTreeID,t=n.state.treeDict[e].fields.genre+"_"+n.state.treeDict[e].fields.espece;n.wikiTreeData(t)},n.onCloseButtonClick=function(){n.setState({hoveredTreeID:"",clickedTreeID:""})},n.toggleDrawer=function(){n.setState({bottomDrawer:!1,thumbnailUrl:"",wikiDesc:""})},n.TreeData=Object(d.a)(p.a.mark(function e(){var t,r,o,a,i;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&rows=200");case 3:return r=e.sent,e.next=6,r.json();case 6:for(o=e.sent,a=Math.min(o.parameters.rows,o.nhits),i=0;i<a;i++)t.push(i);return e.abrupt("return",n.setState({treeDict:o.records,nbTrees:a,treeIds:t},function(){console.log("dict",this.state.treeDict),console.log("nb",this.state.nbTrees),console.log("ids",this.state.treeIds)}));case 10:case"end":return e.stop()}},e,this)})),n.wikiTreeData=function(){var e=Object(d.a)(p.a.mark(function e(t){var r,o,a,i,s,c,l,u,h,m,d,b,f;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.split(" ").join("_"),console.log("Safe Keyword: ",r),o="https://fr.wikipedia.org/w/api.php?format=json&origin=*",a="",i=0,e.prev=5,e.next=8,fetch("".concat(o,"&action=query&list=search&srsearch=").concat(r));case 8:return s=e.sent,e.next=11,s.json();case 11:return c=e.sent,console.log("Search response Json",c),e.next=15,c.query.search[0].title;case 15:return a=e.sent,e.next=18,c.query.search[0].pageid;case 18:i=e.sent,console.log("Best result",a),e.next=25;break;case 22:e.prev=22,e.t0=e.catch(5),console.log("search error",e.t0);case 25:return l="",e.prev=26,e.next=29,fetch("".concat(o,"&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=").concat(a));case 29:return u=e.sent,e.next=32,u.json();case 32:return h=e.sent,console.log("descQuery Json",h),e.next=36,h.query.pages;case 36:return m=e.sent,console.log("Pages",m),e.next=40,m[Object.keys(m)[0]].extract;case 40:l=e.sent,console.log("desc",l),e.next=47;break;case 44:e.prev=44,e.t1=e.catch(26),console.log("desc error",e.t1);case 47:return d="",e.prev=48,e.next=51,fetch("".concat(o,"&action=query&prop=pageimages&titles=").concat(a,"&pithumbsize=200"));case 51:return b=e.sent,e.next=54,b.json();case 54:return f=e.sent,console.log("thumbQuery Json",f),e.next=58,f.query.pages[i].thumbnail.source;case 58:d=e.sent,console.log("Thumbnail",d),e.next=65;break;case 62:e.prev=62,e.t2=e.catch(48),console.log("thumbnail error",e.t2);case 65:return e.abrupt("return",n.setState({wikiDesc:l,thumbnailUrl:d},function(){console.log("wikiData",this.state.thumbnailUrl)}));case 66:case"end":return e.stop()}},e,this,[[5,22],[26,44],[48,62]])}));return function(t){return e.apply(this,arguments)}}(),n.state={treeDict:"",nbTrees:0,treeIds:[],hoveredTreeID:"",clickedTreeID:"",mapCenter:[2.3466110229492188,48.85613168160397],zoom:[12],leftDrawer:!1,bottomDrawer:!1,wikiTreeData:"",thumbnailUrl:"",wikiDesc:""},n.toggleDrawer=n.toggleDrawer.bind(Object(b.a)(Object(b.a)(n))),n.onInfoButtonClick=n.onInfoButtonClick.bind(Object(b.a)(Object(b.a)(n))),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.TreeData()}},{key:"render",value:function(){var e=this.state.hoveredTreeID,t=this.state.clickedTreeID,n=this.state.mapCenter,r=this.state.zoom;return o.a.createElement("div",null,o.a.createElement(I,{onStyleLoad:this.onMapLoad,style:S,center:n,containerStyle:{width:"100vw",height:"100vh"},flyToOptions:B,zoom:r},o.a.createElement(w,{onTreeHover:this.onTreeHover,onTreeEndHover:this.onTreeEndHover,treeIds:this.state.treeIds,treeDict:this.state.treeDict,onTreeClick:this.onTreeClick}),(e+t||e+t===0)&&o.a.createElement(j,{isClicked:t?1:0,hoveredTree:this.state.treeDict[e||t],onCloseButtonClick:this.onCloseButtonClick,onInfoButtonClick:this.onInfoButtonClick})),o.a.createElement(x,{wikiDesc:this.state.wikiDesc,thumbnailUrl:this.state.thumbnailUrl,leftDrawer:this.state.leftDrawer,bottomDrawer:this.state.bottomDrawer,toggleDrawer:this.toggleDrawer}))}}]),t}(r.Component),z=(n(219),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(x,null),o.a.createElement(R,null))}}]),t}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},53:function(e){e.exports={b:"pk.eyJ1IjoiaGlwcG9seXRlaiIsImEiOiJjamdub2g0cmoyMjZyMndzN3I2eGd4Y3Y3In0.weVb9EjRtuH1lSMFAOqcCA",a:"mapbox://styles/hippolytej/cjgnojfg700a02rp30bjdees6"}},82:function(e,t,n){e.exports=n(221)},87:function(e,t,n){}},[[82,2,1]]]);
//# sourceMappingURL=main.b8feec00.chunk.js.map