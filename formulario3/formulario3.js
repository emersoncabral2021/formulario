class Validator {

    constructor(){
        this.validation = [
            'data-min-length', 
        ]
    }
    //iniciar a validação de todos os campos
    validate(form){
        //pegar todos os input
        let inputs = form.getElementsByTagName('input') 

        //htmlColetion para -> array
        let inputsarray = [...inputs]

        //loop nos input e validação ao que for encontrado
        inputsarray.forEach(function(input){

            //loop em todas as validações existentes

            for(let i = 0; this.validation.length > i; i++){
                //verifica se a validação atual existeno input
                if(input.getAttribute(this.validation[i]) != null){

                    //data-min-length para -> minlength
                    let method = this.validation[i].replace('data-', '').replace('-', '')

                    //valor do input
                    let value = input.getAttribute(this.validation[i]);

                    //invocar metodo
                    this[method](input,value);


                }

            }
        },this)
    }
    //verifica se um input ten um numéro minimo de caractere(letra)
    minlength(input,minvalue){

        let inputlength = input.value.length;
        let erromenssae = `o campo precisa ter pelo menos ${minvalue}`;

        if(inputlength < minvalue){
            this.imprimirmessage(input,erromenssae)
        }
    }
    // metodo para imprimir menssagen de erro na tela
    imprimirmessage(input,msg){
        let template = document.querySelector('.erro-validation').cloneNode(true)

        template.textContent = msg

        let inputparent = input.parentNode

        template.classList.remove('template')

        inputparent.appendChild(template)
    }
}


let form = document.getElementById("registre-form")
let submit = document.getElementById("btn-submit")
let validator = new Validator()

console.log(form)
//evento de validações

submit.addEventListener('click',function(e){
    //e.preventDefault() interroper função do type submit button 
    e.preventDefault()

    validator.validate(form)
})

