window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
window.onload=function(){
	$("#redarea .redballs")[0].addDiv(33);
	$("#bluearea .blueballs")[0].addDiv(16);
	$("#redarea select")[0].addOpt(6,20);//向红球区域的select中 添加option，value从6-20;
	$("#bluearea select")[0].addOpt(1,16);//向蓝球区域的select中添加
	var reddiv=$(".redball");
	//为每一个红球添加onclick事件
	for(var i=0;i<reddiv.length;i++){
		reddiv[i].onclick=function(){//点击红球改变背景色		
		  if(this.style.backgroundColor=="rgb(238, 238, 238)"){	
			this.style.backgroundColor="#DC143C";
			this.style.color="#fff";
		  }else {
			this.style.backgroundColor="#eee";
			this.style.color="#666";
	      }
		getFinalBalls(reddiv,$('.finalred')[0]);
		  //阻止hover样式？
		}
	}
	//为每一个蓝球添加onclick事件
	var bluediv=$(".blueball");
	for(var i=0;i<bluediv.length;i++){
		bluediv[i].onclick=function(){//点击蓝球改变背景色	
		  if(this.style.backgroundColor=="rgb(238, 238, 238)"){	
			this.style.backgroundColor="#4169E1";
			this.style.color="#fff";
		  }else {
			this.style.backgroundColor="#eee";
			this.style.color="#666";
	      }
		  getFinalBalls(bluediv,$('.finalblue')[0]);
		  //阻止hover样式？
		}
	}
	//点击机选，随机选中和select中匹配的红球个数
	getred=function(btn){
		//step1 清除之前选中的红球背景色
		var btn=$("#redarea button")[0];
			cleanStyle(reddiv);
		//step2 获取左侧select中选择的个数n，在随机选中n个红球(即改变起背景色为#dc143c)
			choseballs(reddiv);
		//将选中的红球放入.finalballs中
		var div=$(".finalred")[0];
		getFinalBalls(reddiv,div);

	}
	getblue=function(btn){
		var btn=$("#bluearea button")[0];
			cleanStyle(bluediv);
			choseballs(bluediv);
		//将选中的蓝球放入.finalballs中
		var div=$(".finalblue")[0];
		getFinalBalls(bluediv,div);
	}
		
	//获得当前选中的所有红球和蓝球，并输出
	var form=document.forms[0];
	form.onsubmit=function(){
		//首先获取红蓝区域所选的球
		var r=($('.finalred')[0].innerHTML).length>=17;
		var R=($('.finalblue')[0].innerHTML).length>=2;
		if(r&&R){
			if(confirm("当前所选的是：\n"+"红球 "+$(".finalred")[0].innerHTML+"\n蓝球 "+$(".finalblue")[0].innerHTML)){
				var e=window.event||arguments[0];
				if(e.preventDefault){
            		e.preventDefault() //DOM
				}else{	
            		e.returnValue=false //IE8  
				}
			}
		}else if(!r) {
			alert("请至少选择6个红球");
		}else if(r&&!R){
			alert("请至少选择1个蓝球");	
		}
		//自选的红球个数不够时，没有提示，直接提交了？？？
	}
	cleanAll=function(a){
		if(a==$('#redarea .chose a')[0]){
			cleanStyle(reddiv);
			$(".finalred")[0].innerHTML="";
		}else{
			cleanStyle(bluediv);
			$('.finalblue')[0].innerHTML="";
		}
	}

}//window.onload的结束符

//在HTMLElement原型中定义一个添加div的函数
HTMLElement.prototype.addDiv=function(b){
  var frag=document.createDocumentFragment();
  for(var i=1;i<=b;i++){
	var div=document.createElement("div");
		div.className=b>16?"redball":"blueball";
		div.innerHTML=i<10?"0"+i:i;
		div.dataset.i=i;
		div.style.backgroundColor="#eee";
	frag.appendChild(div);
  }
	this.appendChild(frag);
}

//在HTMLElement原型中定义一个添加option的函数
HTMLElement.prototype.addOpt=function(a,b){
	var frag=document.createDocumentFragment();
	for(var i=a;i<=b;i++){
		var opt=new Option(i+"个",i);
		frag.appendChild(opt);
	}
	this.appendChild(frag);
}
cleanStyle=function(arr){
	for(var i=0;i<arr.length;i++){
			arr[i].style.backgroundColor="#eee";
			arr[i].style.color="#666";
		  }
}
choseballs=function(arr){
	var sel=arr[0].parentNode.parentNode.$(".chose select")[0];//选择当前btn旁边的select
	var value=sel.options[sel.options.selectedIndex].value;//获得当前选中的option的value值
	var nums=[];
	while(nums.length<value){//将要生成的球的个数等于value
		var m=parseInt(Math.random()*arr.length)+1;
		if(nums.indexOf(m)==-1){
			nums.push(m);
			if(arr.length==16){
				arr[m-1].style.backgroundColor="#4169E1";
			}else if(arr.length==33){
				arr[m-1].style.backgroundColor="#DC143C";
			}
			arr[m-1].style.color="#fff";
		}
	}

}
/*********封装将每个选中的球填入form中对应的div中的函数**********/
getFinalBalls=function(arr,div){
	//获取当前标签所在的父元素在其父元素的index
		for(var i=0,ball=[];i<arr.length;i++){
			arr[i].style.backgroundColor!="rgb(238, 238, 238)"&&ball.push(i<9?"0"+(i+1):i+1);
		}
			ball.sort(function(a,b){return a-b});
		div.innerHTML=ball.join(' ');
}
/*********封装每个球的onclick事件函数**********/