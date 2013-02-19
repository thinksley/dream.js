/**********************/
/*name  dream.js*/
/*date 2012-10-08*/
/*version v1.0*/
/*author thinksley*/
/*纯手工常用前端功能函数封装，待续*/
/**********************/

var dream=dream || {};
$dom=dream.dom=dream.dom || {};
$array=dream.array=dream.array || {};
$string=dream.string=dream.string || {};
$number=dream.number=dream.number || {};
$events=dream.events=dream.events || {};
$page=dream.page=dream.page || {};
$object=dream.object=dream.object || {};
$fn=dream.fn=dream.fn || {};
//g(element) 抓取元素
dream.g=function(id){
   if(!id) return null;
	 if(typeof id == 'string' || id instanceof String){
		   return document.getElementById(id)
		 }else if(id.nodeName && (id.nodeType==1 || id.nodeType==9)){
		   return id;	 
		 }
	 return null;
	}
//q(oParent,sClass)
dream.q=function(oParent,sClass){
	   var alls=oParent.getElementsByTagName('*');
	   var res=[];
	   for(var i=0;i<alls.length;i++){
		     if(alls[i].className==sClass)
			    res.push(alls[i]);
		   }
	   return res;
	}
//hide(element) 隐藏元素
dream.dom.hide=function(element){
  	  var obj=dream.g(element);
      obj.style.display='none';
	}
//show(elemnt) 显示元素
dream.dom.show=function(element){
  	  var obj=dream.g(element);
      obj.style.display='block';
	}
//addClass(elemnt,className) 添加样式名
dream.dom.addClass=function(element,className){
	  var element=dream.g(element);
	  var classArray=className.split(',');
	  result=classArray;
	  element.className=result;
	  return element;
	}
//dream.toogle(element) 显示/隐藏元素
dream.dom.toogle=function(element){
  	 var element=dream.g(element);
	 element.style.display = element.style.display=='none' ? '' :'none';
     return element;
   }

//dream.remove
dream.dom.remove=function(element){
	  var element=dream.g(element);
	  tmpEl=element.parentNode;
	  tmpEl && tmpEl.removeChild(element);
	}
//dream.dom.width(element)  获取元素宽度
dream.dom.width=function(element){
	  var element=dream.g(element);
	  return element.offsetWidth;
	}

//dream.dom.height(element)  获取元素宽度
dream.dom.height=function(element){
	  var element=dream.g(element);
	  return element.offsetHeight;
	}

//getParent(element)  父亲层
dream.dom.getParent=function(element){
	   element=dream.g(element);
	  return element.parentElement || element.parentNode || null; //兼容
   }
//dream.dom.getStyle(element,attr)  获取样式值得
dream.dom.getStyle=function(element,attr){
	   var element=dream.g(element);
	   if(element.currentStyle)
	   {
	     return element.currentStyle[attr];
	   }else
	   {
	     return getComputedStyle(element,false)[attr];
	   }
	}
//dream.dom.showTab()  选项卡
dream.dom.showTab=function(menu,card,cur,alls,listStyle){
	  //待续
	  
}
dream.dom.bg=function(element,value){
	   element=dream.g(element);
	   element.style.background=value;
	}
//dream.dom.css()
dream.dom.css=function(obj,attr,value){
	   if(arguments.length==2){
		     return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj,false)[attr]);
		   }else if(arguments.length==3){
			  switch(attr)
			  {
				case 'width':
				case 'height': 
				case 'paddingLeft': 
				case 'paddingRight': 
				case 'paddingTop': 
				case 'paddingBottom':
				   value=Math.max(value,0); 
				case 'left': 
				case 'top': 
				case 'marginLeft': 
				case 'marginTop': 
				case 'marginRight': 
				case 'marginBottom':
				  obj.style[attr]=value+'px';
				  break;
				case 'opacity':
				  obj.style.filter='alpha(opacity'+value*100+')'; 
				  obj.style.opacity=value;
				  break;
				default:
				  obj.style[attr]=value;
			  }
		   }
		 return function(attr_in,value_in){css(obj,attr_in,value_in)};
	}

//dream.array.empty(source)清空数组
dream.array.empty=function(source){
	  source.length=0;
	}
//dream.array.finds(source,iterator)
dream.array.finds=function(source,iterator){
	  var i,iteam,len=source.length;
	  if(typeof iterator=='function'){
		     for(var i=0;i<len;i++){
				   iteam=source[i];
				   if(iterator.call(source,iteam,i)){
					     return iteam;
					   }
				 }
		  }
	  return null;
	}
