<template>
  <div class="light">
    <nav>
      <div class="container">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item @click="consultas()" index="1">Mis Reportes</el-menu-item>
          <el-menu-item @click="citas()" index="2">Mis Datos</el-menu-item>
        </el-menu>
      </div>
    </nav>
    <div class="single">
      <div class="container">
        <div class="single--container">
          <div> 
            <div><p class="back">
            <a href="javascript:;" @click="$router.go(-1)">
            <i class="el-icon-back"></i>Regresar
            </a></p></div>
          </div><br>
       
      
             <div>
              <!-- <el-card shadow="always"> -->

<!-- -------------------------------------------------------- -->


          <div v-if="visibleMisConsultas">
            <div class="desk">
            <template v-if="listQuestion!=null && listQuestion.length>0">

            <el-table
              :data="listQuestion"
              style="width: 100%">
              <el-table-column
                width="100"
                prop="id_asesoria"
                label="Código">
              </el-table-column>
              <el-table-column
                width="590"
                prop="descripcionAsistenteRecortado"
                label="Descripción">
              </el-table-column>
              <el-table-column
                prop="id_005_estado"
                label="Estado">

                <template slot-scope="scope">
                  <router-link v-if="userlogin.flag_activado & scope.row.id_005_estado == 22 & scope.row.descripción_asistente != null" class="el-button el-button--primary el-button--mini" :to="'/panel/detail-question/'+scope.row.id_asesoria">Ver respuesta</router-link>
                  <el-button v-else disabled size="mini" type="warning">pendiente</el-button>
                </template>

              </el-table-column>
            </el-table>

            </template>
            <template v-else>
               <div style="justify-content: center; align-items: center;height: 150px;display: flex;"> 
              <p class="not-data">
                <i class="el-icon-message"></i>No hay consultas pendientes
              </p>
               </div>
            </template>
            </div>




            <div class="mobile">
             <template v-if="listQuestion!=null && listQuestion.length>0">

            <el-table
              :data="listQuestion"
              style="width: 100%">

              <el-table-column type="expand">
                  <template slot-scope="scope">
                  <p style="color: #3a7bdd">Estado de la Asesoria</p><br>
                  <router-link v-if="userlogin.flag_activado & scope.row.id_005_estado == 22 & scope.row.descripción_asistente != null" class="el-button el-button--primary el-button--mini" :to="'/panel/detail-question/'+scope.row.id_asesoria">Ver respuesta</router-link>
                  <el-button class="pending" v-else disabled size="mini" type="warning">pendiente</el-button>
                </template>
             </el-table-column>
              <el-table-column
                
                prop="id_asesoria"
                label="Código">
              </el-table-column>
              <el-table-column
                
                prop="descripcionAsistenteRecortado"
                label="Descripción">
              </el-table-column>

            </el-table>
            </template>
            <template v-else>
               <div style="justify-content: center; align-items: center;height: 150px;display: flex;"> 
              <p class="not-data">
                <i class="el-icon-message"></i>No hay consultas pendientes
              </p>
               </div>
            </template>
            </div>


          </div>


<!-- -------------------------------------------------------- -->


        <div v-if="visibleMisCitas">
          <template v-if="cita!=null && cita.length>0 ">
            <citas-cliente :cita="cita" @ListCitas="ListCitas"/>
          </template>
          <template v-else>
            <div style="justify-content: center; align-items: center;height: 150px;display: flex;"> 
              <p class="not-data">
                <i class="el-icon-message"></i>No hay citas pendientes
              </p>
            </div>
            </template>
        </div>


<!-- -------------------------------------------------------- -->


            <!-- </el-card> -->
          
          </div>
        </div>
      </div>
    </div>
    <!-- <template v-if="modalVoucher">
      <el-dialog :visible.sync="modalVoucher">
        <modal-voucher :idCita="id_cita"></modal-voucher>
      </el-dialog>  
    </template>  -->
  </div>
</template>

<script>
// import modalVoucher from './modalVoucher.vue'
import CitasCliente from '../CitasCliente.vue'
export default {
  components: { 
    // modalVoucher ,
    CitasCliente
  },
  props:['userlogin'],
  data () {
    return {
      visibleMisConsultas: true,
      visibleMisCitas: false,
      listQuestion: [''],
      verificar: '',
      cita:null,
      // modalVoucher: false,
     
     SubirV:{
        voucher:'',
        id_cita: 9
      },
    // id_cita: null,

    }
  },
  created() {
    // this.ListCitas()
    // this.getQuestions()
  },
  methods: {
// openModal(valor){
//   this.modalVoucher=true
//   this.id_cita = valor;
// },
   consultas(){
      this.visibleMisConsultas=true,
      this.visibleMisCitas=false
      this.getQuestions()
    },
    citas(){
      this.visibleMisConsultas=false,
      this.visibleMisCitas=true
      this.ListCitas()
    },


    getQuestions() {
      const endpoint = '/getAsesoria/00/'+this.userlogin.id_usuario+'/00/00'

      this.$http.get(endpoint).then((response) => {
        response.data.resultado.forEach(element => {
          element.descripcionAsistenteRecortado = this.recortar(element.descripción_solicitante)
        });

        let data = response.data.resultado;
          let array = [];
           if(data!=null){
          data.forEach(item => {
            if(item.descripción_solicitante != null){
             
              array.push(item)
            }
          });
        }

        // this.listQuestion = response.data.resultado
        this.listQuestion = array

        console.log(this.listQuestion)
        console.log("hola")
      })
      .catch((e) => {
        console.log(e);
      });
    },

    ListCitas(){
       const endpoint = "/listarCitas/0/"+this.userlogin.id_usuario+"/0/0";
      this.$http.get(endpoint).then(response => {
      //if(response.data.Body.id_011_estado = 24)
      this.cita = response.data.Body;
      });
    },


    recortar(texto){
      //console.log(texto)
      var textoRecortado
      if(texto == undefined||texto.length <= 90 ){
        textoRecortado = texto
      }else{
        textoRecortado = texto.substring(0,242) + '...';
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
  .el-upload {
    .el-upload-dragger {
      width: 180px;
      height: 150px;
      left: -11px;
    }
  }
  .pending{
       border: 0px;
    width: 150px;
    height: 30px;
    font-size: 15px;
  }
  .mobile{
   display: block;
}
.desk{
  display: none;
}
.single{
  .container{
    .back{
      left: 7px !important;
    }
  }

}

}
</style>