nodesObj={};
var nodeAndId={
	"1":"首页",
	"1000":"离开了",
	"10":"点击video文件",
	"11":"点击Image文件",
	"12":"点击搜索结果",
	"110":"好友",
	"111":"测试"

}
function getData(){
	var results={"1":{"1000":10,"10":20,"11":50,"12":80},"11":{"110":11,"111":22},"10":{"1000":90}};
	return results;
}
function render(){
	var canvas = document.getElementById('topo');            
    var stage = new JTopo.Stage(canvas);
    var scene = new JTopo.Scene(stage);
    scene.alpha = 1;
    //转换数据
    var nodes=getData();
    for(var node in nodes){
    	var fromId=node;
    	var fromText=nodeAndId[fromId];
    	
    	if(nodesObj.hasOwnProperty(fromId)){
    		var fromNode=nodesObj[fromId].node;
    	}else{
    		var fromNode=addNode(fromText);
    		
    	}
    	
    	
    	for(var tn in nodes[node]){
    		var toId=tn;
    		var toText=nodeAndId[toId];
    		var toNode=addNode(toText);
    		nodesObj[toId]={
	    		id:toId,
	    		node:toNode
    		}
    		addLink(fromNode,toNode,nodes[node][tn])
    	}
    }






    function addNode(text){
    		var node = new JTopo.Node();
    		var showtext="";
    			if(text.length > 3){
    				showtext=text.substring(0,3)+"..."
    			}else{
    				showtext=text;
    			}
                node.text = showtext;
                node.fontColor = '0,0,0';
                node.setSize(60, 30);  // 尺寸
            	node.borderRadius = 3; // 圆角
            	node.borderWidth = 2; // 边框的宽度
            	node.borderColor = '255,255,255'; //边框颜色 
            	node.textPosition = 'Middle_Center'; 
            	node.textOffsetY = -8;         
            	node.alpha = 1; //透明度
                scene.add(node);
                
                node.mouseover(function(){
                    this.text = text;
                });
                node.mouseout(function(){
                    this.text = showtext;
                });
                return node;
            }
            
            function addLink(nodeA, nodeZ,value){
                var link = new JTopo.Link(nodeA, nodeZ);
                link.strokeColor = '#000';
                link.lineWidth = 1;
                link.text=value+"";
                link.fontColor="#000";
                link.arrowsRadius = 10;
                scene.add(link);
                return link;
            }
            
            
            // 树形布局
            scene.doLayout(JTopo.layout.TreeLayout('down', 60, 100));

}
render();