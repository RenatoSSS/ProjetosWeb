/* pegando o elemento canvas e context */
const canvas = document.getElementsByTagName("canvas")[0]
const context = canvas.getContext("2d")
let todosPingos = []

/* Essa função inicializa tudo */
function start(){
    renderizaCanvas()
    CriaTodosOsPingos()
    ExibePingos()
}

/* Essa função atualiza o canvas quando a janela for redimencionada */
function renderizaCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight ;
}

/* limpa todo o canvas e e pinta de roxo novamente*/
function limpaCanvas(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle = '#E5E3FF'
    context.fillRect(0,0,canvas.width,canvas.height)
}

/*De Primeira parece ser complicado, mas é tão simples quando parece,
Aqui eu peço um valor maximo e um minimo e faço uma pergunta,
o minimo está indefinido?se caso estiver defina como 0,caso contrario irá me retornar
falso(ou seja nada irá acontecer
*/
function retornaValorSorteados(max,min){
    min ==undefined ? min=0 : false;
    return Math.floor(Math.random() * (max - min) + min)
}

/*Esta função irá criar o pingo e irá com o tempo acrescentar a posição y(this.MudaPosicoesERedesenha)*/ 
function Pingo(){
    this.posX = retornaValorSorteados(canvas.width-20)
    this.posY =0
    this.acrescentaY = retornaValorSorteados(5,15)
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
        this.posY+=this.acrescentaY
        context.beginPath()
        context.fillStyle=this.cor
        context.fillRect(this.posX,this.posY,this.largura,this.altura)
        context.closePath()
    }

}

function CriaTodosOsPingos(){
    //(Em javascript classes são funções)
    for(let i =0;i<10;i++){
        todosPingos.push(new Pingo())
    }

}

function ExibePingos(){
    limpaCanvas()
    CriaTodosOsPingos()
    
    /* Aqui estou verificando se o pingo passou do tamanho do canvas,se sim eu deleto  esse pingo*/
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
