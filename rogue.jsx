
var map;
var lS=4; // size of map multiplied by 16 
var X=lS*16,Y=lS*8;
var cPos=0; // current position of hero 


function initMap(){
 var x,i,m;

 x=createLevelCode(lS);
 m=createMap(x);
 map=m.split('');
 placeHeroSomewhere();

 /*
 for(i=X*Y;i<lS*16*7;++i)
  {map[i]='0';}
 */
}


function Screen(){
 var x,i,m;
 var matrix=[];

 initMap();

 for(i=0;i<X*Y;++i)  
  {matrix.push( screenCell(i,map[i]) )
  }

 return (<div>{matrix}</div>);
}

function screenCell(x,t){
 return (<Cell key={x} id={x} kind={t} />);
}

function Cell(props){

 if(props.kind=='x'){return (<img src="x.jpg" alt=" x" />);} //wall
 if(props.kind=='.'){return (<img src="dot.jpg" alt=" ." />);} //nothing
 if(props.kind=='@'){return (<img src="hero.jpg" alt=" @" />);} //hero

 return (<img src="dot.jgp" alt=" ." />); // by default 
}

function placeHeroSomewhere(){
 var x,j=0,s=0;

 

 while( j < X*9)
  {if(map[j]=='.')
    {x=Math.floor(Math.random()*108);
     if( x>101 && s==0 ){map[j]='@';x=0;s=1;}
    }
   ++j;
  } 
 
 

}

/*ReactDOM.render(<Screen/>,document.getElementById('screen'));}*/

ReactDOM.render(<Around status="init"/>,document.getElementById('around'));

function Around(props){
 var r,i,j=0,l;
 var a=[];
 var around=[];

 if(props.status=="init"){initMap();}
 r=getSurroundings();

 console.log("hero position: "+r);

 l=r-3*lS*16-3;
 for(i=0;i<7;++i){if(l>0){a[j++]=map[l+i];}else{a[j++]='0';}}// line 0 
 l=r-2*lS*16-3;
 for(i=0;i<7;++i){if(l>0){a[j++]=map[l+i];}else{a[j++]='0';}}// line 1 
 l=r-1*lS*16-3;
 for(i=0;i<7;++i){if(l>0){a[j++]=map[l+i];}else{a[j++]='0';}}// line 2 
 l=r-3;
 for(i=0;i<7;++i){if(l>0){a[j++]=map[l+i];}else{a[j++]='0';}}// line 3
 l=r+1*lS*16-3;
 for(i=0;i<7;++i){if(l>0){a[j++]=map[l+i];}else{a[j++]='0';}}// line 4
 l=r+2*lS*16-3;
 for(i=0;i<7;++i){if(l>0){a[j++]=map[l+i];}else{a[j++]='0';}}// line 5
 l=r+3*lS*16-3;
 for(i=0;i<7;++i){if(l>0){a[j++]=map[l+i];}else{a[j++]='0';}}// line 6 

 for(i=0;i<7*7;++i)
  {around.push(surroundTile(i,a[i]));}

 
 console.log(a.join(''));

 return (<div>{around}</div>);
}

function getSurroundings(){
 var i=0,f=false;

 while(i<X*Y && f==false)
  {if(map[i]=='@'){f=true;}
   ++i;
  }

 cPos=i-1; //set global cPos to position of hero 
 
 return i-1;
}

function surroundTile(x,t){
 return (<Tile key={x} id={x} kind={t} />);
}

function Tile(props){
 if(props.kind=='x'){return (<img src="x-big.jpg" alt=" x" />);} //wall
 if(props.kind=='.'){return (<img src="dot-big.jpg" alt=" ." />);} //nothing
 if(props.kind=='@'){return (<img src="gnome-big.jpg" alt=" @" height="36" width="36"/>);} //hero
 if(props.kind=='0'){return (<img src="void-big.jpg" alt=" 0" />);} //dark void
 
 return (<img src="void-big.jpg" alt=" 0" />); // by default 
}

$(document).keydown(function(e){  
  if( e.keyCode == 37){ makeMove('a'); }// left
  if( e.keyCode == 38){ makeMove('w'); }// up
  if( e.keyCode == 39){ makeMove('d'); }// right
  if( e.keyCode == 40){ makeMove('s'); }// down

});

function makeMove(x){

 console.log("makeMove(x) executed , key "+x);

 if(x=='d')
  {if(map[cPos+1]=='.' && (cPos+1)<X*Y && (cPos+1)>0  )
    {map[cPos]='.';map[cPos+1]='@';} }

 if(x=='a')
  {if(map[cPos-1]=='.' && (cPos-1)<X*Y && (cPos-1)>0 )
    {map[cPos]='.';map[cPos-1]='@';} }

 if(x=='w')
  {if(map[cPos-lS*16]=='.' && (cPos-lS*16)<X*Y && (cPos-lS*16)>0 )
    {map[cPos]='.';map[cPos-lS*16]='@';} }

 if(x=='s')
  {if(map[cPos+lS*16]=='.' && (cPos+lS*16)<X*Y && (cPos+lS*16)>0 )
    {map[cPos]='.';map[cPos+lS*16]='@';} }

 ReactDOM.render(<Around status="x"/>,document.getElementById('around'));
}
