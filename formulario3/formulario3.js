//orietação a objeto(POO)
class Validator {

    constructor(){
        this.validation = [
            'data-required',
            'data-min-length', 
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
            
        ]
    }

    //iniciar a validação de todos os campos
    validate(form){

        //resgata todas as validações
        let currentvalition = document.querySelectorAll("form .erro-validation")

        if(currentvalition.length > 0){
            this.clearvalidation(currentvalition)
        }
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

                    //data-min-length para -> minlength, limpando a string para vira metodo
                    let method = this.validation[i].replace('data-', '').replace('-', '')

                    //valor do input
                    let value = input.getAttribute(this.validation[i]);
                    console.log(method)

                    //invocar metodo 
                    this[method](input,value);


                }

            }
        },this)
    }
    //verifica se um input ten um numéro minimo de caractere(letra)
    minlength(input,minvalue){

        let inputlength = input.value.length;
        let erromenssage = `o campo precisa ter pelo menos ${minvalue} caracteres`;

        if(inputlength < minvalue){
            this.imprimirmessage(input,erromenssage)
        }
    }

    //verificar se um input passou do limite de caracteres
    maxlength(input,maxvalue){
        let inputlength = input.value.length;
        let erromenssage = `o campo precisa menos de que ${maxvalue} caracteres`;

        if(inputlength > maxvalue){
            this.imprimirmessage(input,erromenssage)
        }
    }

    //validar email
    emailvalidate(input){
        //string + @ + string e ponto e + uma string
        let re = /\S+@\S+\.\S+/;

        let email = input.value

        let errormessage = `insira um email no padrão emerson@email.com`
        //se não for o email
        if(!re.test(email)){
            this.imprimirmessage(input,errormessage)
        }

    }
    //valida se o campo tem apenas letras
    onlyletters(input){

        let re = /^[A-Za-z]+$/;

        let inputvalue = input.value

        let errormessage = `Este campo não aceita núneros ne caracteres especiais`

        if(!re.test(inputvalue)){
            this.imprimirmessage(input,errormessage)
        }


    }
    //verifca se os dois campos são iguais
    equal(input, inputName){

    let inputcompare = document.getElementById("senha")


    let errormessage = `Este campo tem que tá igual ao ${inputName}`;

    if(input.value != inputcompare.value){
        this.imprimirmessage(input,errormessage)
    }

    }
    //valida campo de senha 
    passwordvalidate(input){

        //explodir string em um array  
        let charAr = input.value.split("")

        let uppercases = 0
        let number = 0

        for(let i = 0;charAr.length > i;i++){
            if(charAr[i] === charAr[i].toUpperCase() && isNaN(parseInt(charAr[i]))){
                uppercases++
            }else if(!isNaN(parseInt(charAr[i]))){
                number++

            }
        }
        if(uppercases === 0 || number === 0){
            let errormessage = `A senha precisa de um caractere maiusculo e um número`

            this.imprimirmessage(input,errormessage)

        }
    }
   
    //verificar se input é requerido
    required(input){
        let inputvalue = input.value;

        if(inputvalue === ''){
            let errormessage = `Este campo é obrigatorio`

            this.imprimirmessage(input,errormessage)
        }
    }
     // metodo para imprimir menssagen de erro na tela
     imprimirmessage(input,msg){
        //quantidade de erros
        let error = input.parentNode.querySelector('.erro-validation');

        if(error === null){
        let template = document.querySelector('.erro-validation').cloneNode(true)
       

        template.textContent = msg

        let inputparent = input.parentNode

        template.classList.remove('template')

        inputparent.appendChild(template)
    }
        }
    //limpa validação da tela
    clearvalidation(validation){
        validation.forEach(el => el.remove())
    }
}


let form = document.getElementById("registre-form")
let submit = document.getElementById("btn-submit")
let validator = new Validator()

//evento de validações

submit.addEventListener('click',function(e){
    //e.preventDefault() interroper função do type submit button 
    e.preventDefault()

    validator.validate(form)
})

