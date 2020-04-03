$(".classify").on('mouseover',function(){
	$("#classify").css("display","block");
})

$(".classify").on('mouseleave',function(){
	$("#classify").css("display","none");
})
$(function(){
	var c=getUrlSearch("c");
	if(c==null){
		getClassify();
	}else{
		getClassifyById(c);
	}
})
