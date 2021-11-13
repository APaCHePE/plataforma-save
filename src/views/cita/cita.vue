<template>
  <div class="light">
    <nav>
      <div class="container">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">Mis problemas</el-menu-item>
        </el-menu>
      </div>
    </nav>
    <div class="single">
        <div class="container">
        <div class="single--container">

            <div class="under">
                   <div>
                <p class="back"> 
                <a href="javascript:;" @click="$router.go(-1)">
                <i class="el-icon-back"></i>Regresar
                </a></p><br>


                <p style="color: #4178DA; font-size: 40px;">Registro de cita</p><br><br>
                <h2>Consulta</h2>
                <p>{{( listQuestion == null || listQuestion==undefined || listQuestion.length==0 ) ? '' : this.listQuestion[0].asesoria.descripción_solicitante}}</p>
                <br>
                <div class="under">
                  <div>
                    <h2>Abogado</h2>
                    <p>{{( listQuestion == null || listQuestion==undefined || listQuestion.length==0 ) ? '' : this.listQuestion[0].persona.nombres}} {{( listQuestion == null || listQuestion==undefined || listQuestion.length==0 ) ? '' : this.listQuestion[0].persona.paterno}} {{( listQuestion == null || listQuestion==undefined || listQuestion.length==0 ) ? '' : this.listQuestion[0].persona.materno}}</p>
                    
                  </div>
                  <div>
                    <h2>Celular</h2>
                    <p>{{( listQuestion == null || listQuestion==undefined || listQuestion.length==0 ) ? '' : this.listQuestion[0].abogado.usuario.telefono1}}</p>
                  </div>
                </div><br><br>
                    <p>Fecha de atención</p><br>
                   
                    <div class="block" >
                      <el-date-picker
                        v-model="citagrabar.fecha_creacion"
                        type="date"
                        placeholder= "Elija el dia"
                        :picker-options="pickerOptions"
                        @change="eventoCalendario">
                      </el-date-picker><br><br><br>
               
                    </div></div>


                 <div>

                  <div style="text-align:center;"> <br><br>
                <img style="width:50%" src="https://edeeste.com.do/wp-content/uploads/icono-agendar-cita-e1592228062364.png">
                  </div>
                    
                <p style="font-size: 30px; color: #4178DA; ">Horarios Disponibles</p><br>

                    <div v-for="(item, index) in this.listHorario" :key="index">
                        <el-radio v-model="citagrabar.hora_inicio" :label="item.hora">{{item.hora}}</el-radio>

                    </div>
        
                      <div v-if="this.bandera" class="align-right">
                       <el-button type="primary" @click="grabarCita()" round
                      >Reservar
                      </el-button>
                      </div>

                      <br><br><br><br><br><br>
            
                </div>
                   <message-cita v-if="showModal" :user="user"/>
                    </div>
              
            </div>
           
    </div>
    </div>
    </div>   
 
</template>

<script>
import MessageCita from '../../components/shared/MessageCita.vue';
import moment from 'moment';

export default {
  props:['id, userlogin'],
   components: {
   MessageCita
  },
  data () {
    return {

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      bandera: false,
      user: null,
      listQuestion: [],
      listHorario: [],
      showModal: null,
      listH:[],
      fecha: null,
      value1: null,
      id_as: null,
      citagrabar:{
        trazabilidad : {
          id_asesoria : 2,
          id_011_estado : 24
        },
        fecha_creacion: null,
        id_asesoria_abogado: null,
        hora_inicio: null
      },
      id_usuario: {
        abogado: {
          id_abogado: null
        }
      }
     
     
    }
  },
  created() {
    this.getQuestions()
    this.getHorario()
    // this.citagrabar.id_asesoria_abogado = this.$route.params.id
},
  methods: {
    eventoCalendario(value){
      this.fecha = moment(value).format('YYYY-MM-DD')
      console.log(this.fecha)
      this.getHorario()
    },

    grabarCita(){
      this.citagrabar
      this.showModal = true
      const endpoint = "/cita/";
      this.$http.post(endpoint, this.citagrabar).then((response) => {
        console.log(response)
      });
    },

    getQuestions() {
      let id = this.$route.params.id;
      this.citagrabar.id_asesoria_abogado = id;
      const endpoint = '/getAsesoriaAbogado/00/00/00/'+id
      this.$http.get(endpoint).then((response) => {
        this.listQuestion = response.data.resultado
        this.id_usuario = response.data.resultado[0].abogado.id_abogado
        this.id_as = response.data.resultado[0].asesoria.id_asesoria
        this.jalarasesoria(this.id_as)
        //this.citagrabar.trazabilidad.id_asesoria = ( this.listQuestion == null || this.listQuestion==undefined || this.listQuestion.length==0 ) ? '' : this.listQuestion[0].asesoria.id_asesoria
        //console.log(this.citagrabar.trazabilidad.id_asesoria)
        //console.log(this.id_as)
      })
      .catch((e) => {
        console.log(e);
      });
      
    },
    jalarasesoria(variableAseso){
      const endpoint = '/getAsesoria/'+variableAseso+'/00/00/00'
      this.$http.get(endpoint).then((response) => {
        this.user = response.data.resultado[0].usuario.cuenta
        console.log(this.user)
      })
      .catch((e) => {
        console.log(e);
      });
    },
    getHorario() {    
      let dato = this.listQuestion[0].abogado.id_abogado
     const endpoint = '/getHorario/00/'+dato+'/'+this.fecha+'/00';
      this.$http.get(endpoint).then((response) => {
        this.listHorario = response.data.resultado
        this.fecha = response.data.resultado[0].fecha
        console.log(this.listHorario)
        console.log(this.citagrabar.trazabilidad.id_asesoria)
        var contador = this.listHorario.length
    
       if(contador >= 1) {
         this.bandera = true
         console.log(contador + "asd")
       }else{
         this.bandera = false
         console.log(contador + "aqui estoyo")
        }

      })
      .catch((e) => {
        console.log(e);
      });
      
    }
  }
};
</script>

