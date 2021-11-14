<template>
  <div class="light">
    <nav>
      <div class="container">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click="respondidos()">Respondidos</el-menu-item>
          <el-menu-item index="2" @click="responder()">Pendientes</el-menu-item>
        </el-menu>
      </div>
    </nav>
    <div class="single">
      <div class="container">
        <div class="single--container">
          <div v-if="visibleRespondidos">
            <template v-if="listQuestion!=null && listQuestion.length>0 ">
              <div class="desk">
              <el-table
                :data="listQuestion"
                style="width: 100%"
                >
                <el-table-column
                  width="90"
                  prop="asesoria.id_formato"
                  label="Caso">
                </el-table-column>
                <el-table-column
                  width="150"
                  prop="fecha_creacion"
                  label="Fecha">
                </el-table-column>
                <el-table-column
                  width="450"
                  prop="asesoria.descripcionAsistenteRecortado"
                  :label="'Descripción'">
                </el-table-column>
                <el-table-column
                  prop="id_005_estado"
                  label="Estado">
                  <template slot-scope="scope">
                    <router-link :to="`/text/${scope.row.id_asesoria_abogado}`" class="card">
                      <el-button v-if="scope.row.respuesta == null" size="mini" type="warning">Responder</el-button> 
                      <el-button v-else size="mini" type="primary">Ver respuesta</el-button> 
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
              </div>

              <div class="mobile">
              <el-table
                :data="listQuestion"
                style="width: 100%"
                >
                 <el-table-column type="expand">
                   <template slot-scope="scope">
                   <p >Fecha: </p><p style="color: #A0A0A0"> {{ scope.row.fecha_creacion}}</p><br>
                    <p>Estado</p> 
                    <router-link :to="`/text/${scope.row.id_asesoria_abogado}`" class="card">
                      <el-button v-if="scope.row.respuesta == null" size="mini" type="warning">Responder</el-button> 
                      <el-button v-else type="primary">Ver respuesta <i class="el-icon-view"></i></el-button> 
                    </router-link>
                   </template>
                </el-table-column>
                <el-table-column
                  width="90"
                  prop="asesoria.id_formato"
                  label="Caso">
                </el-table-column>
                <el-table-column
                  width="450"
                  prop="asesoria.descripcionAsistenteRecortado"
                  :label="'Descripción'">
                </el-table-column>
              </el-table>
              </div>
            </template>
            <template v-else>
              <div style="justify-content: center; align-items: center;height: 150px;display: flex;"> 
              <p class="not-data">
                <i class="el-icon-message"></i>No hay casos respondidos
              </p>
              </div>
            </template>
          </div>

          <div v-if="visibleResponder">
            <template v-if="listQuestion1!=null && listQuestion1.length>0 ">
              <slopes :listQuestion1="listQuestion1"/>
            </template>
            <template v-else>
              <p class="not-data">
                <i class="el-icon-message"></i>No hay casos pendientes
              </p>
            </template>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slopes from "./Slopes.vue"
