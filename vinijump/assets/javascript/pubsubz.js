(function(a,c,b){if(typeof module!=="undefined"){module.exports=b(a,c)}else{if(typeof define==="function"&&typeof define.amd==="object"){define(b)}else{c[a]=b(a,c)}}})("radio",this,function(b,c){function a(d){a.$.channel(d);return a.$}a.$={version:"0.2",channelName:"",channels:[],broadcast:function(){var f,j=this.channels[this.channelName],d=j.length,g,h,e;for(f=0;f<d;f++){g=j[f];if((typeof(g)==="object")&&(g.length)){h=g[0];e=g[1]||c}h.apply(e,arguments)}return this},channel:function(d){var e=this.channels;if(!e[d]){e[d]=[]}this.channelName=d;return this},subscribe:function(){var f=arguments,j=this.channels[this.channelName],g,e=f.length,h,d=[];for(g=0;g<e;g++){d=f[g];h=(typeof(d)==="function")?[d]:d;if((typeof(h)==="object")&&(h.length)){j.push(h)}}return this},unsubscribe:function(){var g=arguments,k,h,n=this.channels[this.channelName],f=g.length,e=n.length,m=0,d;for(k=0;k<f;k++){m=0;e=n.length;for(h=0;h<e;h++){d=h-m;if(n[d][0]===g[k]){n.splice(d,1);m++}}}return this}};return a});
/*
function fireEvent(obj, evt){
     var fireOnThis = obj;
     if( document.createEvent ) {
       var evObj = document.createEvent('MouseEvents');
       evObj.initEvent( evt, true, false );
       fireOnThis.dispatchEvent( evObj );
     }
      else if( document.createEventObject ) { //IE
       var evObj = document.createEventObject();
       fireOnThis.fireEvent( 'on' + evt, evObj );
     } 
}*/