<style lang="scss">
.nombre{
position: absolute;
width: 273px;
height: 129px;
left: 128px;
top: 213px;
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 36px;
line-height: 44px;
letter-spacing: -0.025em;
color: rgba(0, 0, 0, 0.6);
}

.align-right {        
text-align: right;
}

.titulo3{
position: absolute;
width: 413px;
height: 45px;
left: 123px;
top: 342px;
font-family: Raleway;
font-style: normal;
font-weight: bold;
font-size: 34px;
line-height: 132.2%;
color: #3A7BDD;
}

header {
  display: flex;
  background: #ddf3ff;
}
.light {
  .bottom {
    &:before {
      width: 120%;
      height: 100%;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      background: #fff;
      content: "";
      position: fixed;
      z-index: -1;
      left: -10%;
      top: 57%;
    }
    .card {
      text-decoration: none;
      max-width: 450px;
      margin: auto auto 40px auto;
      background: #3a7bdd;
      border-radius: 18px;
      padding: 30px;
      display: flex;
      overflow: hidden;
      position: relative;
      &:hover {
        box-shadow: 0 4px 25px hsl(216deg 71% 55%);
        transition: box-shadow 0.4s;
        &:before {
          right: 0px;
          transition: right 0.4s;
        }
        i {
          right: -30px;
          transition: right 0.4s;
        }
      }
      &.b-green {
        background: #2adbb8;
      }
      &-right {
        color: #fff;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &:before {
          width: 1px;
          left: -23px;
          content: "";
          background: #ffffff3d;
          height: 105px;
          position: absolute;
          // top: -15px;
        }
      }
      &-left {
        padding-right: 45px;
        // img {
        //   width: 80px;
        // }
      }
      h1 {
        font-size: 20px;
        padding-bottom: 15px;
      }
      i {
        position: absolute;
        right: -55px;
        transition: right 0.4s;
        font-size: 25px;
      }
      &:before {
        width: 150px;
        height: 132px;
        shape-outside: circle(27% at 51%);
        clip-path: circle(45% at 115%);
        background: #ffffff57;
        content: "";
        position: absolute;
        right: -45px;
        top: 15px;
        transition: right 0.4s;
      }
    }
  }
  .description {
    display: block;
    p {
      text-align: center;
      font-size: 30px;
      max-width: 415px;
      margin: auto;
      padding-top: 60px;
      padding-bottom: 40px;
      span {
        font-weight: bold;
      }
    }
  }
  nav {
    background: #a1dcff;
  }
  .btn {
    padding: 10px 25px;
    margin: 10px;
    color: #fff;
    background: #2adbb8;
    outline: none;
    text-decoration: none;
    border-radius: 20px;
  }
  .single {
    padding-top: 30px;
    &--container {
      max-width: 930px;
      margin: auto;
      .el-alert {
        margin-bottom: 30px;
      }
    }
    .title {
      margin-bottom: 30px;
      margin-top: 0px;
      display: inline-block;
      font-weight: 600;
      left: -15px;
      position: relative;
    }
    .min-m {
      margin-left: -20px;
      margin-right: -20px;
      display: flex;
      .el-form-item.el-form-item {
        display: inline-block;
        margin: 0 22px 0 22px;
      }
    }
    // .el-select {
    //   margin: 0 22px 0 22px;
    // }
    .back {
      padding-bottom: 0px;
      left: -30px;
      position: relative;
      border-right: solid 1px #c7c7c7;
      padding-right: 15px;
      display: inline-block;
      top: 3px;
      a {
        text-decoration: none;
        color: #000;
        outline: none;
        display: flex;
        align-items: center;
      }
      i {
        font-size: 25px;
        margin-right: 5px;
      }
    }
    .element-right {
      text-align: right;
    }
    // .flex-content {
    //   display: flex;
    //   margin-left: -10px;
    //   margin-right: -10px;
    //   flex-flow: wrap;
    // }
  }
}
  .under{
  column-count: 2
  }

@media only screen and (max-width: 600px) {
  .under {
  column-count: 1
  }
 
}
</style>