// import Horario from "../cita/Horario.vue"
import EventBus from '@/helpers/EventBus'
import moment from 'moment';
export default {
  components: {
    Slopes,
    // Horario,
    // Schedule,
    // Detalle
  },
  props:['userlogin'],
  data () {
    return {
      listQuestion: null,
      listQuestion1: null,
      visibleRespondidos: false,
      visibleResponder: true,
      id_abogado: null,
       user:{
        redirecEmail: null, 
        cuenta: null,
        clave: null,
        tipo:null
      }
    }
  },
  created() {
    this.listQuestion = [
      {
        asesoria: {
          id_formato: 12,
          descripcionAsistenteRecortado: "Se ha registrado el incidente con el codigo del problema. En breve le enviaremos una notificacion.",
        },
        fecha_creacion: moment(new Date()).format("DD-MM-YYYY")  ,
        respuesta: ""
      },
      {
        asesoria: {
          id_formato: 12,
          descripcionAsistenteRecortado: "Se ha registrado el incidente con el codigo del problema. En breve le enviaremos una notificacion.",
        },
        fecha_creacion: moment(new Date()).format("DD-MM-YYYY")  ,
        respuesta: ""
      },
      {
        asesoria: {
          id_formato: 12,
          descripcionAsistenteRecortado: "Se ha registrado el incidente con el codigo del problema. En breve le enviaremos una notificacion.",
        },
        fecha_creacion: moment(new Date()).format("DD-MM-YYYY")  ,
        respuesta: ""
      },
      {
        asesoria: {
          id_formato: 12,
          descripcionAsistenteRecortado: "Se ha registrado el incidente con el codigo del problema. En breve le enviaremos una notificacion.",
        },
        fecha_creacion: moment(new Date()).format("DD-MM-YYYY")  ,
        respuesta: ""
      }
    ];
    this.listQuestion1 = [
      {
        asesoria: {
          id_formato: 14,
          descripcionAsistenteRecortado: "Se ha registrado el incidente con el codigo del problema. En breve le enviaremos una notificacion.",
        },
        fecha_creacion: moment(new Date()).format("DD-MM-YYYY"),
      },
      {
        asesoria: {
          id_formato: 14,
          descripcionAsistenteRecortado: "Se ha registrado el incidente con el codigo del problema. En breve le enviaremos una notificacion.",
        },
        fecha_creacion: moment(new Date()).format("DD-MM-YYYY"),
      }
    ];
     console.log(this.$route.params["hash"]);
    if(this.$route.params["hash"]){
      const endpoint = '/ObtenerUserPas/'+ this.$route.params["hash"]
      this.$http.get(endpoint).then((response) => {
       this.user.redirecEmail = true
       this.user.tipo = 1
       this.user.cuenta = response.data.respuesta[0].cuenta
       this.user.clave =  response.data.respuesta[0].clave
      EventBus.$emit('sendData', this.user)
      this.Optener(response.data.respuesta[0].id_usuario)
      this.responder(response.data.respuesta[0].id_usuario);
      this.getQuestions1(response.data.respuesta[0].id_usuario);
      
      

     }).catch((e) => {
        console.log(e);
      });

    }else{
    this.id_abogado = this.userlogin.id_usuario
    this.responder();
    this.getQuestions1();
   
    }
  },
  methods: {
    Optener(vari){
    this.id_abogado = vari
    },
    formato(number, width) {
      var numberOutput = Math.abs(number); /* Valor absoluto del número */
      var length = number.toString().length; /* Largo del número */ 
      var zero = "0"; /* String de cero */  
      
      if (width <= length) {
          if (number < 0) {
              return ("-" + numberOutput.toString()); 
          } else {
              return numberOutput.toString(); 
          }
      } else {
          if (number < 0) {
              return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
          } else {
              return ((zero.repeat(width - length)) + numberOutput.toString()); 
          }
      }
    },
    respondidos(){
      this.getQuestions(),
      this.visibleRespondidos=true;
      this.visibleResponder=false;
    },
    responder(){
      this.getQuestions1(),
      this.visibleRespondidos=false; 
      this.visibleResponder=true
    },
    getQuestions() {
      const endpoint = '/getAsesoriaAbogado/00/00/'+this.id_abogado+'/00'
      this.$http.get(endpoint).then((response) => {
        response.data.resultado.forEach(element => {
          element.asesoria.descripcionAsistenteRecortado = this.recortar(element.asesoria.descripción_asistente)
          element.asesoria.id_formato = this.formato(element.asesoria.id_asesoria,6)
        });
        let data = response.data.resultado;
          let array = [];
        if(data!=null){
          data.forEach(item => {
            if(item.respuesta != null){
              array.push(item)
            }
          });
        }
        this.listQuestion = array;
      })
      .catch((e) => {
        console.log(e);
      });
    },
    getQuestions1() {
      const endpoint = '/getAsesoriaAbogado/00/00/'+this.id_abogado+'/00'
      this.$http.get(endpoint).then((response) => {
        response.data.resultado.forEach(element => {
          element.asesoria.descripcionAsistenteRecortado = this.recortar(element.asesoria.descripción_asistente)
          element.asesoria.id_formato = this.formato(element.asesoria.id_asesoria,6)
        });

        let data = response.data.resultado;
          let array = [];
           if(data!=null){
          data.forEach(item => {
            if(item.respuesta == null){
             
              array.push(item)
            }
          });
        }
        this.listQuestion1 = array
        console.log(this.listQuestion1.length)
      })
      .catch((e) => {
        console.log(e);
      });
    },
    recortar(texto){
      //console.log(texto)
      var textoRecortado
      if(texto == undefined||texto.length <= 90 ){
        textoRecortado = texto
      }else{
        textoRecortado = texto.substring(0,181) + '...';
      }
      return textoRecortado;
    }

  }
};
</script>

<style lang="scss">
.mobile{
  display: none;
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
@media only screen and (max-width: 600px) {
.desk{
  display: none
}
.mobile{
  display: block
}


}
</style>