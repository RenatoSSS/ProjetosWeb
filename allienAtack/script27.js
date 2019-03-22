const canvas = document.getElementsByTagName("canvas")[0]
const context = canvas.getContext("2d")
const GameOver = document.getElementsByClassName("GameOver")
const todasEstrelas = []
let perdeu=false

let pontos = 0
let alien_rate = 2000
const mouse = {
    x:10,
    y:10
}
const todosOsTiros = []
const todosOsAliens = []

let player = new estrelaJogador()

function setup(){
    redimencionaTela()
    CriaAsPrimeirasEstrelas()
    setupEstrelasEOutros()
    CriaAliens()
}
setup()

function SorteiaValores(max,min){
    min ==undefined ? min=0 : false;
    return Math.floor(Math.random() * (max - min) + min)
}

function limpaCanvas(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle="#11122C"
    context.fillRect(0,0,canvas.width,canvas.height)
}
function redimencionaTela(){
    canvas.width = window.innerWidth-15
    canvas.height = window.innerHeight
    
    context.fillStyle="#11122C"
    context.fillRect(0,0,canvas.width,canvas.height)
}

function estrela(x,vlm,y){
    this.x = x || SorteiaValores(canvas.width,vlm)  
    this.y = y || SorteiaValores(canvas.height,5)
    this.acrescentaX=SorteiaValores(8,1)
    this.radius = SorteiaValores(3,1.2)

    this.draw=()=>{
        context.beginPath()
        this.x-=this.acrescentaX
        context.fillStyle="#fff"
        context.arc(this.x,this.y,this.radius,0,2*Math.PI)
        context.fill()
        context.closePath()
    }

}

function estrelaJogador(){
    this.x =mouse.x
    this.y =mouse.y 
    this.acrescentaX=4
    this.acrescentaY=4
    this.radius = 2

    this.draw=()=>{
        this.x+=(mouse.x - this.x)/26
        this.y+=(mouse.y- this.y)/24
        context.beginPath()
        context.fillStyle = '#ea204d';
        context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.x - 35, this.y - 15);
            context.lineTo(this.x - 45, this.y);
            context.lineTo(this.x - 35, this.y + 15);
            context.lineTo(this.x, this.y);
            context.closePath();
            context.fill()	
            context.closePath()
    }

}

function Tiro(){
    this.x = player.x
    this.y = player.y
    this.acrescentaX = 6

    this.draw=()=>{
        this.x+=this.acrescentaX
        context.strokeStyle="#2adbeb"
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + 30, this.y);
        context.closePath();
        context.stroke();    
    }

}

function alien(w){
    this.x = SorteiaValores(canvas.width + 2,canvas.width)
    this.y = SorteiaValores(canvas.height-5,10)
    this.acrescentaX =-4*w || -4

    this.draw=()=>{
        this.x+=this.acrescentaX
        context.beginPath();
        context.fillStyle="#29ddfb"
		context.moveTo(this.x, this.y);
        context.lineTo(this.x + 20, this.y + 10);
        context.lineTo(this.x + 20, this.y + 10);
        context.lineTo(this.x + 15, this.y);
        context.lineTo(this.x + 20, this.y - 10);
        context.lineTo(this.x + 20, this.y - 10);
        context.lineTo(this.x, this.y);
        context.closePath();
        context.fill();
    }


}

function CriaAliens(){
    if(perdeu==false){
        todosOsAliens.push(new alien())
        tempoAlien = setTimeout(CriaAliens,alien_rate)
    }
}

function VerificaSeoTiroEncostouNoAlien(){
    // Verifica se encostou no allien o tiro
    todosOsTiros.forEach(function(tiro,index){
        todosOsAliens.forEach(function(alien,i){
            if ((alien.x < tiro.x + 25 ) && (alien.x > tiro.x) && 
                    (alien.y < tiro.y + 17) && (alien.y > tiro.y - 17)){
                        todosOsAliens.splice(i,1)
                        pontos+=100

                        if (pontos % 500 == 0 && pontos != 0) {
							alien_rate *= 0.8;
							alien.acrescentaX *= 1.1;
						}
                }
        })
    })
    
    //Verifica se encostou o allien no personagem
    todosOsAliens.forEach(function(alien,index){
        if (alien.x < player.x   && alien.x > player.x -50 && 
        (alien.y < player.y + 20) && (alien.y > player.y - 20)){
            GameOver[0].style.display = "block"
            perdeu=true
            document.getElementsByClassName("All")[0].style.cursor="inherit"
        }

    })
}

function Atirar(ev){
    if(ev.keyCode==32){
        todosOsTiros .push(new Tiro())
    }
}

function CriaAsPrimeirasEstrelas(){
    for(let i =0;i<75;i++){
        todasEstrelas.push(new estrela())
    }
}


// Essa Função Também Faz
function MudaPosicoes(){
    limpaCanvas()

    todasEstrelas.forEach(function(estrela,index){
        estrela.draw()
        if(estrela.x<=-2){
            todasEstrelas.splice(index,1)
        }
    })

    todosOsTiros.forEach(function(tiro,index){
        if(tiro.x>=canvas.width){
            todosOsTiros.splice(index,1)
        }
        tiro.draw()
    })


    todosOsAliens.forEach(function(alien,index){
        if(alien.x<=0){
            todosOsAliens.splice(index,1)
        }
        alien.draw()
    })
    
}


function OutrasEstrelas(){
    todasEstrelas.push(new estrela(canvas.width,canvas.width+50))
}

function colocaScoreNaTela(){
    context.fillStyle="#e95116"
    context.font="35px ZCOOL XiaoWei"
    context.fillText(`${'Score '+pontos}`,20,40)
}

function setupEstrelasEOutros(){
    if(perdeu==false){
        requestAnimationFrame(setupEstrelasEOutros)
        MudaPosicoes ()
        OutrasEstrelas()
        colocaScoreNaTela()
        player.draw()
        VerificaSeoTiroEncostouNoAlien()
    }
}

function mouseMove(ev){
    mouse.x = ev.pageX
    mouse.y = ev.pageY
}

if(perdeu==false){
    document.addEventListener("keydown",Atirar)
    document.addEventListener("mousemove",mouseMove)
    window.addEventListener("resize",redimencionaTela)
}
