<template>
    <div>
    <div class="desk">
        <el-table
        :data="listCita"
        style="width: 100%">
         <el-table-column type="expand">
                  <template slot-scope="props">
                    <p style="color: #3a7bdd">Mi asesoria: </p><p> {{ props.row.asesoria.descripción_solicitante}}</p>  
                    <p style="color: #3a7bdd">Respuesta del Abogado: </p><p> {{ props.row.asesoriaAbogado.respuesta}}</p>  
                    <p style="color: #3a7bdd">Respuesta de Administardor: </p><p> {{ props.row.asesoriaAbogado.descripción_asistente}}</p>  
                  </template>
         </el-table-column>
        
        <el-table-column
            align="center"
            width="100"
            prop="id_cita"
            label="N° Asesoria">
        </el-table-column>
        <el-table-column
            align="center"
            width="220"
            prop="hora_inicio"
            label="Hora">
        </el-table-column>
        <el-table-column
            align="center"
            width="130"
            label="Voucher">
            <template slot-scope="scope">
              <a v-if="scope.row.id_011_estado == 28" target="_blank">No hay voucher</a>
              <a v-else v-bind:href="urlDescarga+ scope.row.id_cita" target="_blank">Ver Voucher</a>
            </template>

        </el-table-column>
        <el-table-column
            align="center"
            label="Adjuntar Voucher *"
             width="190">
        
        <template slot-scope="scope" >
            <el-button v-if="scope.row.id_011_estado == 28" @click="openModal(scope.row.id_cita)" >Subir Voucher ↑</el-button>            
            <el-button v-if="scope.row.id_011_estado == 24" @click="openModal(scope.row.id_cita)" >Reemplazar voucher</el-button>            
            <el-button v-if="scope.row.id_011_estado == 25 || scope.row.id_011_estado ==26" disabled>Subir Voucher ↑</el-button>            
        </template>
        </el-table-column>
        <el-table-column
                  width="190"
                  align="center"
                  prop="id_011_estado"
                  label="Estado">
                  <template slot-scope="scope">
                    <br>
                    <el-alert v-if="scope.row.id_011_estado == 25"
                      title="Cita validada"
                      type="success"
                      show-icon>
                    </el-alert>
                    <el-alert v-if="scope.row.id_011_estado == 26"
                      title="Cita Denegada"
                      type="error"
                      show-icon>
                    </el-alert>
                    <el-alert v-if="scope.row.id_011_estado == 24 || scope.row.id_011_estado == 28 "
                      title="Cita sin validar"
                      type="warning"
                      show-icon>
                    </el-alert>
                  </template>
                </el-table-column>
        </el-table> 
        <!-- <template v-if="modalVoucher"> -->
            
        <!-- </template> -->
    </div>
    <div class="mobile">
        <el-table
        :data="listCita"
        style="width: 100%">
         <el-table-column type="expand">
                  <template slot-scope="props">
                    <p style="color: #3a7bdd">Voucher: </p>
                    <a v-if="props.row.id_011_estado == 28" target="_blank">No hay voucher</a>
                    <a v-else v-bind:href="urlDescarga+ props.row.id_cita" target="_blank"><el-button type="primary"> Ver Voucher <i class="el-icon-picture-outline"></i></el-button></a> 
                    
                    <br><br><p style="color: #3a7bdd">Adjuntar Voucher * </p> 
                    <el-button v-if="props.row.id_011_estado == 28" @click="openModal(props.row.id_cita)" >Subir Voucher <i class="el-icon-upload el-icon-right"></i></el-button>            
                    <el-button v-if="props.row.id_011_estado == 24" @click="openModal(props.row.id_cita)" >Reemplazar voucher <i class="el-icon-upload el-icon-right"></i></el-button>            
                    <el-button v-if="props.row.id_011_estado == 25 || props.row.id_011_estado ==26" disabled>Subir Voucher <i class="el-icon-upload el-icon-right"></i></el-button> 

                    <br><br><p style="font-family:helvetica; color: #3a7bdd; size:18px "> Datos de la asesoria:</p>
                    <p >Mi asesoria: </p><p style="color: #A0A0A0"> {{ props.row.asesoria.descripción_solicitante}}</p>  
                    <p >Respuesta del Abogado: </p><p style="color: #A0A0A0"> {{ props.row.asesoriaAbogado.respuesta}}</p>  
                    <p >Respuesta de Administardor: </p><p style="color: #A0A0A0"> {{ props.row.asesoriaAbogado.descripción_asistente}}</p>  
                    <p >Hora de la cita: </p><p style="color: #A0A0A0"> {{ props.row.hora_inicio}}</p>  
                           
                  </template>
         </el-table-column>
        
        <el-table-column
            align="center"
            width="100"
            prop="id_cita"
            label="N° Asesoria">
        </el-table-column>
        <el-table-column
                  width="190"
                  align="center"
                  prop="id_011_estado"
                  label="Estado">
                  <template slot-scope="scope">
                    <br>
                    <el-alert v-if="scope.row.id_011_estado == 25"
                      title="Cita validada"
                      type="success"
                      show-icon>
                    </el-alert>
                    <el-alert v-if="scope.row.id_011_estado == 26"
                      title="Cita Denegada"
                      type="error"
                      show-icon>
                    </el-alert>
                    <el-alert v-if="scope.row.id_011_estado == 24 || scope.row.id_011_estado == 28 "
                      title="Cita sin validar"
                      type="warning"
                      show-icon>
                    </el-alert>
                  </template>
                </el-table-column>
        </el-table> 
        <!-- <template v-if="modalVoucher"> -->
            <!-- <el-dialog :visible.sync="modalVoucher">
                <modal-voucher :idCita="id_cita" @grabarmodal="grabarmodal"></modal-voucher>
            </el-dialog>   -->
        <!-- </template> -->
    </div>
     <el-dialog :visible.sync="modalVoucher">
                <modal-voucher :idCita="id_cita" @grabarmodal="grabarmodal"></modal-voucher>
            </el-dialog> 
    </div>
</template>
<script>
import modalVoucher from '../panel/question/modalVoucher'
export default {
    components: { 
        modalVoucher 
    },
    props:['cita'],
    data(){
        return {
            modalVoucher: false,
            id_cita: null,
            urlDescarga: "http://142.93.14.230:8091/api/abogados/voucher/"
        }
    },
    computed:{
      listCita(){
        return this.cita
      }
    },
    created() {
        console.log(this.cita)
    },
    methods: {
        openModal(valor){
            this.modalVoucher=true
            console.log(valor)
            this.id_cita = valor;
            this.$emit('ListCitas')
        },
        grabarmodal(){
      if(this.modalVoucher == false){
        this.modalVoucher = true
      }
      else{
        this.modalVoucher = false
      }
      this.$emit('ListCitas')
    }
    }
}
</script>

<style>
.mobile{
  display: none
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