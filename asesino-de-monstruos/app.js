new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {

        getSalud(salud) {

            return `${salud}%`

        },

        empezarPartida: function () {

            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []

        },

        atacar: function () {

            let danio = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= danio

            let evento = {
                esJugador: true,
                texto: 'El jugador ataco al monstruo por ' + danio
            }
            this.registrarEvento(evento)

            this.ataqueDelMonstruo()

        },

        ataqueEspecial: function () {

            let danio = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= danio

            let evento = {
                esJugador: true,
                texto: 'El jugador hizo un ataque especial al monstruo por ' + danio
            }
            this.registrarEvento(evento)

            this.ataqueDelMonstruo()

        },

        curar: function () {

            if(this.saludJugador <= 90){

                this.saludJugador += 10

            }else{

                this.saludJugador = 100
                
            }

            this.ataqueDelMonstruo()

            let evento = {
                esJugador: true,
                texto: 'El jugador se curo y su vida ahora es ' + this.saludJugador
            }
            this.registrarEvento(evento)

        },

        registrarEvento(evento) {

            this.turnos.unshift(evento)

        },

        terminarPartida: function () {

            if(confirm('Perdiste! Jugas de nuevo?')){
                this.empezarPartida()
            }else{
                this.hayUnaPartidaEnJuego = false
            }
            return true
            
        },

        ataqueDelMonstruo: function () {

            let danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -= danio

            let evento ={
                esJugador: false,
                texto: 'El monstruo ataco al jugador por ' + danio
            }
            this.registrarEvento(evento)

            this.verificarGanador()

        },

        calcularHeridas: function (rango) {

            let min = rango[0]
            let max = rango[1]
            return Math.max(Math.floor(Math.random() * max) + 1, min)

        },

        verificarGanador: function () {

            if(this.saludMonstruo <= 0){
                
                if(confirm('Ganaste! Jugas de nuevo?')){
                    this.empezarPartida()
                }else{
                    this.hayUnaPartidaEnJuego = false
                }
                return true

            }else if (this.saludJugador <= 0){

                this.terminarPartida()

            }

            return false;
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});