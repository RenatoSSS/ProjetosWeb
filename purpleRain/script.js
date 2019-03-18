const canvas = document.getElementsByTagName("canvas")[0]
const context = canvas.getContext("2d")
let todosPingos = []

function start(){
    renderizaCanvas()
    CriaTodosOsPingos()
    ExibePingos()
}

function renderizaCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight ;
}

function limpaCanvas(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle = '#E5E3FF'
    context.fillRect(0,0,canvas.width,canvas.height)
}

function retornaValorSorteados(max,min){
    min ==undefined ? min=0 : false;
    return Math.floor(Math.random() * (max - min) + min)
}

function Pingo(){
    this.posX = retornaValorSorteados(canvas.width-20)
    this.posY =0
    this.acrescentaX = retornaValorSorteados(5,15)
    this.altura =retornaValorSorteados(15,8)
    this.largura = retornaValorSorteados(3,5)
    this.cor = '#AE9CCC'

    this.Desenha = ()=>{
        context.beginPath()
        context.fillStyle=this.cor
        context.fillRect(this.posX,this.posY,this.largura,this.altura)
        context.closePath()
    }

    this.MudaPosicoesERedesenha= ()=>{
        this.posY+=this.acrescentaX
        context.beginPath()
        context.fillStyle=this.cor
        context.fillRect(this.posX,this.posY,this.largura,this.altura)
        context.closePath()
    }

}

function CriaTodosOsPingos(){
    for(let i =0;i<10;i++){
        todosPingos.push(new Pingo())
    }

}

function ExibePingos(){
    limpaCanvas()
    CriaTodosOsPingos()
    

    todosPingos.forEach((elemento,index)=>{
        todosPingos[index].Desenha()
        todosPingos[index].MudaPosicoesERedesenha()
        if(todosPingos[index].posY>=canvas.height){
            todosPingos.splice(index,1)
        }
    })
    requestAnimationFrame(ExibePingos)
}

window.addEventListener("resize",function(){
    renderizaCanvas()
})
start()