//hash(keys,values) 哈希
dream.string.hash=function(keys,values){
	  var o={},l=keys.length,vl=values && values.length;
	  for(var i=0;i<l;i++){
		    o[keys[i]]=(vl && vl>i) ? values[i] : true;
		  }
	  return o;
	}
//dream.trime(str) 去除左右空格
dream.string.trim=function(str){
	  return str.replace(/^\s+ | \s+$/g,'');
	}
//dream.string.randNum(mins,maxs) 生成随机数
dream.string.randNum=function(mins,maxs){
	  return Math.floor(Math.random()*(maxs-mins+1)+mins);
	}
//dream.number.numberFormat() 3个隔开阿拉伯数字 零宽度正预测先行断言(?=表达式)表示前面的位置
dream.number.numberFormat=function(val){
	  var numArr=String(val).split('.');
	  numArr[0]=numArr[0].replace(/(\d)(?=(\d{3})+$)/ig,'$1,');
	  return numArr.join('.');
	}
//dream.number.pad(source,length) 前面置多少个零
dream.number.pad=function(source,length){
	 var pre='',
	      negative=(source<0),
	      string=String(Math.abs(source));
	  if(string.length<length){
		    pre=(new Array(length-string.length+1)).join('0');
		  }
	   return (negative ? '-' : '') + pre + string; 
	  
	}

//dream.events.on(obj,type,fn)事件绑定
dream.events.on=function(obj,type,fn){
	  return obj.attachEvent ? obj.attachEvent('on'+type,fn) : obj.addEventListener(type,fn,false);
    }
//dream.events.getPageX(e)鼠标x位置
/*dream.events.getPageX=function(ev){  //该函数可用的 by dreamley
	   var oEven=ev || window.event;
	   return oEven.clientX;
	}*/
dream.events.getPageX=function(event){
	  var result=event.pageX,doc=document;
	  if(!result || result!==0){
		    result=(event.clientX || 0) + (doc.documentElement.scrollLeft || doc.body.scrollLeft)
		  }
	  return result;
	}
//dream.events.getPageY(e)鼠标y位置
dream.events.getPageY=function(event){
	  var result=event.pageY,doc=document;
	  if(!result || result!==0){
		    result=(event.clientY || 0) + (doc.documentElement.scrollTop || doc.body.scrollTop)
		  }
	  return result;
	}
//dream.events.getKeyCode(e) 键盘监听
dream.events.getKeyCode=function(event){
	  return event.which || event.keyCode;
	}
//dream.page.loadCss(path) 加载css文件
dream.page.loadCss=function(path){
	  var element=document.createElement('link');
	  element.href=path;
	  element.rel='stylesheet';
	  element.type='text/css';
	  document.getElementsByTagName('head')[0].appendChild(element);
	}
//dream.page.loadJs(path)  加载js文件
dream.page.loadJs=function(path){
	  var element=document.createElement('script');
	  element.type='text/javascript';
	  element.src=path;
	  document.getElementsByTagName('head')[0].appendChild(element);
	}
//dream.page.getScrollTop() 获取竖直方向的滚动值
dream.page.getScrollTop=function(){
	  var doc=document;
	  return window.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop; 
	}
//dream.page.getScroll() 获取水平方向的滚动值
dream.page.getScrollLeft=function(){
	  var doc=document;
	  return window.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
	}
//dream.page.getMousePosition 获取鼠标坐标
/*(function(){

 dream.page.getMousePosition = function(){
 return {
   x : dream.page.getScrollLeft() + xy.x,
   y : dream.page.getScrollTop() + xy.y
  };
};
var xy = {x:0, y:0};
// 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
dream.event.on(document, "onmousemove", function(e){
    e = window.event || e;
    xy.x = e.clientX;
    xy.y = e.clientY;
    });
})();*/

//dream.page.viewWidth  获取整个body可见区域宽度
dream.page.viewWidth=function(){
	  var doc=document;
	  client=doc.compatMode=='backCompat' ? doc.body : doc.documentElement;
	  return client.clientWidth;
	}
//dream.page.viewHeight 获取整个body可见区域高度
dream.page.viewHeight=function(){
	  var doc=document;
	  client=doc.compatMode=='backCompat' ? doc.body : doc.documentElement;
	  return client.clientHeight;
	}
//运动  待续
dream.fn.startMove=function(){
	  
	}
//=dream.object.extend(element,source)
dream.object.extend=function(target,source){
	  for(p in source){
		    if(source.hasOwnProperty[p]){
				  target[p]=source[p];
				}
		  }
	   return target;
	}
